import axios from "axios";
import Sidebar from "./Admin-Sidebar";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function LessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(20); // items per page
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userRole = userInfo?.type;
    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    if (userRole !== "admin") {
      setError("Unauthorized: Admin access only.");
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(
        `http://localhost:5300/api/lessons/all?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLessons(res.data.lessons);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch lessons");
        setLoading(false);
      });
  }, [page, limit]);

  if (loading) return <p className="p-6 text-center">Loading lessons...</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;

  const handleDeleteLesson = (lessonId) => {
    axios
      .delete(`http://localhost:5300/api/lessons/${lessonId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setLessons((prevLesson) =>
          prevLesson.filter((lesson) => lesson._id !== lessonId)
        );
      })
      .catch((error) => {
        console.error(`Error Deleting User: ${error}`);
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Lessons List</h1>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Language
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remove Lesson
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lessons.map((lesson) => (
                <tr key={lesson._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lesson.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {lesson.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lesson.language || "English"}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap max-w-xs truncate"
                    title={lesson.content}
                  >
                    {lesson.content}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteLesson(lesson._id)}
                      className="text-red-600 hover:text-red-800 ml-10"
                      aria-label={`Delete lesson ${lesson.title}`}
                      title="Delete lesson"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
