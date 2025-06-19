const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageAnalysisService = require('../services/imageAnalysis');

// Configure multer for handling file uploads
const upload = multer({
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Route to analyze uploaded images
router.post('/analyze', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const results = await imageAnalysisService.analyzeCrimeEvidence(req.file.buffer);
        
        res.json({
            success: true,
            analysis: {
                faces: results.faces,
                objects: results.objects,
                licensePlates: results.licensePlates
            },
            blurredImage: results.blurredImage.toString('base64')
        });
    } catch (error) {
        console.error('Error analyzing image:', error);
        res.status(500).json({ error: 'Failed to analyze image' });
    }
});

module.exports = router; 