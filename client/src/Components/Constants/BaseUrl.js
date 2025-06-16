import axios from 'axios';

const axiosInstance = axios.create({

//server api
  
  // baseURL: 'http://hybrid.srishticampus.in:4042/crime_reporting_api/', 


//local api

baseURL: 'http://localhost:4042/crime_reporting_api/', 

  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance