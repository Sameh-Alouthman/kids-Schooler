
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import {
  FaStar,
  FaSmile,
  FaRocket,
  FaArrowLeft,
  FaVolumeUp
} from "react-icons/fa";

// Floating icon component
const FloatingIcon = ({ Icon, className }) => (
  <Icon
    className={`text-gray-500 opacity-20 text-[4rem] lg:text-[6rem] absolute animate-float ${className}`}
  />
);

const items = [
  { number: 1, label: "One" },
  { number: 2, label: "Two" },
  { number: 3, label: "Three" },
  { number: 4, label: "Four" },
  { number: 5, label: "Five" },
  { number: 6, label: "Six" },
  { number: 7, label: "Seven" },
  { number: 8, label: "Eight" },
  { number: 9, label: "Nine" },
  { number: 10, label: "Ten" },
  { number: 11, label: "Eleven" },
  { number: 12, label: "Twelve" },
  { number: 13, label: "Thirteen" },
  { number: 14, label: "Fourteen" },
  { number: 15, label: "Fifteen" },
  { number: 16, label: "Sixteen" },
  { number: 17, label: "Seventeen" },
  { number: 18, label: "Eighteen" },
  { number: 19, label: "Nineteen" },
  { number: 20, label: "Twenty" },
];

const CountLesson = () => {
  const navigate = useNavigate();

const speak = (text) => {
  if (!window.speechSynthesis) {
    alert("Speech Synthesis not supported in this browser.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;

  const voices = window.speechSynthesis.getVoices();

  const preferredVoices = [
    "Google US English",
  ];

  const femaleVoice =
    voices.find((v) => preferredVoices.includes(v.name)) ||
    voices.find(
      (v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")
    ) ||
    voices.find((v) => v.lang.startsWith("en"));

  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};


  return (
    <div className="min-h-screen font-sans relative overflow-hidden bg-gradient-to-br from-[#fff3f9] to-[#dbeffe] flex flex-col justify-start">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingIcon Icon={FaStar} className="top-[10%] left-[5%]" />
        <FloatingIcon Icon={FaSmile} className="top-[30%] left-[40%]" />
        <FloatingIcon Icon={FaRocket} className="top-[40%] right-[15%]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full py-24 px-4 sm:px-8 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/countVideo")}
            className="bg-[#bb4fa9] hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:scale-105 transition flex items-center mb-8"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#bb4fa9] mb-4">
              Count With Us! <span className="text-[#f0c96a]">1-20</span>
            </h1>
            <p className="text-xl text-gray-700">
              Click any number to hear it spoken aloud
            </p>
          </div>

          {/* Grid of Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {items.map(({ number, label }) => (
              <div
                key={number}
                className="bg-[#fff3f9] border-4 border-[#f0c96a] rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center text-center hover:scale-105 transition transform duration-300 cursor-pointer"
                onClick={() => speak(label)}
              >
                <div className="text-5xl font-bold text-[#bb4fa9]">
                  {number}
                </div>
                <div className="text-xl mt-2 font-medium text-gray-700 flex items-center">
                  {label} <FaVolumeUp className="ml-2 text-[#f0c96a]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Robot Character */}
      <div className="absolute bottom-10 right-6 sm:right-10 p-4 z-10 pointer-events-none">
        <img
          src="https://res.cloudinary.com/dos9zxky6/image/upload/v1753223861/robot_lfu0gs.png"
          alt="Counting robot helper"
          className="w-32 sm:w-40 lg:w-60 object-contain"
        />
      </div>
    </div>
  );
};

export default CountLesson;