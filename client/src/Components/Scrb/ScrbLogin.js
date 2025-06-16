import React, { useState } from 'react'
import '../../Assets/Styles/Scrb.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import scrblogin from '../../Assets/Images/scrblogin.png'
import { toast } from 'react-toastify'

function ScrbLogin() {

  const [data,setData]=useState({
    email:"",
    password:""
  })

  let username="Scrb"
  let pass="Scrb@123"

  const[errors,setErrors]=useState({
    email:"",
    password:""
  })

  const [formIsValid,setFormIsValid]=useState(true);

  const navigate=useNavigate();

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setData({
      ...data,[name]:value,
    })
    setErrors((prevErrors) => ({...prevErrors,[name]:""}));
  }
  const validateField = (fieldName, value) => {
    if (!value.trim()) {
        setFormIsValid(false);
        return `${fieldName} is required`;
    }
    return '';
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let formIsValid = true;
  
    errors.email = validateField('Email', data.email);
    if (errors.email) formIsValid = false;
  
    errors.password = validateField('Password', data.password);
    if (errors.password) formIsValid = false;
  
    setErrors(errors);
  
    if (formIsValid) {
      const values = { email: data.email, password: data.password };
      console.log(values);
  
      if (username === data.email && pass === data.password) {
        toast.success("Logged in Successfully");
        navigate("/scrb-dashboard");
        localStorage.setItem('scrbId',1)
      } else {
        toast.error("Username or password is incorrect");
      }
    }
  };
  

  return (
    <div>
      <div className='row'>
        <div className='col'>
          <img src={scrblogin} className='scrb-login-img'></img>
        </div>
        <div className='col'>
          <div className='text-center mt-5'>
            <h4 className='scrb-login-h4 pt-5'>SCRB Login</h4>
          </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-3'></div>
                  <div className='col-6'>
                    <div className='mt-5'>
                      <input type='text'
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
                    <div className='text-center mt-5'>
                      <button className='scrb-login-loginbtn'>Login</button>
                    </div>

                    <div className='mt-4 scrb-login-forgetlink'>
                      {/* <Link to='/scrb-forgetpswd' className='scrb-login-linkforget'>Forget Password</Link> */}
                    </div>
                  </div>
                  <div className='col-3'></div>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ScrbLogin
