import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import axiosInstance from "../Constants/BaseUrl";
import { Link } from "react-router-dom";

function ScrbBarChart() {
  const allDistricts = [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ];

  const caseTypes = [
    "Theft",
    "Assault",
    "Vandalism",
    "Missing Person",
    "Domestic Violence",
    "Fraud",
    "Others",
  ];

  const [districts, setDistricts] = useState([]);
  const [type, setType] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    axiosInstance
      .post("/getTotalCrimesByDistrict")
      .then((res) => {
        if (res.data.status === 200) {
          const apiData = res.data.data || [];
          const mergedData = allDistricts.map((district) => {
            const found = apiData.find((item) => item.district === district);
            return found ? found : { district, totalCrimes: 0 };
          });
          setDistricts(mergedData);
        } else if (res.data.status === 404) {
          const mergedData = allDistricts.map((district) => ({
            district,
            totalCrimes: 0,
          }));
          setDistricts(mergedData);
          console.log("No data found for this police station");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      axiosInstance
        .post(`/getCrimeTypeCountsByDistrict/${selectedDistrict}`)
        .then((res) => {
          if (res.data.status === 200) {
            const apiData = res.data.data || [];
            const mergedData = caseTypes.map((type) => {
              const found = apiData.find((item) => item.type === type);
              return found ? found : { type, count: 0 };
            });
            setType(mergedData);
          } else if (res.data.status === 404) {
            const mergedData = caseTypes.map((type) => ({
              type,
              count: 0,
            }));
            setType(mergedData);
            console.log("No data found for this police station");
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, [selectedDistrict]);

  const clearFilters = () => {
    setSelectedDistrict("");
    setType([]);
  };

  return (
    <div>
      <select
        onChange={(e) => {
          setSelectedDistrict(e.target.value);
        }}
        required
      >
        <option>Select District</option>
        {allDistricts.map((district, index) => (
          <option key={index} value={district}>
            {district}
          </option>
        ))}
      </select>
      <Link className="mx-2" onClick={clearFilters}>
        clear all filters
      </Link>
      <div style={{ width: "70%", height: 700 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={type.length > 0 ? type : districts}
            margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
          >
            <XAxis
              dataKey={type.length > 0 ? "type" : "district"}
              angle={90}
              textAnchor="start"
              interval={0}
              dy={10}
              fontSize={12}
            />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey={type.length > 0 ? "count" : "totalCrimes"}
              fill="#A10303"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ScrbBarChart;
