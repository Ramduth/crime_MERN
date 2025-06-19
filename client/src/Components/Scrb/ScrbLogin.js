import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiMail, FiLock, FiEye, FiEyeOff, FiDatabase } from "react-icons/fi";

function ScrbLogin() {
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  let username = "Scrb"
  let pass = "Scrb@123"

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })

  const [formIsValid, setFormIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data, [name]: value,
    })
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
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
        localStorage.setItem('scrbId', 1)
      } else {
        toast.error("Username or password is incorrect");
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        display: 'flex',
        minHeight: '600px'
      }}>
        {/* Left Side - Image */}
        <div style={{
          flex: '1',
          background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
          backgroundImage: 'url(https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(231, 76, 60, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
            padding: '40px'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px'
            }}>
              🗄️
            </div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '15px'
            }}>
              SCRB Portal
            </h2>
            <p style={{
              fontSize: '16px',
              opacity: 0.9,
              lineHeight: '1.6'
            }}>
              State Crime Records Bureau. Access criminal databases and manage records efficiently.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={{
          flex: '1',
          padding: '60px 50px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '15px'
            }}>
              <FiDatabase style={{
                fontSize: '32px',
                color: '#e74c3c',
                marginRight: '10px'
              }} />
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#e74c3c',
                margin: 0
              }}>
                SCRB Login
              </h2>
            </div>
            <p style={{
              color: '#7f8c8d',
              fontSize: '16px'
            }}>
              Sign in to your SCRB account
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {/* Email Input */}
            <div style={{ marginBottom: '25px' }}>
              <div style={{
                position: 'relative',
                marginBottom: '8px'
              }}>
                <FiMail style={{
                  position: 'absolute',
                  left: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#bdc3c7',
                  fontSize: '18px'
                }} />
                <input
                  type='text'
                  placeholder='Enter email'
                  name='email'
                  value={data.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 50px',
                    border: errors.email ? '2px solid #e74c3c' : '2px solid #ecf0f1',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#f8f9fa',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#e74c3c';
                    e.target.style.backgroundColor = 'white';
                  }}
                />
              </div>
              {errors.email && (
                <span style={{
                  color: '#e74c3c',
                  fontSize: '14px',
                  marginLeft: '5px'
                }}>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div style={{ marginBottom: '25px' }}>
              <div style={{
                position: 'relative',
                marginBottom: '8px'
              }}>
                <FiLock style={{
                  position: 'absolute',
                  left: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#bdc3c7',
                  fontSize: '18px'
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  name='password'
                  value={data.password}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 50px',
                    border: errors.password ? '2px solid #e74c3c' : '2px solid #ecf0f1',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#f8f9fa',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#e74c3c';
                    e.target.style.backgroundColor = 'white';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#bdc3c7',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <span style={{
                  color: '#e74c3c',
                  fontSize: '14px',
                  marginLeft: '5px'
                }}>
                  {errors.password}
                </span>
              )}
            </div>

            {/* Login Button */}
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#c0392b';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#e74c3c';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ScrbLogin
