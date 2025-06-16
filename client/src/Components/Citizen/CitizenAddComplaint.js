import React, { useState } from "react";
import comp from "../../Assets/Images/addcomplaints.png";
import "../../Assets/Styles/CitizenAddComplaint.css";
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";

function CitizenAddComplaint() {
  const [complaint, setComplaint] = useState("");
  const id = localStorage.getItem("citizenToken");

  const handleComplaintChange = (e) => {
    setComplaint(e.target.value);
  };

  const handleComplaint = (event) => {
    event.preventDefault();

    axiosInstance
      .post(`/addComplaint`, { complaint: complaint, citizenId: id })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success("Complaint Added Successfully");
        } else {
          toast.error("Complaint Added Failed ");
        }
      })
      .catch(() => {
        toast.error("Failed");
      });
    setComplaint("");
  };

  return (
    <div>
      <div className="row citizen_add_complaint_row">
        <div className="col-md-5 col-sm-12">
          <img src={comp} className="img-fluid citizen_add_complaint_image" />
        </div>
        <div className="col-md-7 col-sm-12">
          <form onSubmit={handleComplaint}>
            <div className="citizen_add_complaint_div">
              <p className="citizen_add_complaint_text">Complaints :</p>
              <div className="text-center">
                <textarea
                  className="citizen_add_complaint_content_div"
                  rows={7}
                  cols={65}
                  name="complaint"
                  value={complaint}
                  onChange={handleComplaintChange}
                  required
                ></textarea>
              </div>
              <div className="citizen_add_comp_button_div">
                <button type="submit" className="citizen_add_complaint_button">
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CitizenAddComplaint;
