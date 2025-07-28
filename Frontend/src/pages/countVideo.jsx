import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaSmile,
  FaRocket,
  FaEquals,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

// Floating icon component
const FloatingIcon = ({ Icon, className }) => (
  <Icon
    className={`text-gray-500 opacity-20 text-[4rem] lg:text-[6rem] absolute animate-float ${className}`}
  />
);

const CountVideo = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans relative overflow-hidden min-h-screen bg-gradient-to-br from-[#fff3f9] to-[#dbeffe]">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingIcon Icon={FaStar} className="top-[10%] left-[5%]" />
        <FloatingIcon Icon={FaSmile} className="top-[30%] left-[40%]" />
        <FloatingIcon Icon={FaRocket} className="top-[40%] right-[15%]" />
        <FloatingIcon Icon={FaEquals} className="bottom-[28%] left-[5%]" />
      </div>

      {/* Main Content - Increased min-height */}
      <div className="relative z-10 min-h-[80vh] py-20 px-6 sm:px-10 lg:px-20 max-w-5xl mx-auto rounded-b-3xl flex flex-col justify-center">
        <div className="w-full">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-[#bb4fa9] mb-6 text-center">
            Counting Video Lesson
          </h1>

          {/* Taller video container */}
          <div className="w-full max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden p-4">
            <div className="aspect-w-16 aspect-h-9 h-[500px]">
              {" "}
              {/* Increased height */}
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/mKSNQuQrsm0"
                title="Counting! | Mini Math Movies | Scratch Garden"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <p className="text-center text-xl text-gray-700 mt-8 mb-10">
            Let's learn to count numbers from 1 to 20!{" "}
            <span className="text-2xl">🔢</span>
          </p>

          <div className="flex justify-center space-x-6">
            <button
              onClick={() => navigate("/Add")}
              className="bg-[#bb4fa9] hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:scale-105 transition flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
            <button
              onClick={() => navigate("/CountLesson")}
              className="bg-[#f0c96a] hover:bg-yellow-500 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:scale-105 transition flex items-center"
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Robot Character */}
    </div>
  );
};

export default CountVideo;