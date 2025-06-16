import { GoAlertFill } from "react-icons/go";
import React, { useEffect, useState } from "react";
import axiosInstance from "../Constants/BaseUrl";
import { useParams } from "react-router-dom";
function PoliceViewAlerts() {
  const [data, setData] = useState([]);

  const id = localStorage.getItem("policeId");

  const getData = () => {
    axiosInstance
      .post(`/viewNotificationByPliceId/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setData(res.data.data || []);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="notification_main_div">
      <div className="notifications-table">
        <div className="text-center notification_text_style">
          {" "}
          <h2>Notifications</h2>{" "}
        </div>

        {data.length?data.map((notification) => (
          <div
            key={notification.id}
            className={`notification-row ${
              notification.target=='all' ? "high-priority" : ""
            }`}
          >
            <div className="notification-icon">
              <GoAlertFill />
            </div>
            <div className="notification-message">
              High Crime Alert! The crime rate in Downtown is currently high.
              Stay alert and report any suspicious activity immediately
            </div>
            <div className="notification-date">{notification.date.slice(0,10)}</div>
          </div>
        )):<h1>No Data Found</h1>
    }
      </div>
    </div>
  );
}

export default PoliceViewAlerts;
