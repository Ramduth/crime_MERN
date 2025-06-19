const tf = require('@tensorflow/tfjs-node');
const faceapi = require('face-api.js');
const { Canvas, Image, createCanvas, loadImage } = require('canvas');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const path = require('path');
const fs = require('fs');

// Correct monkey patch for face-api.js
faceapi.env.monkeyPatch({ Canvas, Image, createCanvas });

class ImageAnalysisService {
    constructor() {
        this.modelPath = path.join(__dirname, '../models');
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return;

        // Load face-api models
        await faceapi.nets.ssdMobilenetv1.loadFromDisk(this.modelPath);
        await faceapi.nets.faceLandmark68Net.loadFromDisk(this.modelPath);
        
        // Load coco-ssd model using the npm package
        this.objectDetectionModel = await cocoSsd.load();
        this.initialized = true;
    }

    async analyzeCrimeEvidence(imageBuffer) {
        await this.initialize();
        
        const results = {
            faces: [],
            objects: [],
            licensePlates: [],
            blurredImage: null
        };

        try {
            // Use loadImage from canvas
            const img = await loadImage(imageBuffer);
            const canvas = createCanvas(img.width, img.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Detect faces
            const faceDetections = await faceapi.detectAllFaces(canvas);
            results.faces = faceDetections.map(face => ({
                confidence: face.score,
                box: face.box
            }));

            // Detect objects using coco-ssd
            const predictions = await this.objectDetectionModel.detect(canvas);
            results.objects = predictions.map(pred => ({
                class: pred.class,
                confidence: pred.score,
                box: {
                    x: pred.bbox[0],
                    y: pred.bbox[1],
                    width: pred.bbox[2],
                    height: pred.bbox[3]
                }
            }));

            // Create blurred version for privacy
            const blurredCanvas = new Canvas(img.width, img.height);
            const blurredCtx = blurredCanvas.getContext('2d');
            blurredCtx.drawImage(img, 0, 0);

            // Blur detected faces
            for (const face of results.faces) {
                const { box } = face;
                this.blurRegion(blurredCtx, box.x, box.y, box.width, box.height);
            }

            results.blurredImage = blurredCanvas.toBuffer('image/jpeg');

            return results;

        } catch (error) {
            console.error('Error analyzing image:', error);
            throw error;
        }
    }

    blurRegion(ctx, x, y, width, height) {
        // Apply a pixelation effect to blur the region
        const pixelSize = 15;
        
        // Save the current context state
        ctx.save();
        
        // Get the region data
        const imageData = ctx.getImageData(x, y, width, height);
        
        // Pixelate the region
        for (let py = 0; py < height; py += pixelSize) {
            for (let px = 0; px < width; px += pixelSize) {
                // Get the color of the first pixel in the block
                const offset = (py * width + px) * 4;
                const r = imageData.data[offset];
                const g = imageData.data[offset + 1];
                const b = imageData.data[offset + 2];
                
                // Fill the block with that color
                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.fillRect(x + px, y + py, pixelSize, pixelSize);
            }
        }
        
        // Restore the context state
        ctx.restore();
    }

    getClassName(classId) {
        // Map COCO-SSD class IDs to human-readable names
        const classes = [
            'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus',
            'train', 'truck', 'boat', 'traffic light', 'fire hydrant',
            'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog',
            'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe',
            'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee',
            'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat',
            'baseball glove', 'skateboard', 'surfboard', 'tennis racket',
            'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl',
            'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot',
            'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch',
            'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop',
            'mouse', 'remote', 'keyboard', 'cell phone', 'microwave', 'oven',
            'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase',
            'scissors', 'teddy bear', 'hair drier', 'toothbrush'
        ];
        return classes[classId] || 'unknown';
    }
}

module.exports = new ImageAnalysisService(); 