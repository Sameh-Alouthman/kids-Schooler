import axios from "axios";
import Sidebar from "./Admin-Sidebar";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function GamesPage() {
  const [games, setGames] = useState([]);
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
      .get(`http://localhost:5300/api/games/all?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setGames(res.data.games);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch games");
        setLoading(false);
      });
  }, [page, limit]);

  if (loading) return <p className="p-6 text-center">Loading games...</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;

const handleDeleteGame = (gameId) => {
  axios
    .delete(`http://localhost:5300/api/games/${gameId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setGames((prevGame) => prevGame.filter((game) => game._id !== gameId));
    })
    .catch((error) => {
      console.error(`Error Deleting quizz: ${error}`);
    });
};


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Games List</h1>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remove Game</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {games.map((game) => (
                <tr key={game._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{game.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{game.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{game.category}</td>
                   <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteGame(game._id)}
                          className="text-red-600 hover:text-red-800 ml-10"
                          aria-label={`Delete game ${game.name}`}
                          title="Delete game"
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
