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
            
            // If there are sensitive objects detected, show the modal
            if (response.data.analysis.faces.length > 0) {
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
            blurredImage: results?.blurredImage,
            analysis: results?.analysis
        });
    };

    React.useEffect(() => {
        analyzeImage();
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
                ) : results && (
                    <div>
                        <h5>Detected Items:</h5>
                        <ul>
                            {results.analysis.faces.length > 0 && (
                                <li>{results.analysis.faces.length} faces detected (will be automatically blurred)</li>
                            )}
                            {results.analysis.objects.map((obj, idx) => (
                                <li key={idx}>
                                    {obj.class} (Confidence: {Math.round(obj.confidence * 100)}%)
                                </li>
                            ))}
                        </ul>
                        
                        {results.analysis.faces.length > 0 && (
                            <div className="alert alert-info">
                                For privacy reasons, detected faces will be automatically blurred in the uploaded image.
                            </div>
                        )}
                        
                        <div className="mt-3">
                            <h6>Preview:</h6>
                            {results.blurredImage && (
                                <img 
                                    src={`data:image/jpeg;base64,${results.blurredImage}`}
                                    alt="Analyzed"
                                    className="img-fluid"
                                    style={{ maxHeight: '300px' }}
                                />
                            )}
                        </div>
                    </div>
                )}
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