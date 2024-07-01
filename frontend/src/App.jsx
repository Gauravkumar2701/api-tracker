import { useEffect, useState } from "react";
import "./App.css";
import DataTable from "./Components/RequestTable.jsx";
import PChart from "./Components/PiChart.jsx";
import axios from "axios";
import BarChartComponent from './Components/BarChart.jsx'
function App() {
  const [pieData, setPieData] = useState([]);
  const [tableData, setTableData] = useState([]);

  async function getData() {
    const data = await axios.get("http://127.0.0.1:8000/api-analytics/info/");
    let map = new Map();
    data.data.forEach((element) => {
      if (map.has(element.user_agent)) {
        let temp = map.get(element.user_agent);
        temp.value = temp.value + 1;
        map.set(element.user_agent, temp);
      } else {
        map.set(element.user_agent, {
          id: map.size + 1,
          value: 1,
          label: element.user_agent,
        });
      }
    });

    const array = Array.from(map.values()).map((key) => key);
    console.log(array);
    
    setPieData(array.reverse());
    setTableData(data.data);
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <div className="main-container">
        <div className="header">API Analytics DashBoard</div>
        <div className="charts">
          <div className="pi-chart">
            <PChart data={pieData} />
          </div>
          <div className="bar-chart">
            <BarChartComponent />
          </div>
        </div>
        <div className="request-table">
          <div>
            <DataTable data={tableData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
