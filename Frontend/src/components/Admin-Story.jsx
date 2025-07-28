import axios from "axios";
import Sidebar from "./Admin-Sidebar";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function UsersPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(20); // items per page
  const [totalPages, setTotalPages] = useState(1);
const token = localStorage.getItem("authToken");

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(
        `http://localhost:5300/api/stories/all?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setStories(res.data.stories);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch stories");
        setLoading(false);
      });
  }, [page, limit]);

  if (loading) return <p className="p-6 text-center">Loading users...</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;

  const handleDeleteStory = (storyId) => {
    axios
      .delete(`http://localhost:5300/api/stories/${storyId}`)
      .then(() => {
        setStories((prevStory) =>
          prevStory.filter((story) => story._id !== storyId)
        );
      })
      .catch((error) => {
        console.error(`Error Deleting Story: ${error}`);
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Stories List</h1>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Language
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remove Story
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stories.map((story) => (
                <tr key={story._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{story.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {story.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {story.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {story.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {story.language || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {story.section}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteStory(story._id)}
                      className="text-red-600 hover:text-red-800 ml-10"
                      aria-label={`Delete story ${story.title}`}
                      title="Delete story"
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
