import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaSmile, FaRocket } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5300/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      // توجه حسب النوع مباشرة من البيانات
      if (response.data.type === "admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || "Error"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff3f9] to-[#dbeffe] font-sans relative overflow-hidden flex items-center justify-center">
      {/* أيقونات خلفية مرحة */}
      <FaStar className="text-white opacity-10 text-[4rem] lg:text-[6rem] absolute top-[10%] left-[5%] animate-pulse pointer-events-none" />
      <FaSmile className="text-white opacity-10 text-[4rem] lg:text-[6rem] absolute top-[50%] right-[10%] animate-pulse pointer-events-none" />
      <FaRocket className="text-white opacity-10 text-[4rem] lg:text-[6rem] absolute bottom-[20%] left-[20%] animate-pulse pointer-events-none" />

      {/* البطاقة الرئيسية */}
      <div className="relative z-20 w-full max-w-md mx-4">
        <img
          src="https://res.cloudinary.com/dos9zxky6/image/upload/v1753223904/oct_vvarxp.png"
          alt="octopus"
          className="absolute -bottom-18 left-1/2 transform -translate-x-1/2 w-50 z-10 animate-float"
        />

        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white border-opacity-50">
          <h2 className="text-3xl font-bold text-[#bb4fa9] mb-6 text-center">
            Login to your account
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bb4fa9] bg-white bg-opacity-70"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bb4fa9] bg-white bg-opacity-70"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#bb4fa9] text-white rounded-lg hover:bg-[#a03d8f] transition font-bold text-lg mt-4"
            >
              Login
            </button>

            <Link
              className="text-[#bb4fa9] hover:underline block text-center mt-2"
              to={"/register"}
            >
              Create Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
