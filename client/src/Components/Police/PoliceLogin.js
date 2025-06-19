import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../Constants/Schema";
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield } from "react-icons/fi";

function PoliceLogin() {
  const [isToastVisible, setToastVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (values) => {
    axiosInstance.post('/loginPolice', values)
        .then((res) => {
            console.log(res);
            if (res.data.status === 200) {
                if (!isToastVisible) {
                    setToastVisible(true);
                    toast.success("Login Successful", {
                        onClose: () => setToastVisible(false),
                    });
                }
                localStorage.setItem('policeId',res.data.data._id)
                localStorage.setItem('policestationName',res.data.data.policestationname)
                navigate('/police_home');
            } else if (res.data.status === 405) {
                if (!isToastVisible) {
                    setToastVisible(true);
                    toast.warning(res.data.msg, {
                        onClose: () => setToastVisible(false),
                    });
                }
            } else {
                if (!isToastVisible) {
                    setToastVisible(true);
                    toast.error('Something Went Wrong', {
                        onClose: () => setToastVisible(false),
                    });
                }
            }
        })
        .catch(() => {
            if (!isToastVisible) {
                setToastVisible(true);
                toast.error('Something Went Wrong', {
                    onClose: () => setToastVisible(false),
                });
            }
        }
      );
    console.log(values);
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit: onSubmit,
    });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
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
          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
          backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)',
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
            background: 'rgba(44, 62, 80, 0.8)',
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
              👮‍♂️
            </div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '15px'
            }}>
              Police Portal
            </h2>
            <p style={{
              fontSize: '16px',
              opacity: 0.9,
              lineHeight: '1.6'
            }}>
              Access the law enforcement dashboard. Manage cases and maintain public safety.
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
              <FiShield style={{
                fontSize: '32px',
                color: '#2c3e50',
                marginRight: '10px'
              }} />
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#2c3e50',
                margin: 0
              }}>
                Police Login
              </h2>
            </div>
            <p style={{
              color: '#7f8c8d',
              fontSize: '16px'
            }}>
              Sign in to your police account
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
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 50px',
                    border: errors.email && touched.email ? '2px solid #e74c3c' : '2px solid #ecf0f1',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#f8f9fa',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2c3e50';
                    e.target.style.backgroundColor = 'white';
                  }}
                />
              </div>
              {errors.email && touched.email && (
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
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 50px',
                    border: errors.password && touched.password ? '2px solid #e74c3c' : '2px solid #ecf0f1',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#f8f9fa',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2c3e50';
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
              {errors.password && touched.password && (
                <span style={{
                  color: '#e74c3c',
                  fontSize: '14px',
                  marginLeft: '5px'
                }}>
                  {errors.password}
                </span>
              )}
            </div>

            {/* Forgot Password */}
            <div style={{
              textAlign: 'right',
              marginBottom: '30px'
            }}>
              <Link to="/police_forgotpassword" style={{
                color: '#2c3e50',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#34495e'}
              onMouseLeave={(e) => e.target.style.color = '#2c3e50'}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: '#2c3e50',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '25px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#34495e';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2c3e50';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Sign In
            </button>

            {/* Register Link */}
            <div style={{
              textAlign: 'center',
              color: '#7f8c8d',
              fontSize: '14px'
            }}>
              Don't have an account?{" "}
              <Link to="/police_register" style={{
                color: '#2c3e50',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#34495e'}
              onMouseLeave={(e) => e.target.style.color = '#2c3e50'}
              >
                Register Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PoliceLogin;
