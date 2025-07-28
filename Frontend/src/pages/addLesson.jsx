import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaMinus,
  FaStar,
  FaSmile,
  FaRocket,
  FaEquals,
  FaArrowLeft,
  FaVolumeUp,
} from "react-icons/fa";

// Floating icon component
const FloatingIcon = ({ Icon, className }) => (
  <Icon
    className={`text-gray-500 opacity-20 text-[4rem] lg:text-[6rem] absolute animate-float ${className}`}
  />
);

const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

const AddLesson = () => {
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [sum, setSum] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const newSum = num1 + num2;
    setSum(newSum);

    if ("speechSynthesis" in window) {
      const speakSum = () => {
        const utterance = new SpeechSynthesisUtterance(
          `${num1} plus ${num2} equals ${newSum}`
        );
        utterance.lang = "en-US";
        utterance.rate = 0.9;

        const voices = window.speechSynthesis.getVoices();
        const preferredVoices = [
          "Google UK English Female",
          "Microsoft Zira Desktop",
          "Google US English",
          "Samantha",
        ];

        const femaleVoice =
          voices.find((v) => preferredVoices.includes(v.name)) ||
          voices.find(
            (v) =>
              v.lang.startsWith("en") && v.name.toLowerCase().includes("female")
          ) ||
          voices.find((v) => v.lang.startsWith("en"));

        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = speakSum;
      } else {
        speakSum();
      }
    }
  }, [num1, num2]);

  return (
    <div className="font-sans relative overflow-hidden min-h-screen bg-gradient-to-br from-[#fff3f9] to-[#dbeffe] p-10">
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
      <div className="relative z-10 py-16 px-6 sm:px-10 lg:px-20 max-w-5xl mx-auto rounded-b-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-[#bb4fa9] mb-12 text-center">
          Addition Adventure! <span className="text-4xl">➕</span>
        </h1>

        <div className="bg-[#fff3f9] rounded-3xl p-8 sm:p-10 shadow-xl max-w-md w-full mx-auto flex flex-col items-center space-y-8">
          <div className="flex space-x-4 sm:space-x-6 w-full justify-center">
            {[num1, num2].map((selectedNum, idx) => (
              <select
                key={idx}
                value={selectedNum}
                onChange={(e) =>
                  idx === 0
                    ? setNum1(+e.target.value)
                    : setNum2(+e.target.value)
                }
                className="bg-yellow-100 border-4 border-[#f0c96a] rounded-xl p-3 text-2xl sm:text-3xl font-bold text-[#bb4fa9] cursor-pointer transition hover:border-[#bb4fa9]"
              >
                {numbers.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            ))}
          </div>

          <div className="text-5xl sm:text-6xl font-extrabold text-[#bb4fa9] drop-shadow-lg">
            {num1} + {num2} = <span className="text-[#f0c96a]">{sum}</span>
          </div>

          <button
            onClick={() => {
              if ("speechSynthesis" in window) {
                const utterance = new SpeechSynthesisUtterance(
                  `${num1} plus ${num2} equals ${sum}`
                );
                utterance.lang = "en-US";
                utterance.rate = 0.9;

                const voices = window.speechSynthesis.getVoices();
                const preferredVoices = [
                  "Google UK English Female",
                  "Google US English",
                  "Microsoft Zira Desktop",
                  "Samantha", // macOS
                ];

                const femaleVoice =
                  voices.find((v) => preferredVoices.includes(v.name)) ||
                  voices.find(
                    (v) =>
                      v.lang.startsWith("en") &&
                      v.name.toLowerCase().includes("female")
                  ) ||
                  voices.find((v) => v.lang.startsWith("en"));

                if (femaleVoice) {
                  utterance.voice = femaleVoice;
                }

                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(utterance);
              }
            }}
            className="bg-[#f0c96a] hover:bg-yellow-500 text-white font-bold text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-md hover:scale-105 transition flex items-center"
          >
            <FaVolumeUp className="mr-2" /> Hear it again
          </button>

          <button
            onClick={() => navigate("/VideoPage")}
            className="bg-[#bb4fa9] hover:bg-pink-600 text-white font-bold text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-md hover:scale-105 transition flex items-center mt-4"
          >
            <FaArrowLeft className="mr-2" /> Back to Video
          </button>
        </div>
      </div>

      {/* Robot Character */}
    </div>
  );
};

export default AddLesson;
