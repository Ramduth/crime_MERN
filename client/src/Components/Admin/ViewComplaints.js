import React, { useEffect, useState } from 'react';
import axiosInstance from '../Constants/BaseUrl';
import '../../Assets/Styles/AdminViewNotification.css';

function ViewComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const getData = () => {
        axiosInstance.post("/viewAllComplaints")
            .then((res) => {
                if (res.data.status === 200) {
                    setComplaints(res.data.data || []);
                } else {
                    setComplaints([]);
                }
            })
            .catch((err) => {
                console.log("error", err);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const openModal = (complaint) => {
        setSelectedComplaint(complaint);
    }

    const closeModal = () => {
        setSelectedComplaint(null);
    }

    return (
        <div className='container'>
            <div className='pt-5'>
                <h4 className='admin-dash-h4'>Welcome Admin</h4>
                <p className='admin-dash-para'>All System are running smoothly</p>
            </div>
            <div className="crime-alerts-table container">
                <h2 className='crime_alerts_h2'>Complaints</h2>
                {complaints.length === 0 && (
                    <h1>No Complaints Found</h1>
                )}
                {complaints.length > 0 && (
                    <table className='crime-alerts-table_tab'>
                        <thead>
                            <tr>
                                <th className='crime-alerts-table-th-td'>Sl/No</th>
                                <th className='crime-alerts-table-th-td'>Username</th>
                                <th className='crime-alerts-table-th-td'>Date</th>
                                <th className='crime-alerts-table-th-td'>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((complaint, index) => (
                                <tr key={index} onClick={() => openModal(complaint)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <td className='crime-alerts-table-th-td'>{index + 1}</td>
                                    <td className='crime-alerts-table-th-td'>{complaint.citizenId && complaint.citizenId.firstname ? complaint.citizenId.firstname : 'Unknown User'}</td>
                                    <td className='crime-alerts-table-th-td'>{complaint.date.slice(0, 10)}</td>
                                    <td className='crime-alerts-table-th-td'>{complaint.complaint}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Message</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            {selectedComplaint && (
                                <div>
                                    <p className='text-justify'>{selectedComplaint.complaint}</p>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewComplaints;
