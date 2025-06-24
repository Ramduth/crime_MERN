import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Spinner } from 'react-bootstrap';

const ImageAnalysis = ({ file, onAnalysisComplete }) => {
    const [analyzing, setAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(true);

    const analyzeImage = async () => {
        setAnalyzing(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', file);

        try {
            // Use the full backend URL to avoid frontend routing issues
            const response = await axios.post('http://localhost:4042/api/image-analysis/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setResults(response.data);
            // If weapons detected, show the modal, else auto-confirm
            if (Array.isArray(response.data) && response.data.length > 0) {
                setShowModal(true);
            } else {
                handleConfirm();
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to analyze image');
        } finally {
            setAnalyzing(false);
        }
    };

    const handleConfirm = () => {
        setShowModal(false);
        onAnalysisComplete({
            originalFile: file,
            weapons: results
        });
    };

    React.useEffect(() => {
        analyzeImage();
        // eslint-disable-next-line
    }, [file]);

    if (!showModal) return null;

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Image Analysis Results</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {analyzing ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Analyzing...</span>
                        </Spinner>
                        <p className="mt-2">Analyzing image...</p>
                    </div>
                ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : Array.isArray(results) ? (
                    <div>
                        <h5>Detected Weapons:</h5>
                        <ul>
                            {results.length > 0 ? (
                                results.map((weapon, idx) => (
                                    <li key={idx}>
                                        {weapon.type} (Confidence: {Math.round(weapon.confidence * 100)}%)
                                    </li>
                                ))
                            ) : (
                                <li>No weapons detected.</li>
                            )}
                        </ul>
                    </div>
                ) : null}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleConfirm}
                    disabled={analyzing || error}
                >
                    Confirm Upload
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ImageAnalysis; 