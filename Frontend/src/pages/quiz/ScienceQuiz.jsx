import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { FaBook, FaCalculator, FaFlask } from "react-icons/fa";

const questions = [
  {
    question: "What planet is known as the Red Planet?",
    options: ["Mars", "Earth", "Jupiter", "Venus"],
    correct: "Mars",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "NaCl", "O2"],
    correct: "H2O",
  },
  {
    question: "What force keeps us on the ground?",
    options: ["Gravity", "Magnetism", "Friction", "Electricity"],
    correct: "Gravity",
  },
  {
    question: "What gas do plants absorb from the air?",
    options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    correct: "Carbon Dioxide",
  },
  {
    question: "What part of the plant conducts photosynthesis?",
    options: ["Leaves", "Roots", "Stem", "Flowers"],
    correct: "Leaves",
  },
  {
    question: "What planet is the largest in our solar system?",
    options: ["Jupiter", "Saturn", "Neptune", "Earth"],
    correct: "Jupiter",
  },
  {
    question: "What do bees collect from flowers?",
    options: ["Nectar", "Pollen", "Honey", "Water"],
    correct: "Nectar",
  },
  {
    question: "What is the process by which plants make food?",
    options: ["Photosynthesis", "Respiration", "Digestion", "Transpiration"],
    correct: "Photosynthesis",
  },
  {
    question: "Which organ pumps blood through the body?",
    options: ["Heart", "Lungs", "Brain", "Kidneys"],
    correct: "Heart",
  },
  {
    question: "What is the center of an atom called?",
    options: ["Nucleus", "Electron", "Proton", "Neutron"],
    correct: "Nucleus",
  },
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ScienceQuiz() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const timeoutRef = useRef(null);

  const current = questions[currentIndex];

  const playSound = (type, volume = 0.5) => {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.volume = volume;
    audio.play();
  };

  useEffect(() => {
    setShuffledOptions(shuffle(current.options));
  }, [currentIndex]);

  const handleAnswer = (answer) => {
    if (answer === current.correct) {
      setScore((prev) => prev + 1);
      setFeedback("✅ Correct!");
      playSound("yes");
    } else {
      setFeedback("❌ Incorrect!");
      playSound("no");
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setFeedback("");
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsQuizEnded(true);
        playSound("winner");
      }
    }, 1000);
  };

  const restart = () => {
    clearTimeout(timeoutRef.current);
    setCurrentIndex(0);
    setScore(0);
    setFeedback("");
    setIsQuizEnded(false);
  };

  const EndScreen = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-xl w-full text-center animate-fade-in">
      <p className="text-3xl text-[#4caf50] font-bold mb-6">🎉 Great Job!</p>
      <p className="text-lg text-gray-700 mb-6">
        You scored <strong>{score}</strong> out of {questions.length}
      </p>
      <button
        onClick={restart}
        className="bg-[#bb4fa9] text-white px-6 py-3 rounded-full hover:bg-[#a13d93] transition font-bold"
      >
        🔁 Try Again
      </button>
    </div>
  );
const FloatingIcon = ({ Icon, style }) => (
  <Icon
    className="text-[#bb4fa9] opacity-10 text-[4rem] lg:text-[6rem] absolute animate-float"
    style={style}
  />
);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#fff3f9] to-[#dbeffe] font-sans">
      {/* <Navbar /> */}
      {/* Background Floating Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingIcon Icon={FaCalculator} style={{ top: "25%", left: "8%" }} />
        <FloatingIcon Icon={FaBook} style={{ top: "60%", right: "10%" }} />
        <FloatingIcon Icon={FaFlask} style={{ top: "40%", left: "50%" }} />
      </div>
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-6 bg-[#bb4fa9] text-white font-bold px-5 py-2 rounded-full shadow-lg hover:bg-[#a13d93] transition"
        >
          ← Back
        </button>

        {isQuizEnded ? (
          <EndScreen />
        ) : (
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center transition-all duration-500">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#bb4fa9] mb-6">
              🧪 Science Quiz
            </h1>

            <div className="text-md sm:text-lg text-gray-600 mb-4 font-medium">
              ✅ Score: {score} / {questions.length}
            </div>

            <p className="text-lg sm:text-xl text-gray-800 font-semibold mb-6">
              {current.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {shuffledOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className="bg-[#f0c96a] text-gray-800 py-3 rounded-full hover:bg-[#e9bc50] transition font-bold text-md sm:text-lg"
                >
                  {opt}
                </button>
              ))}
            </div>

            {feedback && (
              <p
                className={`text-lg font-semibold ${
                  feedback.includes("Correct")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {feedback}
              </p>
            )}

            <div className="text-sm text-gray-500 mt-4">
              🧩 Question {currentIndex + 1} of {questions.length}
            </div>
          </div>
        )}
      </div>

      {/* <Footer /> */}
    </div>
  );
}
