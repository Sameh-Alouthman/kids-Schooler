import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { FaCalculator, FaBook, FaFlask } from "react-icons/fa";

const FloatingIcon = ({ Icon, style }) => (
  <Icon
    className="text-[#bb4fa9] opacity-10 text-[4rem] lg:text-[6rem] absolute animate-float"
    style={style}
  />
);

export default function Quizzes() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen font-sans relative overflow-hidden bg-gradient-to-br from-[#fff3f9] to-[#dbeffe] pt-20">
      {/* <Navbar /> */}

      {/* Background Floating Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingIcon Icon={FaCalculator} style={{ top: "25%", left: "8%" }} />
        <FloatingIcon Icon={FaBook} style={{ top: "60%", right: "10%" }} />
        <FloatingIcon Icon={FaFlask} style={{ top: "40%", left: "50%" }} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-6 sm:px-10 lg:px-20 py-20 text-center max-w-6xl mx-auto flex-grow">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#bb4fa9] mb-8 leading-tight">
          🎯 Choose Your <span className="text-[#f0c96a]">Quiz</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {/* Math Quiz */}
          <div
            onClick={() => navigate("/math-quiz")}
            className="relative bg-white rounded-3xl shadow-[0px_10px_25px_rgba(0,0,0,0.1)] p-6 cursor-pointer transition-transform hover:-translate-y-2 border-t-[6px] border-[#87eb9d]"
          >
            <FaCalculator className="text-5xl text-[#87eb9d] mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-[#bb4fa9] mb-2">
              Math Quiz
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Practice your math skills: addition, subtraction, and more!
            </p>
            <FaCalculator className="absolute text-[#bb4fa9] text-[8rem] opacity-5 bottom-2 right-2" />
          </div>

          {/* English Quiz */}
          <div
            onClick={() => navigate("/english-quiz")}
            className="relative bg-white rounded-3xl shadow-[0px_10px_25px_rgba(0,0,0,0.1)] p-6 cursor-pointer transition-transform hover:-translate-y-2 border-t-[6px] border-[#ffb6c1]"
          >
            <FaBook className="text-5xl text-[#ff85b3] mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-[#bb4fa9] mb-2">
              English Quiz
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Explore singular/plural, grammar, and vocabulary!
            </p>
            <FaBook className="absolute text-[#bb4fa9] text-[8rem] opacity-5 bottom-2 right-2" />
          </div>

          {/* Science Quiz */}
          <div
            onClick={() => navigate("/science-quiz")}
            className="relative bg-white rounded-3xl shadow-[0px_10px_25px_rgba(0,0,0,0.1)] p-6 cursor-pointer transition-transform hover:-translate-y-2 border-t-[6px] border-[#4ade80]"
          >
            <FaFlask className="text-5xl text-[#4ade80] mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-[#bb4fa9] mb-2">
              Science Quiz
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Fun questions about animals, space, nature & more!
            </p>
            <FaFlask className="absolute text-[#bb4fa9] text-[8rem] opacity-5 bottom-2 right-2" />
          </div>
        </div>
      </main>
    </div>
  );
}
