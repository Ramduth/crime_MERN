const tf = require('@tensorflow/tfjs-node');
const faceapi = require('face-api.js');
const { Canvas, Image, createCanvas, loadImage } = require('canvas');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Correct monkey patch for face-api.js
faceapi.env.monkeyPatch({ Canvas, Image, createCanvas });

class ImageAnalysisService {
    constructor() {
        this.modelPath = path.join(__dirname, '../models');
        this.initialized = false;
        this.initializationError = null;
        this.weaponClasses = ['knife', 'scissors', 'baseball bat', 'bottle'];  // Common objects that could be weapons
    }

    async initialize() {
        if (this.initialized) return;
        if (this.initializationError) {
            throw this.initializationError;
        }

        try {
            // Ensure TensorFlow backend is initialized
            await tf.ready();
            
            // Load object detection model
            this.objectDetectionModel = await cocoSsd.load();
            
            this.initialized = true;
        } catch (error) {
            this.initializationError = error;
            console.error('Failed to initialize models:', error);
            throw error;
        }
    }

    async analyzeCrimeEvidence(imageBuffer) {
        if (!imageBuffer || !(imageBuffer instanceof Buffer)) {
            throw new Error('Invalid image buffer provided');
        }
        await this.initialize();
        const results = [];
        try {
            // Load image for processing
            const img = await loadImage(imageBuffer);
            const canvas = createCanvas(img.width, img.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            // Detect objects
            const predictions = await this.objectDetectionModel.detect(canvas);
            // Filter for weapons and dangerous objects
            predictions.forEach(pred => {
                if (this.isWeaponOrDangerous(pred.class)) {
                    results.push({
                        type: pred.class,
                        confidence: pred.score,
                        box: {
                            x: pred.bbox[0],
                            y: pred.bbox[1],
                            width: pred.bbox[2],
                            height: pred.bbox[3]
                        }
                    });
                }
            });
            return results;
        } catch (error) {
            throw new Error('Image analysis failed: ' + error.message);
        }
    }

    isWeaponOrDangerous(className) {
        // List of potentially dangerous objects that COCO-SSD can detect
        return this.weaponClasses.includes(className.toLowerCase()) ||
               className.toLowerCase().includes('knife') ||
               className.toLowerCase().includes('gun');
    }

    blurRegion(ctx, x, y, width, height) {
        // Apply a stronger pixelation effect for weapon regions
        const pixelSize = 20; // Larger pixel size for more aggressive blurring
        
        ctx.save();
        
        // Get the region data
        const imageData = ctx.getImageData(x, y, width, height);
        
        // Pixelate the region
        for (let py = 0; py < height; py += pixelSize) {
            for (let px = 0; px < width; px += pixelSize) {
                const offset = (py * width + px) * 4;
                const r = imageData.data[offset];
                const g = imageData.data[offset + 1];
                const b = imageData.data[offset + 2];
                
                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.fillRect(x + px, y + py, pixelSize, pixelSize);
            }
        }
        
        // Add a warning overlay
        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
        ctx.fillRect(x, y, width, height);
        
        // Add "WEAPON DETECTED" text
        ctx.font = '16px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('WEAPON DETECTED', x, y - 5);
        
        ctx.restore();
    }
}

module.exports = new ImageAnalysisService(); 