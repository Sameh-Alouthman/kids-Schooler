import axios from "axios";
import Sidebar from "./Admin-Sidebar";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(20); // quizzes per page
  const [totalPages, setTotalPages] = useState(1);
const token = localStorage.getItem("authToken");

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(
        `http://localhost:5300/api/quizzes/all?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setQuizzes(res.data.quizzes);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch quizzes");
        setLoading(false);
      });
  }, [page, limit]);

  if (loading) return <p className="p-6 text-center">Loading quizzes...</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;

const handleDeleteQuizz = (quizzId) => {
  axios
    .delete(`http://localhost:5300/api/quizzes/${quizzId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setQuizzes((prevQuizz) =>
        prevQuizz.filter((quizz) => quizz._id !== quizzId)
      );
    })
    .catch((error) => {
      console.error(`Error Deleting quizz: ${error}`);
    });
};

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Quizzes List</h1>
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
                  Lesson
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Story
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  # of Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remove Quizz
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quizzes.map((quiz) => (
                <tr key={quiz._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{quiz.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quiz.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quiz.lesson?.title || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quiz.story?.title || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quiz.questions?.length ?? 0}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteQuizz(quiz._id)}
                      className="text-red-600 hover:text-red-800 ml-10"
                      aria-label={`Delete quizz ${quiz.name}`}
                      title="Delete quizz"
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
