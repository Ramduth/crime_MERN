import React, { useState } from "react";
import "../../Assets/Styles/AdminLogin.css";
import img from '../../Assets/Images/adminlogin.png'
import { Link, useNavigate } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { toast } from "react-toastify";
function AdminLogin() {

  const[data,setData]=useState({
    email :"",
    password:""
  });

  let mail="Admin"
  let pass="Admin@123"

  const[errors,setErrors]=useState({
    email :"",
    password:""
  })

  const Navigate=useNavigate();
  const[showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setData({
      ...data,[name]:value,
    });
    setErrors((prevErrors) => ({...prevErrors,[name]:""}));
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    let errors={};
    setErrors(errors);

    if(!errors.email && !errors.password){
      const values={ email : data.email, password : data.password};
      console.log(values);
      if(mail== data.email && pass==data.password){
        toast.success("Logged in Successfully");
        Navigate("/admin_home")
        localStorage.setItem('adminId',1)
      }
      else{
        toast.error("Username or password is incorrect")
      }
    }

  }
  
  const togglePasswordVisibility = () =>{
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility =() => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <div>
      <div className="">
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <form onSubmit={handleSubmit}>
                  <div className=" text-center container admin-login-h3">
                    <h3 className="admin-login-h3-admin">Admin</h3>
                  </div>
                  <div className="mt-5">
                    <input type="text"
                    placeholder="User Name"
                    className="admin-login-textbox"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    >
                    </input>
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                  </div>
                  <div className="mt-5 position-relative">
                    <div className="input-wrapper admin-login-icon">
                      <input 
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="admin-login-textbox"
                      name="password"
                      value={data.password}
                      isInvalid={!!errors.password}
                      onChange={handleChange}
                      ></input>
                        <div className="admin-login-password-toggle-icon" onClick={togglePasswordVisibility}>
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </div>
                    </div>
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                  </div>
                  {/* <div className="mt-3 container admin-login-link ">
                    <Link className="admin-login-forgotpswd ">Forgot Password?</Link>
                  </div> */}
                  <div className="text-center mt-3">
                  <button
                  type="submit"
                  className="admin-login-button"
                  >Login</button>
                </div>
              </form>
              </div>
              <div className="col-2"></div>
              </div> 
            </div>
           
              
          <div className="col">
            <img src={img} className="admin-login-img"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
