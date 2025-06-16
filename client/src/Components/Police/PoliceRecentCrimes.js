import React, { useEffect, useState } from "react";
import "../../Assets/Styles/PoliceRecentCrimes.css";
import Recent_crime1_img1 from "../../Assets/Images/Recent_Crime1.png";
import Recent_crime2_img2 from "../../Assets/Images/Recent_Crime2.png";
import Recent_crime3_img3 from "../../Assets/Images/Recent_Crime3.png";
import Recent_crime4_img4 from "../../Assets/Images/Recent_Crime4.png";
import axiosInstance from "../Constants/BaseUrl";
function PoliceRecentCrimes() {

  const [data, setData] = useState([]);
  const pId = localStorage.getItem("policeId");

  useEffect(()=>{
    axiosInstance
      .post(`/viewAprvdCrimeByPolicStationId/${pId}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setData(res.data.data || []);
        } else if (res.data.status === 404) {
          setData([]);
          console.log("No data found for this police station");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  },[])

  console.log(data);

  return (
    <div className="container mb-4">
      <div className="police-recent-crimes">
        <p>Swift Justice: Act Now to Catch the Criminal!</p>
      </div>
      <div className="row ">
        <div class="card-group">
          <div class="card ">
            <img
              class="card-img-top police-crime1-img"
              src={Recent_crime1_img1}
              alt="Recent_crime1_img1"
            />
            <div class="card-body police-crime-content ">
              <p class="card-text police-crime-text">
                Minor girl kidnapped from Uttar Pradesh, raped from two months,
                rescued from Karnataka.
              </p>
              <p className="card-text police-crime-date">Oct 11, 2023 15:08</p>
            </div>
          </div>
          <div class="card">
            <img
              class="card-img-top police-crime2-img "
              src={Recent_crime2_img2}
              alt="Recent_crime2_img2"
            />
            <div class="card-body police-crime-content">
              <p class="card-text police-crime-text">
                Police have arrested a woman for killing her two younger sisters
                by slitting their throats with a shovel.
              </p>
              <p className="card-text police-crime-date">Oct 10, 2023 13:50</p>
            </div>
          </div>
          <div class="card">
            <img
              class="card-img-top police-crime3-img"
              src={Recent_crime3_img3}
              alt="Recent_crime3_img3"
            />
            <div class="card-body police-crime-content">
              <p class="card-text police-crime-text">
                West Bengal to UP, this gang stole mobile tower parts; six
                arrested.
              </p>
              <p className="card-text police-crime-date">mar 28, 2024 22:05</p>
            </div>
          </div>
          <div class="card">
            <img
              class="card-img-top police-crime4-img"
              src={Recent_crime4_img4}
              alt="Recent_crime4_img4"
            />
            <div class="card-body police-crime-content">
              <p class="card-text police-crime-text">
                A private school owner from Uttar Pradesh's Greater Noida has
                been arrested for raping a teacher on the institute premises.
              </p>
              <p className="card-text police-crime-date">Oct 11, 2023 15:08</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <div className="text-end mt-4 pe-4" >
        <button type="submit" className='button_bg'>View All</button>

        </div>
      </div> */}
    </div>
  );
}

export default PoliceRecentCrimes;
