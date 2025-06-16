import React, { useState } from 'react';
import '../../Assets/Styles/PrivacyPolicy.css';
import axiosInstance from '../Constants/BaseUrl';
import { toast } from 'react-toastify';

function AddPrivacyPolicy() {
  const [content, setContent] = useState('');

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axiosInstance
      .post('/addprivacypolicy', { content })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success("Privacy Policy Added Successfully");
          localStorage.setItem("PolicyId", res.data.data._id);

        } else if (res.data.status === 400) {
          toast.error("A Privacy Policy already exists");
        } else {
          toast.error("Privacy Policy Addition Failed");
        }
      })
      .catch(() => {
        toast.error("Failed");
      });
    setContent('');
  };

  return (
    <div className='container'>
      <div className='pt-5'>
        <h4 className='admin-dash-h4'>Welcome Admin</h4>
        <p className='admin-dash-para'>All System are running smoothly</p>
      </div>
      <div className="privacy_policy_form_container container">
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-md-1'>
              <label className='privacy_policy_label'>Content</label>
            </div>
            <div className='col-md-1'>
              :
            </div>
            <div className='col-md-10'>
              <textarea
                className="privacy_policy_content-textarea"
                name='content'
                value={content}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className="privacy_policy_submit-button">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPrivacyPolicy;
