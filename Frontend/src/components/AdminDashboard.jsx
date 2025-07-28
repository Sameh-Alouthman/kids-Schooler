import React, { useEffect, useState } from "react";
import Charts from "./Charts";
import axios from "axios";
import Sidebar from "./Admin-Sidebar";

const Card = ({ title, value }) => (
  <div className="bg-white shadow rounded p-4 sm:p-6 flex flex-col">
    <span className="text-gray-500 text-xs sm:text-sm">{title}</span>
    <span className="text-2xl sm:text-3xl font-bold">{value}</span>
  </div>
);

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [storiesCount, setStoriesCount] = useState(0);
  const [quizzesCount, setQuizzesCount] = useState(0);
  const [lessonsCount, setLessonsCount] = useState(0);
const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get("http://localhost:5300/api/users/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserCount(response.data.count);
      })
      .catch((error) => {
        console.log(`Error Getting Data ${error}`);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5300/api/stories/countAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStoriesCount(response.data.count);
      })
      .catch((error) => {
        console.log(`Error Getting Data ${error}`);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5300/api/quizzes/countAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setQuizzesCount(response.data.count);
      })
      .catch((error) => {
        console.log(`Error Getting Data ${error}`);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5300/api/lessons/countAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLessonsCount(response.data.count);
      })
      .catch((error) => {
        console.log(`Error Getting Data ${error}`);
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-30 ">
        {/* Cards: stack on xs, 2 columns on sm, 4 columns on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card title="Total Users" value={userCount} />
          <Card title="Total Stories" value={storiesCount} />
          <Card title="Total Quizzes" value={quizzesCount} />
          <Card title="Total Lessons" value={lessonsCount} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Charts />
        </div>
      </main>
    </div>
  );
}
