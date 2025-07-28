
import React, { useState } from "react";
import axios from "axios";
import { FaStar, FaSmile, FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5300/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: 7, // يمكنك جعل هذا متغيرًا من الفورم لاحقًا
        type: "student", // أو أي قيمة أخرى حسب التصميم
        language: "english", // أو حسب اختيار المستخدم
      });

      if (res.data.token) {
        navigate("/login"); // توجيه المستخدم لصفحة تسجيل الدخول
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff3f9] to-[#dbeffe] font-sans relative overflow-hidden flex items-center justify-center">
      {/* خلفية زخرفية */}
      <FaStar className="text-white opacity-10 text-[4rem] lg:text-[6rem] absolute top-[10%] left-[5%] animate-pulse pointer-events-none" />
      <FaSmile className="text-white opacity-10 text-[4rem] lg:text-[6rem] absolute top-[50%] right-[10%] animate-pulse pointer-events-none" />
      <FaRocket className="text-white opacity-10 text-[4rem] lg:text-[6rem] absolute bottom-[20%] left-[20%] animate-pulse pointer-events-none" />

      {/* حاوية النموذج */}
      <div className="relative z-20 w-full max-w-md mx-4">
        <img
          src="https://res.cloudinary.com/dos9zxky6/image/upload/v1753223890/fish_zswrme.png"
          className="absolute -top-10 -left-13 w-44 z-10 animate-float"
        />
        <img
          src="https://res.cloudinary.com/dos9zxky6/image/upload/v1753223861/robot_lfu0gs.png"
          className="absolute -top-8 -right-15 w-48 z-10 animate-float"
        />
        <img
          src="https://res.cloudinary.com/dos9zxky6/image/upload/v1753223904/oct_vvarxp.png"
          className="absolute -bottom-18 left-1/2 transform -translate-x-1/2 w-52 z-10 animate-float"
        />

        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white border-opacity-50">
          <h2 className="text-3xl font-bold text-[#bb4fa9] mb-6 text-center">
            Create Your Account
          </h2>

          {error && <p className="text-red-600 text-center mb-2">{error}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#bb4fa9]"
            />
            <input
              name="email"
              onChange={handleChange}
              value={formData.email}
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#bb4fa9]"
            />
            <input
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              type="number"
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#bb4fa9]"
            />
            <input
              name="password"
              onChange={handleChange}
              value={formData.password}
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#bb4fa9]"
            />
            <input
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
              type="password"
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#bb4fa9]"
            />

            <button
              type="submit"
              className="w-full py-3 bg-[#bb4fa9] text-white rounded-lg hover:bg-[#a03d8f] hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold text-lg mt-4"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-[#bb4fa9] hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
