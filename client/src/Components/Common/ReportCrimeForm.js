import React, { useState, useEffect } from 'react';
import '../../Assets/Styles/ReportCrimeForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../Constants/BaseUrl';

function ReportCrimeForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        aadhar: '',
        mobile: '',
        location: '',
        district: '',
        policeStationId: '',
        photo: null,
        crimeDescription: '',
        crimeType: '',
        dateTime: ''
    });
    const [previewUrl, setPreviewUrl] = useState('');
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [policeStations, setPoliceStations] = useState([]);
    const [isLoadingStations, setIsLoadingStations] = useState(false);

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
            const fileUrl = URL.createObjectURL(files[0]);
            setPreviewUrl(fileUrl);
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
            
            // Extract district from location data
            const addressParts = location.display_name.split(',').map(part => part.trim());
            console.log('Address parts:', addressParts);
            
            // Find district - it's usually the second-to-last part before the state
            let district = '';
            for (let i = addressParts.length - 1; i >= 0; i--) {
                const part = addressParts[i].toLowerCase();
                // List of districts in Kerala
                const keralaDistricts = [
                    'alappuzha', 'ernakulam', 'idukki', 'kannur', 'kasaragod', 
                    'kollam', 'kottayam', 'kozhikode', 'malappuram', 'palakkad', 
                    'pathanamthitta', 'thiruvananthapuram', 'thrissur', 'wayanad'
                ];
                
                if (keralaDistricts.includes(part)) {
                    district = part;  // Keep it lowercase, server will handle case-insensitive matching
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
                        // Show a more informative message to the user
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

        try {
            const submitData = new FormData();
            
            // Add all form fields with correct field names
            submitData.append('victimName', formData.name);
            submitData.append('aadhar', formData.aadhar);
            submitData.append('mobile', formData.mobile);
            submitData.append('district', formData.district);
            submitData.append('psId', formData.policeStationId);
            submitData.append('caseType', formData.crimeType);
            submitData.append('caseDescription', formData.crimeDescription);
            
            // Convert date string to proper format
            const dateTime = new Date(formData.dateTime);
            submitData.append('incidentDate', dateTime.toISOString().split('T')[0]);
            submitData.append('incidentTime', dateTime.toTimeString().split(' ')[0]);
            submitData.append('incidentLocation', formData.location);
            
            // Add citizen ID only if user is logged in (optional for anonymous reporting)
            const citizenToken = localStorage.getItem('citizenToken');
            if (citizenToken) {
                submitData.append('citizenId', citizenToken);
            }
            
            // Add evidence photo
            if (formData.photo) {
                submitData.append('files', formData.photo);
            }

            console.log('Submitting data:', {
                victimName: formData.name,
                aadhar: formData.aadhar,
                mobile: formData.mobile,
                district: formData.district,
                psId: formData.policeStationId,
                caseType: formData.crimeType,
                incidentDate: dateTime.toISOString().split('T')[0],
                incidentTime: dateTime.toTimeString().split(' ')[0],
                incidentLocation: formData.location,
                citizenId: citizenToken || 'Anonymous'
            });

            // Submit the crime report
            const response = await axiosInstance.post('/addAnonymousCrime', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Response:', response.data);

            if (response.data.status === 200) {
                alert('Anonymous crime report submitted successfully! The police station will review your report. Please keep your Aadhar number for future reference.');
                navigate('/');  // Redirect to home page
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
                        <label className="form-label">Upload Evidence (Photo/Video)</label>
                        <input
                            type="file"
                            className="form-control"
                            name="photo"
                            accept="image/*,video/*"
                            onChange={handleChange}
                            required
                        />
                        {previewUrl && (
                            <div className="image-preview mt-2">
                                {formData.photo && formData.photo.type.startsWith('video/') ? (
                                    <video src={previewUrl} alt="Preview" className="img-preview" controls />
                                ) : (
                                    <img src={previewUrl} alt="Preview" className="img-preview" />
                                )}
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