import React, { useEffect, useState } from 'react';
import axiosInstance from '../Constants/BaseUrl';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

function ViewCitizenProfile() {
  const [userDetails, setUserDetails] = useState({dob:''});
  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .post(`/viewCitizenById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setUserDetails(res.data.data);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch user details");
      });
  }, [id]);

  const handleActivate = () => {
    axiosInstance.post(`/activateCitizenById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setUserDetails({ ...userDetails, isActive: true });
        } else {
          console.error("Failed to activate");
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleDeactivate = () => {
    axiosInstance.post(`/deactivateCitizenById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setUserDetails({ ...userDetails, isActive: false });
        } else {
          console.error("Failed to deactivate");
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <div>
      <div className='pt-5'>
          <h4 className='admin-dash-h4'>Welcome Admin</h4>
          <p className='admin-dash-para'>All System are running smoothly</p>
        </div>
  
    <div className="container citizen_profile_body">
      
      <form>
        <div className='text-center p-4 text-danger'>
        <h2>{userDetails.firstname} {userDetails.lastname}</h2>
        </div>
        <div className="row">
          <div className="col-6 mt-2 p-2">
            <input
              type="email"
              className="form-control user_inp"
              id="email"
              placeholder="Email"
              name="email"
              value={userDetails.email || ''}
              readOnly
            />
          </div>
          <div className="col-6 mt-2 p-2">
            <input
              type="text"
              className="form-control user_inp"
              id="dob"
              name="dob"
              value={userDetails.dob.slice(0,10) || ''}
              readOnly
            />
          </div>
          <div className="col-6 mt-2 p-2">
            <input
              type="number"
              className="form-control user_inp"
              id="contact"
              placeholder="Contact"
              name="contact"
              value={userDetails.contact || ''}
              readOnly
            />
          </div>
          <div className="col-6 mt-2 p-2">
            <input
              type="text"
              className="form-control user_inp"
              id="aadhar"
              placeholder="Aadhaar"
              name="aadhar"
              value={userDetails.aadhar || ''}
              readOnly
            />
          </div>
          <div className="col-6 mt-2 p-2">
            <input
              type="text"
              className="form-control user_inp"
              id="housename"
              placeholder="House Name"
              name="housename"
              value={userDetails.housename || ''}
              readOnly
            />
          </div>
          <div className="col-6 mt-2 p-2">
            <input
              type="text"
              className="form-control user_inp"
              id="street"
              placeholder="Street Name"
              name="street"
              value={userDetails.street || ''}
              readOnly
            />
          </div>
          <div className="col-6 mt-2 p-2">
            <input
              type="text"
              className="form-control user_inp"
              id="district"
              placeholder="District"
              name="district"
              value={userDetails.district || ''}
              readOnly
            />
          </div>
          <div className="col-6 mt-2 p-2">
            <input
              type="text"
              className="form-control user_inp"
              id="nationality"
              placeholder="Nationality"
              name="nationality"
              value={userDetails.nationality || ''}
              readOnly
            />
          </div>
          <div className="col-6 mt-2 p-2">
            <input
              type="number"
              className="form-control user_inp"
              id="pincode"
              placeholder="Pincode"
              name="pincode"
              value={userDetails.pincode || ''}
              readOnly
            />
          </div>
          <div className="col-12 mt-2 text-center">
                    {userDetails.isActive ? (
                      <button
                        type="button"
                        className='ms-4 viewprofile_policestation_cross_icon'
                        onClick={handleDeactivate}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        type="button"
                        className='ms-4 viewprofile_policestation_tick_icon'
                        onClick={handleActivate}
                      >
                        Activate
                      </button>
                    )}
                  </div>
        </div>
      </form>
    </div>
    </div>
  );
}

export default ViewCitizenProfile;
