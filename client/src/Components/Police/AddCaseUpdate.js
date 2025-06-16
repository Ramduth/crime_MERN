import React, { useState, useEffect } from 'react';
import '../../Assets/Styles/AddCaseUpdate.css'; 
import axiosInstance from '../Constants/BaseUrl';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function AddCaseUpdate() {
  const [caseData, setCaseData] = useState({
    date: new Date().toISOString().split('T')[0],
    officeInCharge: '',
    status: '',
    crimeId:'',
    description: ''
  });

  const {id} = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const [citizenId, setCitizenId] = useState('');
  const [policeId, setPoliceId] = useState('');
  const [officer, setOfficer] = useState('');

  useEffect(() => {
    axiosInstance.post(`/viewCrimeById/${id}`)
      .then(res => {
        console.log(res);
        setCitizenId(res.data.data.citizenId._id);
        setPoliceId(res.data.data.psId._id);
        setOfficer(res.data.data.psId.stationchargeofficers);
      })
      .catch(error => {
        console.error('Error adding police case:', error);
        toast.error("Failed to update case");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseData({ ...caseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...caseData, citizenId, policeId, officeInCharge: officer, crimeId: id };

    axiosInstance.post('/addpolicecases', data)
      .then(res => {
        console.log(res.data);
        toast.success("Case Updated Successfully");
        navigate(-1);
      })
      .catch(error => {
        console.log('Error adding police case:', error);
        toast.error("Failed to update case");
      });
  };

  return (
    <div className='police_add_case_update_main_div'>
      <div className='text-center'>
        <label className='add_update_label'>Add Case Update</label>
      </div>
      
      <div className='container police_addcase_update'>
        <form onSubmit={handleSubmit}>
          <div className='row police_add_case_row'>
            <div className='col-4'>
              <p className='police_add_case_update_label'>Case Number</p>
            </div>
            <div className='col-1'>:</div>
            <div className='col-7'>
              <input 
                type='text' 
                className='form-control'
                value={`ID${id.slice(19,24)}`}
                disabled
              />
            </div>
          </div>
          <div className='row police_add_case_row'>
            <div className='col-4'>
              <p className='police_add_case_update_label'>Office Incharge</p>
            </div>
            <div className='col-1'>:</div>
            <div className='col-7'>
              <input 
                type='text' 
                className='form-control'
                name='officeInCharge'
                value={officer}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* <div className='row police_add_case_row'>
            <div className='col-4'>
              <p className='police_add_case_update_label'>Date of Update</p>
            </div>
            <div className='col-1'>:</div>
            <div className='col-7'>
              <input 
                type='date'
                className='form-control'
                name='date'
                value={caseData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div> */}
          <div className='row police_add_case_row'>
            <div className='col-4'>
              <p className='police_add_case_update_label'>Current Status</p>
            </div>
            <div className='col-1'>:</div>
            <div className='col-7'>
              <select 
                className='form-control'
                name='status'
                value={caseData.status}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Status</option>
                <option value="Investigation Ongoing">Investigation Ongoing</option>
                <option value="Transferred to Crime branch">Transfered to Crime branch</option>
                <option value="Transferred to CBI">Transfered to CBI</option>
                <option value="closed">Case Closed</option>
              </select>
            </div>
          </div>
          <div className='row police_add_case_row'>
            <div className='col-4'>
              <p className='police_add_case_update_label'>Progress Description</p>
            </div>
            <div className='col-1'>:</div>
            <div className='col-7'>
              <textarea 
                className='form-control' 
                rows={5}
                name='description'
                value={caseData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='row police_add_case_row'>
            <div className='col-4'></div>
            <div className='col-1'></div>
            <div className='col-7'>
              <button 
                className="btn btn-danger mb-3 add_update_button" 
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCaseUpdate;
