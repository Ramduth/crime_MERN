import React, { useEffect, useState } from 'react';
import axiosInstance from '../Constants/BaseUrl';
import { toast } from 'react-toastify';

function ViewPrivacyPolicy() {
  const [content, setContent] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosInstance.post('/viewprivacypolicy')
      .then((res) => {
        console.log(res.data); 
        if (res.data.status === 200 && res.data.data.length > 0) {
          setContent(res.data.data[0].content || ''); 
          console.log("Privacy Policy fetched successfully");
        } else {
          console.log("Failed to fetch Privacy Policy");
          setContent('');
        }
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setContent('');
      });
  };

  return (
    <div className='container view_policy_main_div'>
      <div className='pt-5'>
        <h4 className='admin-dash-h4'>Welcome Admin</h4>
        <p className='admin-dash-para'>All systems are running smoothly</p>
      </div>
      <div className='text-center'>
        <h4 className='text-danger view_policy_h4'>Privacy Policy</h4>
      </div>
      <div>
        <h5 className='text-primary view_policy_h5'>Welcome To Crime Reporting Privacy Policy</h5>
        <p className='text-justify view_policy_p'>{content}</p>
      </div>
    </div>
  );
}

export default ViewPrivacyPolicy;
