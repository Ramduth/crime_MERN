import "../../Assets/Styles/AdminViewNotification.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";

function ViewNotifications() {
  const [crimeAlerts, setCrimeAlerts] = useState([]);

  useEffect(() => {
    axiosInstance
      .post("/viewAllNotifications")
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setCrimeAlerts(res.data.data || []);
        } else {
          setCrimeAlerts([]);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);
  return (
    <div className="container">
      <div className="pt-5">
        <h4 className="scrb-dash-h4">Welcome SCRB</h4>
        <p className="scrb-dash-para">All System are running smoothly</p>
      </div>
      <div className="crime-alerts-table container">
        <h2 className="crime_alerts_h2">Crime Alerts</h2>
        {crimeAlerts.length > 0 ? (
          <table className="crime-alerts-table_tab">
            <thead>
              <tr>
                <th className="crime-alerts-table-th-td">
                  Police Station Name
                </th>
                <th className="crime-alerts-table-th-td">District</th>
                {/* <th className='crime-alerts-table-th-td'>Count</th> */}
                <th className="crime-alerts-table-th-td">Crime Type</th>
                <th className="crime-alerts-table-th-td">Date</th>
                <th className="crime-alerts-table-th-td">Details</th>
              </tr>
            </thead>
            <tbody>
              {crimeAlerts.map((alert) => (
                <tr key={alert.id}>
                  <td className="crime-alerts-table-th-td">
                    {alert.psId.policestationname}
                  </td>
                  <td className="crime-alerts-table-th-td">{alert.district}</td>
                  {/* <td className='crime-alerts-table-th-td'>{alert.count}</td> */}
                  <td className="crime-alerts-table-th-td">{alert.caseType}</td>
                  <td className="crime-alerts-table-th-td">
                    {alert.date.slice(0, 10)}
                  </td>
                  <td className="crime-alerts-table-th-td">
                    <Link
                      to={`/admin-viewNotificationDetails/${alert.psId._id}`}
                    >
                      <button className="view-notification-details-btn">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>No Data Found</h1>
        )}
      </div>
    </div>
  );
}

export default ViewNotifications;
