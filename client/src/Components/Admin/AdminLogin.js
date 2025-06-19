import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiSettings } from "react-icons/fi";
import { toast } from "react-toastify";

function AdminLogin() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  let mail = "Admin"
  let pass = "Admin@123"

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })

  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data, [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    setErrors(errors);

    if (!errors.email && !errors.password) {
      const values = { email: data.email, password: data.password };
      console.log(values);
      if (mail == data.email && pass == data.password) {
        toast.success("Logged in Successfully");
        Navigate("/admin_home")
        localStorage.setItem('adminId', 1)
      }
      else {
        toast.error("Username or password is incorrect")
      }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)',
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
          background: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)',
          backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)',
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
            background: 'rgba(142, 68, 173, 0.8)',
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
              ⚙️
            </div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '15px'
            }}>
              Admin Portal
            </h2>
            <p style={{
              fontSize: '16px',
              opacity: 0.9,
              lineHeight: '1.6'
            }}>
              System administration dashboard. Manage users, monitor activities, and oversee operations.
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
              <FiSettings style={{
                fontSize: '32px',
                color: '#8e44ad',
                marginRight: '10px'
              }} />
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#8e44ad',
                margin: 0
              }}>
                Admin Login
              </h2>
            </div>
            <p style={{
              color: '#7f8c8d',
              fontSize: '16px'
            }}>
              Sign in to your admin account
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {/* Username Input */}
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
                  type="text"
                  placeholder="Enter username"
                  name="email"
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
                    e.target.style.borderColor = '#8e44ad';
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
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
                    e.target.style.borderColor = '#8e44ad';
                    e.target.style.backgroundColor = 'white';
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
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
                  backgroundColor: '#8e44ad',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#9b59b6';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#8e44ad';
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
  );
}

export default AdminLogin;
