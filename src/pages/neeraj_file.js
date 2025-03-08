import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from "recharts";

export default function SuburbPopulationGraphs() {
  const [chartData, setChartData] = useState(null);
  const [selectedSuburb, setSelectedSuburb] = useState("Aspley");

  useEffect(() => {
    fetch(`/data/${selectedSuburb}_population_data.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('HELLO')
        console.log(response.json)
        return response.json();
      })
      .then(data => {
        console.log("Fetched data:", data); // Debugging
        // setChartData(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, [selectedSuburb]);

  return (
    <div style={{ width: "100%", height: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Population Density & Growth (2018-2023)</h2>
      
      {/* Dropdown for Suburb Selection */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <label>Select Suburb: </label>
        <select onChange={(e) => setSelectedSuburb(e.target.value)} value={selectedSuburb}>
          <option value="Aspley">Aspley</option>
          {/* Add more suburbs here when available */}
        </select>
      </div>

      {/* Population Density Line Chart */}
      {chartData && (
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ textAlign: "center" }}>Population Density (persons/km²)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.population_density} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 14 }} />
              <YAxis label={{ value: "Persons/km²", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Total Population Bar Chart */}
      {chartData && (
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ textAlign: "center" }}>Total Population</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.total_population} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 14 }} />
              <YAxis label={{ value: "Total Population", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Male vs Female Segmented Bar Chart */}
      {chartData && (
        <div>
          <h3 style={{ textAlign: "center" }}>Male vs Female Population</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.gender_population.males.map((m, i) => ({
              year: m.year,
              males: m.value,
              females: chartData.gender_population.females[i].value
            }))} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 14 }} />
              <YAxis label={{ value: "Population", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="males" fill="#3498db" />
              <Bar dataKey="females" fill="#e74c3c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}