import React, { useState, useEffect } from 'react';
import '../../Assets/Styles/ReportCrimeForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../Constants/BaseUrl';
import ImageAnalysis from '../Common/ImageAnalysis';

function ReportCrimeForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        aadhar: '',
        mobile: '',
        email: '',
        location: '',
        district: '',
        policeStationId: '',
        photos: [],
        crimeDescription: '',
        crimeType: '',
        dateTime: ''
    });
    const [previewUrls, setPreviewUrls] = useState([]);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [policeStations, setPoliceStations] = useState([]);
    const [isLoadingStations, setIsLoadingStations] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // --- Image Analysis State ---
    const [analysisIndex, setAnalysisIndex] = useState(null); // which file to analyze
    const [analysisResult, setAnalysisResult] = useState({}); // store results per file

    const crimeTypes = [
        'Theft',
        'Assault',
        'Burglary',
        'Fraud',
        'Vandalism',
        'Harassment',
        'Other'
    ];

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        if (name === 'photos' && files) {
            const newFiles = Array.from(files);
            const currentCount = formData.photos.length;
            const totalCount = currentCount + newFiles.length;
            
            if (totalCount > 5) {
                alert(`You can only upload a maximum of 5 files. You currently have ${currentCount} files and trying to add ${newFiles.length} more. Please remove some files first.`);
                return;
            }
            setFormData(prev => ({
                ...prev,
                photos: [...prev.photos, ...newFiles]
            }));
            const newUrls = newFiles.map(file => URL.createObjectURL(file));
            setPreviewUrls(prev => [...prev, ...newUrls]);
            // Start analysis for the first new image (if it's an image)
            const firstImageIndex = newFiles.findIndex(f => f.type.startsWith('image/'));
            if (firstImageIndex !== -1) {
                setAnalysisIndex(currentCount + firstImageIndex);
            }
        } else if (name === 'location') {
            setFormData(prev => ({
                ...prev,
                location: value,
                district: '',
                policeStationId: ''
            }));
            if (value.length > 2) {
                searchLocation(value);
            } else {
                setLocationSuggestions([]);
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    useEffect(() => {
        return () => {
            previewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previewUrls]);

    const removeFile = (index) => {
        setFormData(prev => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index)
        }));
        URL.revokeObjectURL(previewUrls[index]);
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
        setAnalysisResult(prev => {
            const newResult = { ...prev };
            delete newResult[index];
            return newResult;
        });
    };

    const clearAllFiles = () => {
        previewUrls.forEach(url => URL.revokeObjectURL(url));
        setFormData(prev => ({
            ...prev,
            photos: []
        }));
        setPreviewUrls([]);
        setAnalysisResult({});
    };

    const searchLocation = async (query) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=in&limit=5`
            );
            setLocationSuggestions(response.data);
            setShowSuggestions(true);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const selectLocation = async (location) => {
        try {
            console.log('Selected location:', location.display_name);
            
            const addressParts = location.display_name.split(',').map(part => part.trim());
            console.log('Address parts:', addressParts);
            
            let district = '';
            for (let i = addressParts.length - 1; i >= 0; i--) {
                const part = addressParts[i].toLowerCase();
                const keralaDistricts = [
                    'alappuzha', 'ernakulam', 'idukki', 'kannur', 'kasaragod', 
                    'kollam', 'kottayam', 'kozhikode', 'malappuram', 'palakkad', 
                    'pathanamthitta', 'thiruvananthapuram', 'thrissur', 'wayanad'
                ];
                
                if (keralaDistricts.includes(part)) {
                    district = part;
                    break;
                }
            }
            
            console.log('Extracted district:', district);
            
            if (!district) {
                console.log('No valid district found in location');
                alert('Please select a location in Kerala with a valid district name');
                return;
            }
            
            setFormData(prev => ({
                ...prev,
                location: location.display_name,
                district: district,
                policeStationId: ''
            }));
            setShowSuggestions(false);
            setPoliceStations([]);

            setIsLoadingStations(true);
            try {
                console.log('Fetching police stations for district:', district);
                const response = await axiosInstance.post(`/viewPoliceByDistrict/${district}`);
                console.log('Police stations response:', response.data);
                
                if (response.data.status === 200) {
                    if (response.data.data && response.data.data.length > 0) {
                        setPoliceStations(response.data.data);
                        console.log('Set police stations:', response.data.data);
                    } else {
                        console.log('No police stations found:', response.data.msg);
                        setPoliceStations([]);
                        alert(`No police stations found in ${district} district. Please contact the nearest police station.`);
                    }
                } else {
                    console.error('Error response:', response.data);
                    setPoliceStations([]);
                    alert('Error fetching police stations. Please try again.');
                }
            } catch (error) {
                console.error('Error fetching police stations:', error);
                setPoliceStations([]);
                alert('Error connecting to the server. Please try again.');
            } finally {
                setIsLoadingStations(false);
            }
        } catch (error) {
            console.error('Error processing location:', error);
            setPoliceStations([]);
            alert('Error processing location. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!/^\d{12}$/.test(formData.aadhar)) {
            alert('Please enter a valid 12-digit Aadhar number');
            return;
        }

        if (!/^\d{10}$/.test(formData.mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }

        if (!formData.policeStationId) {
            alert('Please select a police station');
            return;
        }

        if (formData.photos.length === 0) {
            alert('Please upload at least one photo or video as evidence');
            return;
        }

        setIsSubmitting(true);

        try {
            const submitData = new FormData();
            
            submitData.append('victimName', formData.name);
            submitData.append('aadhar', formData.aadhar);
            submitData.append('mobile', formData.mobile);
            submitData.append('victimEmail', formData.email);
            submitData.append('district', formData.district);
            submitData.append('psId', formData.policeStationId);
            submitData.append('caseType', formData.crimeType);
            submitData.append('caseDescription', formData.crimeDescription);
            
            const dateTime = new Date(formData.dateTime);
            submitData.append('incidentDate', dateTime.toISOString().split('T')[0]);
            submitData.append('incidentTime', dateTime.toTimeString().split(' ')[0]);
            submitData.append('incidentLocation', formData.location);
            
            const citizenToken = localStorage.getItem('citizenToken');
            if (citizenToken) {
                submitData.append('citizenId', citizenToken);
            }
            
            formData.photos.forEach((file, index) => {
                if (file.type && file.type.startsWith('image/') && analysisResult[index] && analysisResult[index].blurredImage) {
                    // Convert base64 to Blob
                    const byteString = atob(analysisResult[index].blurredImage);
                    const ab = new ArrayBuffer(byteString.length);
                    const ia = new Uint8Array(ab);
                    for (let i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }
                    const blob = new Blob([ab], { type: 'image/jpeg' });
                    submitData.append('files', blob, file.name);
                } else {
                    submitData.append('files', file);
                }
            });

            console.log('Submitting data:', {
                victimName: formData.name,
                aadhar: formData.aadhar,
                mobile: formData.mobile,
                victimEmail: formData.email,
                district: formData.district,
                psId: formData.policeStationId,
                caseType: formData.crimeType,
                incidentDate: dateTime.toISOString().split('T')[0],
                incidentTime: dateTime.toTimeString().split(' ')[0],
                incidentLocation: formData.location,
                citizenId: citizenToken || 'Anonymous',
                filesCount: formData.photos.length
            });

            const response = await axiosInstance.post('/addAnonymousCrime', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Response:', response.data);

            if (response.data.status === 200) {
                alert('Anonymous crime report submitted successfully! The police station will review your report. Please keep your Aadhar number for future reference.');
                navigate('/');
            } else {
                alert('Error submitting report: ' + response.data.msg);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert('Error submitting form: ' + (error.response.data.msg || error.message));
            } else {
                alert('Error submitting form. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Image Analysis Modal Logic ---
    const currentFile = analysisIndex !== null ? formData.photos[analysisIndex] : null;
    // Find next image to analyze
    useEffect(() => {
        if (analysisIndex !== null && formData.photos[analysisIndex]) {
            const file = formData.photos[analysisIndex];
            if (!file.type.startsWith('image/')) {
                // Skip non-image files
                setAnalysisIndex(analysisIndex + 1 < formData.photos.length ? analysisIndex + 1 : null);
            }
        }
    }, [analysisIndex, formData.photos]);

    return (
        <div className="report-crime-container">
            {/* Image Analysis Modal */}
            {currentFile && !analysisResult[analysisIndex] && currentFile.type.startsWith('image/') && (
                <ImageAnalysis
                    file={currentFile}
                    onAnalysisComplete={result => {
                        setAnalysisResult(prev => ({ ...prev, [analysisIndex]: result }));
                        // Move to next image if any
                        const nextIndex = analysisIndex + 1;
                        if (nextIndex < formData.photos.length) {
                            setAnalysisIndex(nextIndex);
                        } else {
                            setAnalysisIndex(null);
                        }
                    }}
                />
            )}
            <div className="report-crime-form-box">
                <h2 className="text-center mb-4">Report a Crime</h2>
                <p className="text-center mb-4">Please provide the details of the crime</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name="aadhar"
                            placeholder="Aadhar Number (12 digits)"
                            value={formData.aadhar}
                            onChange={handleChange}
                            required
                            maxLength="12"
                            pattern="\d{12}"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name="mobile"
                            placeholder="Mobile Number (10 digits)"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            maxLength="10"
                            pattern="[0-9]{10}"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <select
                            className="form-control"
                            name="crimeType"
                            value={formData.crimeType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Type of Crime</option>
                            {crimeTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="datetime-local"
                            className="form-control"
                            name="dateTime"
                            value={formData.dateTime}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <textarea
                            className="form-control"
                            name="crimeDescription"
                            placeholder="Describe the crime in detail"
                            value={formData.crimeDescription}
                            onChange={handleChange}
                            required
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name="location"
                            placeholder="Enter crime location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                        {showSuggestions && locationSuggestions.length > 0 && (
                            <div className="location-suggestions">
                                {locationSuggestions.map((location, index) => (
                                    <div
                                        key={index}
                                        className="suggestion-item"
                                        onClick={() => selectLocation(location)}
                                    >
                                        {location.display_name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {formData.district && (
                        <div className="form-group mb-3">
                            <label className="form-label">Police Station (District: {formData.district})</label>
                            <select
                                className="form-control"
                                name="policeStationId"
                                value={formData.policeStationId}
                                onChange={handleChange}
                                required
                                disabled={isLoadingStations}
                            >
                                <option value="">
                                    {isLoadingStations 
                                        ? "Loading police stations..." 
                                        : "Select Police Station"}
                                </option>
                                {Array.isArray(policeStations) && policeStations.length > 0 ? (
                                    policeStations.map((station) => (
                                        <option key={station._id} value={station._id}>
                                            {station.policestationname} - {station.address}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        {isLoadingStations 
                                            ? "Loading..." 
                                            : `No police stations found in ${formData.district} district`}
                                    </option>
                                )}
                            </select>
                            {formData.district && !isLoadingStations && policeStations.length === 0 && (
                                <small className="text-muted">
                                    No police stations found in {formData.district} district. Please verify the district name.
                                </small>
                            )}
                        </div>
                    )}

                    <div className="form-group mb-3">
                        <label className="form-label">Upload Evidence (Photos/Videos)</label>
                        <input
                            type="file"
                            className="form-control"
                            name="photos"
                            accept="image/*,video/*"
                            onChange={handleChange}
                            required
                            multiple
                        />
                        <small className="text-muted">
                            You can select multiple files. Supported formats: JPG, PNG, MP4, MOV, etc. 
                            <strong> Maximum 5 files allowed.</strong>
                        </small>
                        
                        {previewUrls.length === 0 && (
                            <div className="text-center mt-2 p-3 border border-dashed border-secondary rounded">
                                <small className="text-muted">
                                    📷 Click "Choose Files" to upload evidence photos/videos<br/>
                                    <strong>At least 1 file is required</strong>
                                </small>
                            </div>
                        )}
                        
                        {previewUrls.length > 0 && (
                            <div className="image-preview mt-2">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h6 className="mb-0">
                                        Selected Files ({formData.photos.length}/5):
                                        {formData.photos.length >= 5 && (
                                            <span className="text-danger ms-2 file-limit-warning">Maximum files reached</span>
                                        )}
                                        {formData.photos.length === 4 && (
                                            <span className="text-warning ms-2">1 file remaining</span>
                                        )}
                                    </h6>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={clearAllFiles}
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <div className="preview-grid">
                                    {formData.photos.map((file, index) => (
                                        <div key={index} className="preview-item">
                                            {file.type.startsWith('video/') ? (
                                                <video 
                                                    src={previewUrls[index]} 
                                                    alt={`Video ${index + 1}`} 
                                                    className="img-preview" 
                                                    controls 
                                                />
                                            ) : (
                                                <img 
                                                    src={previewUrls[index]} 
                                                    alt={`Image ${index + 1}`} 
                                                    className="img-preview" 
                                                />
                                            )}
                                            <div className="file-info">
                                                <small>{file.name}</small>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger remove-btn"
                                                    onClick={() => removeFile(index)}
                                                >
                                                    ✕ Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="text-center">
                        <button 
                            type="submit" 
                            className={`btn btn-danger submit-btn ${isSubmitting ? 'btn-loading' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReportCrimeForm;