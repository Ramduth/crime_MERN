import React from "react";
import "../../Assets/Styles/CitizenLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../Constants/Schema";
import { toast } from "react-toastify";
import axiosInstance from "../Constants/BaseUrl";

function CitizenLogin() {
  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log(values);
    axiosInstance
      .post("/loginCitizen", values)
      .then((res) => {
        console.log("working", res);
        if (res.data.status === 200) {
          localStorage.setItem("citizenToken", res.data.data._id);
          toast.success("Login Successful");
          navigate("/citizen_home");
        } else if (res.data.status === 405) {
          toast.warning(res.data.msg);
        } else {
          toast.error("Login Failed");
        }
      })
      .catch((err) => {
        toast.error("Login Failed");
      });
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
      <div className="container">
        <div className="row citizen_login_box">
          <div className="container col-lg-6 col-md-4 col-sm-6 citizen_login_left"></div>
          <div className="col-lg-6 col-md-8 col-sm-6 citizen_login_right ">
            <h2 className="citizen_login_title">Citizen Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="citizen_login_input_grp">
                <input
                  type="email"
                  className="form-control user_inp"
                  id="email"
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
                <p className="text-end fs-6">
                  <Link to="/citizen_forgotpassword">Forgot Password?</Link>
                </p>
                <button type="submit" className="button_bg w-100 mt-3">
                  Login
                </button>
                <p className="fs-6">
                  Don't have an account?{" "}
                  <Link to="/citizen_register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CitizenLogin;
