import React, { useState } from 'react';
import '../../Assets/Styles/ReportCrimeForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReportCrimeForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        aadhar: '',
        location: '',
        photo: null,
        crimeDescription: '',
        crimeType: '',
        dateTime: ''
    });
    const [previewUrl, setPreviewUrl] = useState('');
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

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
        
        if (name === 'photo' && files[0]) {
            setFormData(prev => ({
                ...prev,
                photo: files[0]
            }));
            // Create preview URL
            const fileUrl = URL.createObjectURL(files[0]);
            setPreviewUrl(fileUrl);
        } else if (name === 'location') {
            setFormData(prev => ({
                ...prev,
                location: value
            }));
            // Call location API when user types
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

    const searchLocation = async (query) => {
        try {
            // Using OpenStreetMap Nominatim API for location search
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=in&limit=5`
            );
            setLocationSuggestions(response.data);
            setShowSuggestions(true);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const selectLocation = (location) => {
        setFormData(prev => ({
            ...prev,
            location: location.display_name
        }));
        setShowSuggestions(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate Aadhar number (12 digits)
        if (!/^\d{12}$/.test(formData.aadhar)) {
            alert('Please enter a valid 12-digit Aadhar number');
            return;
        }

        try {
            // Create FormData object for file upload
            const submitData = new FormData();
            Object.keys(formData).forEach(key => {
                submitData.append(key, formData[key]);
            });

            // Here you would typically make an API call to your backend
            // const response = await axios.post('/api/report-crime', submitData);
            
            // For now, we'll just show a success message and redirect
            alert('Crime report submitted successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        }
    };

    return (
        <div className="report-crime-container">
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

                    <div className="form-group mb-3">
                        <label className="form-label">Upload Evidence Photo</label>
                        <input
                            type="file"
                            className="form-control"
                            name="photo"
                            accept="image/*"
                            onChange={handleChange}
                            required
                        />
                        {previewUrl && (
                            <div className="image-preview mt-2">
                                <img src={previewUrl} alt="Preview" className="img-preview" />
                            </div>
                        )}
                    </div>

                    <div className="text-center">
                        <button 
                            type="submit" 
                            className="btn btn-danger submit-btn"
                        >
                            Submit Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReportCrimeForm;