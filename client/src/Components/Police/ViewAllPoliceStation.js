import React, { useEffect, useState } from "react";
import axiosInstance from "../Constants/BaseUrl";
import { IoEyeSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import "./Police.css";
import { Link } from "react-router-dom";

function ViewAllPoliceStation() {
  const [data, setData] = useState([]);

  const getData = () => {
    axiosInstance
      .post("/viewPolices")
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

  const handleActivate = (id) => {
    console.log("in btn", id);
    axiosInstance
      .post(`/activatePoliceById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          const updatedData = data.map((policestationview) => {
            if (policestationview._id === id) {
              return { ...policestationview, isActive: true };
            }
            return policestationview;
          });
          setData(updatedData);
          getData();
        } else {
          console.error("No data obtained");
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleDeactivate = (id) => {
    axiosInstance
      .post(`deactivatePoliceById/${id}`)
      .then((res) => {
        if (res.data.status == 200) {
          const updatedData = data.map((policestationview) => {
            if (policestationview._id === id) {
              return { ...policestationview, isActive: false };
            }
            return policestationview;
          });
          setData(updatedData);
        }
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };
  return (
    <div>
      <div className="container">
        <div className="pt-5">
          <h4 className="admin-dash-h4">Welcome Admin</h4>
          <p className="admin-dash-para">All System are running smoothly</p>
        </div>
        <div className=" text-center mt-5 text-danger">
          <h5>View All Police Station</h5>
        </div>
        <div>
          {data.length === 0 && <h1>No Data Found</h1>}
          {data.length > 0 && (
            <table class="table table-bordered table-striped mt-4">
              <thead className="text-center newpolice-stationreq-thead">
                <tr className="">
                  <th scope="col">Sl/No</th>
                  <th scope="col">PoliceStation Name</th>
                  <th scope="col">Station Incharge</th>
                  <th scope="col">PoliceStation Code</th>
                  <th scope="col">District</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.map((policestationview, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{policestationview.policestationname}</td>
                    <td>{policestationview.stationchargeofficers}</td>
                    <td>{policestationview.policestationcode}</td>
                    <td>{policestationview.district}</td>
                    <td>
                      <Link
                        to={`/admin_viewallpolice/${policestationview._id}`}
                      >
                        <button className="viewallpolicest_icon">
                          <IoEyeSharp />
                        </button>
                      </Link>

                      {policestationview.isActive ? (
                        <button
                          className="ms-4 viewpolicestation_cross_icon"
                          onClick={() =>
                            handleDeactivate(policestationview._id)
                          }
                        >
                          <RxCross2 />
                        </button>
                      ) : (
                        <button
                          className="ms-4 viewpolicestation_tick_icon"
                          onClick={() => handleActivate(policestationview._id)}
                        >
                          <TiTick />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewAllPoliceStation;
