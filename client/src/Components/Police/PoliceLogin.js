import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../Constants/Schema";
import policelogin from "../../Assets/Images/policelogin.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";

function PoliceLogin() {

  const [isToastVisible, setToastVisible] = useState(false);
  const navigate=useNavigate();


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
    <div>
      <Row>
        <Col className="container">
          <img className="image" src={policelogin} alt="img"></img>
        </Col>
        <Col className="container">
          <h2 className="policelog">Police Login</h2>
          <form onSubmit={handleSubmit} >
            <div className="citizen_login_input_grp">
            <input
              type="email"
              className="form-control user_inp"
              id="password"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <span className="text-danger">{errors.email}</span>
            )}
            <input
              type="password"
              className="form-control user_inp mt-3"
              id="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <span className="text-danger">{errors.password}</span>
            )}

            <p className="text-end">
              <Link to="/police_forgotpassword">Forgot Password?</Link>
            </p>

            <button type="submit" className="btnlogin" >
              Login
            </button>
            <p>
              Don't have an account? <Link to="/police_register">Register</Link>
            </p>
          </div>
          </form>
          
        </Col>
      </Row>
    </div>
  );
}

export default PoliceLogin;
