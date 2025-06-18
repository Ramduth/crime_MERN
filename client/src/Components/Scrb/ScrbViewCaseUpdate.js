import React, { useEffect, useState } from "react";
import axiosInstance from "../Constants/BaseUrl";
import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import "../../Assets/Styles/Searchbox.css";

function ScrbViewCaseUpdate() {
  const [data, setData] = useState([]);
  const getData = () => {
    axiosInstance
      .post("/viewallcrime")
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
    <div className="container">
      <div className="pt-5">
        <h4 className="scrb-dash-h4">Welcome SCRB</h4>
        <p className="scrb-dash-para">All System are running smoothly</p>
      </div>
      <div className=" text-center mt-5 text-danger">
        <div className="row">
          <div className="col-md-9">
            <h5>View All Cases</h5>
          </div>
          {/* <div className='col-md-3'>
                        <div className="search-box">
                        <input type="text" placeholder="Search all Cases" />
                        <button type="submit">
                            <FaSearch />
                        </button>
                        </div>
                    </div> */}
        </div>
      </div>
      <div>
        {data.length === 0 && <h1>No Data Found</h1>}
        {data.length > 0 && (
          <table class="table table-bordered table-striped mt-4">
            <thead className="text-center newpolice-stationreq-thead">
              <tr className="">
                <th scope="col">Sl/No</th>
                <th scope="col">PoliceStation Name</th>
                <th scope="col">District</th>
                <th scope="col">Victim Name</th>
                <th scope="col">Type of Crime</th>
                <th scope="col">Witness Name</th>
                <th scope="col">Date</th>
                <th scope="col">View Details</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {data.map((caseview, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>{caseview.psId && caseview.psId.policestationname ? caseview.psId.policestationname : 'Not Assigned'}</td>
                  <td>{caseview.district}</td>
                  <td>{
                    caseview.citizenId
                      ? (caseview.victimName && caseview.victimName.trim() ? caseview.victimName : 'Not provided')
                      : 'Not provided'
                  }</td>
                  <td>{caseview.caseType}</td>
                  <td>{
                    caseview.citizenId
                      ? (caseview.witnessName && caseview.witnessName.trim() ? caseview.witnessName : 'Not provided')
                      : (caseview.victimName && caseview.victimName.trim() ? caseview.victimName : 'Not provided')
                  }</td>
                  <td>{caseview.incidentDate.slice(0, 10)}</td>
                  <td>
                    <Link to={`/scrb-viewcasereportdetail/${caseview._id}`}>
                      <button className="viewallpolicest_icon">
                        <IoEyeSharp />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ScrbViewCaseUpdate;
