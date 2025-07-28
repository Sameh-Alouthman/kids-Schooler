import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className="bg-gray-900 text-gray-100 w-64 min-h-screen p-6 flex flex-col">
    <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>
    <nav className="flex flex-col space-y-4">
      <Link to="/AdminDashboard" className="hover:bg-gray-700 rounded px-3 py-2">
        Dashboard
      </Link>

      <Link to="/AdminUser" className="hover:bg-gray-700 rounded px-3 py-2">
        Users
      </Link>

      <Link to="/AdminStory" className="hover:bg-gray-700 rounded px-3 py-2">
        Stories
      </Link>

      <Link to="/AdminGame" className="hover:bg-gray-700 rounded px-3 py-2">
        Games
      </Link>
      <Link to="/AdminQuizz" className="hover:bg-gray-700 rounded px-3 py-2">
        Quizzes
      </Link>
      <Link to="/AdminLesson" className="hover:bg-gray-700 rounded px-3 py-2">
        Lessons
      </Link>
      <Link to="/login" className="hover:bg-gray-700 rounded px-3 py-2">
        log out
      </Link>
    </nav>
  </div>
);

export default Sidebar;
