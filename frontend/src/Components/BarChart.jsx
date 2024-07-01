import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import axios from 'axios';

const BarChartComponent = () => {
  const [data, setData] = useState([]);
  const [criteria, setCriteria] = useState('ip_address');
  const [chartData, setChartData] = useState([]);

  const criteriaOptions = [
    { value: 'ip_address', label: 'IP Address' },
    { value: 'request_type', label: 'Request Type' },
    { value: 'os', label: 'Operating System' },
    { value: 'user_agent', label: 'Browser' },
  ];

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api-analytics/info/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(() => {
    const groupedData = data.reduce((acc, item) => {
      const key = item[criteria];
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key]++;
      return acc;
    }, {});

    const formattedData = Object.keys(groupedData).map(key => ({
      name: key,
      count: groupedData[key]
    }));

    setChartData(formattedData);
  }, [data, criteria]);

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
        <InputLabel></InputLabel>
        <Select
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
        >
          {criteriaOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <BarChart
        width={700}
        height={300}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </Box>
  );
};

export default BarChartComponent;
