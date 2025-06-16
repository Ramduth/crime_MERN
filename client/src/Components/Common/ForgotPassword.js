import React from "react";
import "../../Assets/Styles/CitizenForgotPassword.css";
import { useFormik } from "formik";
import { ForgotPasswordSchema } from "../Constants/Schema";
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgotPassword({ activeUser }) {
  const navigate = useNavigate();

  console.log(activeUser);

  const onSubmit = (values) => {
    const { confirmPassword, ...dataToSend } = values;
    console.log(dataToSend);

    switch (activeUser) {
      case "Citizen":
        axiosInstance
          .post("/forgotPassword", dataToSend)
          .then((res) => {
            console.log("woking", res);
            if (res.data.status == 200) {
              toast.success("Updated Successfully");
              navigate("/citizen_login");
            } else if (res.data.status == 500) {
              toast.warning(res.data.msg);
            } else {
              toast.error("Updation Failed");
            }
          })
          .catch((err) => {
            toast.error("Updation Failed");
          });
        break;

      case "Police":
        axiosInstance
          .post("/forgotPasswordPolice", dataToSend)
          .then((res) => {
            console.log("woking", res);
            if (res.data.status == 200) {
              toast.success("Updated Successfully");
              navigate("/police_login");
            } else if (res.data.status == 500) {
              toast.warning(res.data.msg);
            } else {
              toast.error("Updation Failed");
            }
          })
          .catch((err) => {
            toast.error("Updation Failed");
          });
        break;
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: ForgotPasswordSchema,
      onSubmit: onSubmit,
    });

  return (
    <div>
      <div className="container">
        <div className="row citizen_login_box">
          <div className="col-lg-7 col-md-4 col-sm-6 forgot_password_left"></div>
          <div className="col-lg-5 col-md-8 col-sm-6 citizen_login_right">
            <h2 className="citizen_login_title">Forgot Password</h2>
            <p className="citizen_forgot_password_subtitle">{activeUser}</p>
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

              <input
                type="password"
                className="form-control user_inp mt-3"
                id="confirmPassword"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <span className="text-danger">{errors.confirmPassword}</span>
              )}

              <button
                type="submit"
                className="button_bg w-100 mt-3"
                onClick={handleSubmit}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
