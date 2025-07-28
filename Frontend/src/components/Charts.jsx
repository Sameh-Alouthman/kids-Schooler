import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const VisitorsData = [
  { month: "Jan", visitor: 4000 },
  { month: "Feb", visitor: 3000 },
  { month: "Mar", visitor: 5000 },
  { month: "Apr", visitor: 7000 },
  { month: "May", visitor: 6000 },
  { month: "Jun", visitor: 8000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
export default function Charts() {
  const [progressCount, setProgressCount] = useState([]);
  const [gameCount, setGameCount] = useState([]);
  const [lessonsCount, setLessonsCount] = useState([]);
const token = localStorage.getItem("authToken");


  useEffect(() => {
    axios
      .get("http://localhost:5300/api/progresses/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProgressCount(response.data);
      })
      .catch((error) => {
        console.log(`Error Getting Data ${error}`);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5300/api/progresses/count-game", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGameCount(response.data);
      })
      .catch((error) => {
        console.log(`Error Getting Data ${error}`);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5300/api/lessons/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLessonsCount(response.data);
      })
      .catch((error) => {
        console.log(`Error Getting Data ${error}`);
      });
  }, []);

  return (
    <>
      {/* Chart 1: Visitors Over Time (Line Chart) */}
      <div className="bg-white shadow rounded p-4 h-120">
      <h3 className="text-lg font-semibold mb-2">Most Played Games</h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={gameCount} margin={{ left: 20 }}>
          <XAxis dataKey="gameName" interval={0} angle={-20} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="playCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>

      {/* Chart 2: Sales Breakdown (Pie Chart) */}
       <div className="bg-white shadow rounded p-4 h-120">
      <h3 className="text-lg font-semibold mb-2">Content Completion Status Breakdown</h3>
      <ResponsiveContainer width="100%" height="80%">
       <PieChart>
        <Pie
          data={lessonsCount}
          dataKey="count"
          nameKey="subject"
          cx="50%"
          cy="50%"
          innerRadius={60}  // Creates the donut hole
          outerRadius={90}
          fill="#8884d8"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          labelLine={false}
          isAnimationActive={true}
        >
          {lessonsCount.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}`, "Lessons"]} />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
      </ResponsiveContainer>
    </div>

      {/* Chart 3: Orders by Region (Bar Chart) */}
      <div className="bg-white shadow rounded p-4 h-120">
         <h3 className="text-lg font-semibold mb-2">Orders by Progress Count</h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={progressCount}>
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      </div>

      {/* Chart 4: Revenue Trend (Line Chart) */}
      <div className="bg-white shadow rounded p-4 h-120">
        <h3 className="text-lg font-semibold mb-2">Total Website Visitors</h3>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={VisitorsData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="visitor"
              stroke="#ff7300"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
