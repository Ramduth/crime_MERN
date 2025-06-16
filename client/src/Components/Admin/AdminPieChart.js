import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts'
import axiosInstance from '../Constants/BaseUrl';


function AdminPieChart() {

    const COLORS = [
        '#A10303', '#00C49F', '#FFBB28', '#FF8042', '#0088FE',
        '#8A2BE2', '#A52A2A', '#DEB887', '#5F9EA0', '#D2691E',
        '#FF7F50', '#6495ED', '#FFF8DC', '#DC143C'
    ];

    const[districts,setDistricts]=useState([])

    useEffect(() => {
        axiosInstance
      .post(`/getTotalCrimesByDistrict`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
            setDistricts(res.data.data || []);
        } else if (res.data.status === 404) {
            setDistricts([]);
          console.log("No data found for this police station");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
          
       
      },[]);

  return (
    <div>
      <div style={{ width: '50%', height: 400 }}>
                <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                        <Pie
                            data={districts}
                            dataKey='totalCrimes'
                            nameKey='district'
                            cx='50%'
                            cy='50%'
                            outerRadius={150}
                            fill='#8884d8'
                            label
                        >
                            {
                                districts.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))
                            }
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
    </div>
  )
}

export default AdminPieChart
