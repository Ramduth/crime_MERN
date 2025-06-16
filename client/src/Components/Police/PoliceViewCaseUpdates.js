import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';

function PoliceViewCaseUpdates() {

    const {id}=useParams();

    const [data, setData] = useState([]);
  const getData = () => {
    axiosInstance
      .post(`/viewPoliceCaseByCrimeId/${id}`)
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
    <div>
      <div className="text-center text-danger mt-5 mb-5">
        <h4 className="report-crime-h4">View Case Updates</h4>
      </div>
      <div className="container" style={{minHeight:'50vh'}}>
        <div className="row">
          {data.length
            ? data.map((e) => {
                return (
                  <div className="col-3">
                    <div class="card" style={{border:'1px solid grey'}}>
                      <div class="card-body">
                        <h5 class="card-title">Incharge Officer : {e.officeInCharge}</h5>
                        {/* <h6 class="card-subtitle mb-2 text-body-secondary">
                       {e.district}
                        </h6> */}
                        <p class="card-text">
                          Status : {e.status}<br/>
                          Description : {e.description}<br/>
                          
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            : <div >
                <h1>No Updates Available.</h1>
                </div>}
        </div>
      </div>
    </div>
  )
}

export default PoliceViewCaseUpdates
