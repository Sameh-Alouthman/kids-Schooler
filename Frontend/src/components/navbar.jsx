import React, { useState, useEffect } from "react";
import {
  FaGamepad,
  FaBook,
  FaQuestionCircle,
  FaBookOpen,
  FaBars,
  FaTimes,
  FaHome,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";

const PINK = "#bb4fa9";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("authToken");
  const infoRaw = localStorage.getItem("userInfo");
  const info = infoRaw ? JSON.parse(infoRaw) : null;
  const isAdmin = info?.type === "admin";

  const hiddenNavbarRoutes = [
    "/AdminDashboard",
    "/AdminUser",
    "/AdminStory",
    "/AdminGame",
    "/AdminQuizz",
    "/AdminLesson",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    setMenuOpen(false);
    setShowDropdown(false);
    navigate("/login");
  };

  const handleLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) return null;

  const shouldHideNavbar = hiddenNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  if (shouldHideNavbar) return null;

  const links = [
    { to: "/", label: "Home", icon: <FaHome className="text-2xl" /> },
    { to: "/games", label: "Games", icon: <FaGamepad className="text-2xl" /> },
    { to: "/lessons", label: "Lessons", icon: <FaBook className="text-2xl" /> },
    {
      to: "/quizzes",
      label: "Quizzes",
      icon: <FaQuestionCircle className="text-2xl" />,
    },
    {
      to: "/stories",
      label: "Stories",
      icon: <FaBookOpen className="text-2xl" />,
    },
  ];

  const isHomePage = location.pathname === "/";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full px-6 py-0 rounded-b-2xl z-40 transition-colors duration-300 flex items-center justify-between ${
          isHomePage && !scrolled
            ? "bg-transparent text-[#bb4fa9] backdrop-blur-sm"
            : "bg-white text-gray-800 shadow-lg"
        }`}
        style={{
          backdropFilter: isHomePage && !scrolled ? "blur(10px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="https://res.cloudinary.com/dos9zxky6/image/upload/v1753216648/logo_ydxler.png"
              alt="KidsScholar Logo"
              className="w-32 object-contain"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10 text-lg font-semibold">
            {isAdmin && (
              <Link
                to="/AdminDashboard"
                className={`group relative flex items-center gap-2 font-semibold text-[${PINK}] transition duration-300`}
              >
                <FaUserCircle className="text-2xl" />
                <span className="relative z-10">Dashboard</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
                  <span className="absolute inset-0 blur-[6px] bg-[#bb4fa9] opacity-30 rounded-full pointer-events-none mix-blend-screen"></span>
                </span>
              </Link>
            )}
            {links.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className="group relative flex items-center gap-2 font-semibold text-[#bb4fa9] transition duration-300"
              >
                {icon}
                <span className="relative z-10">{label}</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
                  <span className="absolute inset-0 blur-[6px] bg-[#bb4fa9] opacity-30 rounded-full pointer-events-none mix-blend-screen"></span>
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 relative">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-2xl text-[#bb4fa9] relative group transition duration-300"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FaBars />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="absolute inset-0 blur-[6px] bg-[#bb4fa9] opacity-30 rounded-full pointer-events-none mix-blend-screen"></span>
              </span>
            </button>

            {/* Login / Profile */}
            {!token ? (
              <button
                onClick={handleLogin}
                className={`bg-[#F0C96A] text-white font-bold px-5 py-2 rounded-xl hover:bg-pink-700 transition duration-200 shadow-md`}
              >
                Login
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-[#bb4fa9] text-3xl"
                >
                  <FaUserCircle />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow-lg py-2 w-40 z-50 text-[#bb4fa9]">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar for mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />

          <div className="relative w-72 h-full bg-[#bb4fa9] text-white p-6 shadow-lg flex flex-col space-y-6 text-lg z-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-2xl hover:text-[#E6E6FA]"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>
            {isAdmin && (
              <Link
                to="/AdminDashboard"
                onClick={() => setMenuOpen(false)}
                className={`group relative flex items-center gap-3 transition duration-300 text-white/80 hover:text-white`}
              >
                <FaUserCircle className="text-2xl" />
                <span className="relative z-10">Dashboard</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
                  <span className="absolute inset-0 blur-[6px] bg-white opacity-20 rounded-full pointer-events-none mix-blend-screen" />
                </span>
              </Link>
            )}
            {links.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`group relative flex items-center gap-3 transition duration-300 ${
                  isActive(to)
                    ? "text-white font-bold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {icon}
                <span className="relative z-10">{label}</span>
                {!isActive(to) && (
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
                    <span className="absolute inset-0 blur-[6px] bg-white opacity-20 rounded-full pointer-events-none mix-blend-screen" />
                  </span>
                )}
              </Link>
            ))}

            {token && (
              <button
                onClick={handleLogout}
                className="group relative flex items-center gap-3 text-white/80 hover:text-white transition duration-300"
              >
                <FaSignOutAlt className="text-2xl" />
                <span className="relative z-10">Logout</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
                  <span className="absolute inset-0 blur-[6px] bg-white opacity-20 rounded-full pointer-events-none mix-blend-screen" />
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
