import React, { useState } from 'react'
import '../../Assets/Styles/Scrb.css'
import scrbforgetpswd from '../../Assets/Images/scrbforgetpswd.png'
import { useNavigate } from 'react-router-dom'

function ScrbForgetpswd() {

  const[data,setData]=useState({
    email:"",
    password:"",
    confirmpassword:"",
  })

  const[errors,setErrors]=useState({
    email:"",
    password:"",
    confirmpassword:"",
  })

  const Navigate=useNavigate();

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setData({
        ...data,[name]:value,
    })
    setErrors((prevErrors) => ({ ...prevErrors,[name]:""}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors={};
    let formValid=true;

    if (!data.email.trim()) {
      formValid = false;
      errors.email = "Email is required";
    }

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
      if (!data.password.trim()) {
        formValid = false;
        errors.password = "Password is required";
      }else if (!passwordRegex.test(data.password)) { // Pass the password to the test method
        errors.password =
        "Password must contain at least one number, one special character, and one capital letter";
      }
    

    if (!data.confirmpassword.trim()) {
      formValid = false;
      errors.confirmpassword = "Confirm Password is required";
    } else if (data.confirmpassword !== data.password) {
      formValid = false;
      errors.confirmpassword = "Passwords do not match";
    }

    setErrors(errors);
  }

  return (
    <div>
      <div className='row mb-2'>
        <div className='col-7'>
            <img src={scrbforgetpswd} alt='img' className='scrbforfet-pswd-img'/>
        </div>
        <div className='col-5'>
        <div className='text-center mt-5'>
            <h4 className='scrb-login-h4 pt-5'>SCRB Login</h4>
          </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-2'></div>
                  <div className='col-8'>
                    <div className='mt-5'>
                      <input type='email'
                      placeholder='Email'
                      className='scrb-login-textbox ps-3'
                      name='email'
                      value={data.email}
                      onChange={handleChange}
                      />
                      {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mt-5'>
                      <input type='password'
                      placeholder='Password'
                      className='scrb-login-textbox ps-3'
                      name='password'
                      value={data.password}
                      onChange={handleChange}
                      />
                      {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div className='mt-5'>
                      <input type='password'
                      placeholder='Confirm Password'
                      className='scrb-login-textbox ps-3'
                      name='confirmpassword'
                      value={data.confirmpassword}
                      onChange={handleChange}
                      />
                      {errors.confirmpassword && <span className='text-danger'>{errors.confirmpassword}</span>}
                    </div>
                    <div className='text-center mt-5'>
                      <button className='scrb-login-loginbtn'>Login</button>
                    </div>
                  </div>
                  <div className='col-2'></div>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ScrbForgetpswd
