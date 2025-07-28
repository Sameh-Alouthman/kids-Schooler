import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaMinus,
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

const VideoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans relative overflow-hidden min-h-screen bg-gradient-to-br from-[#fff3f9] to-[#dbeffe]">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingIcon Icon={FaPlus} className="top-[10%] left-[5%]" />
        <FloatingIcon Icon={FaMinus} className="top-[30%] left-[40%]" />
        <FloatingIcon Icon={FaStar} className="top-[42%] right-[35%]" />
        <FloatingIcon Icon={FaSmile} className="bottom-[8%] right-[5%]" />
        <FloatingIcon Icon={FaRocket} className="top-[40%] left-[15%]" />
        <FloatingIcon Icon={FaEquals} className="bottom-[28%] left-[5%]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-20 px-6 sm:px-10 lg:px-20 max-w-5xl mx-auto rounded-b-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-[#bb4fa9] mb-6 text-center">
          Addition Video Lesson
        </h1>

        <div className="w-full max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden p-4">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/AaxrqDuw1Xk"
              title="Addition Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        <p className="text-center text-xl text-gray-700 mt-8 mb-10">
          Let's learn to add numbers together!{" "}
          <span className="text-2xl">➕</span>
        </p>

        <div className="flex justify-center space-x-6">
          <button
            onClick={() => navigate("/Add")}
            className="bg-[#bb4fa9] hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:scale-105 transition flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <button
            onClick={() => navigate("/lesson")}
            className="bg-[#f0c96a] hover:bg-yellow-500 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:scale-105 transition flex items-center"
          >
            Next <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Robot Character */}
    </div>
  );
};

export default VideoPage;