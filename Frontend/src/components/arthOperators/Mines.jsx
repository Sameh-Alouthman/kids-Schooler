import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";
import Footer from "../footer";
import { FaBook, FaCalculator, FaFlask } from "react-icons/fa";

const Mines = () => {
  const [question, setQuestion] = useState({ a: 0, b: 0 });
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const playSound = (type, volume = 0.5) => {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.volume = volume;
    audio.play();
  };

  const generateQuestion = () => {
    let a = Math.floor(Math.random() * 20) + 1;
    let b = Math.floor(Math.random() * 20) + 1;
    if (b > a) [a, b] = [b, a]; // Ensure result is not negative
    const correct = a - b;

    const options = [
      correct,
      correct + Math.floor(Math.random() * 5) + 1,
      Math.max(correct - (Math.floor(Math.random() * 4) + 1), 0),
      correct + Math.floor(Math.random() * 3) + 2,
    ]
      .filter((opt, i, arr) => arr.indexOf(opt) === i)
      .sort(() => Math.random() - 0.5);

    setQuestion({ a, b });
    setOptions(options);
    setFeedback("");
  };

  const handleAnswer = (answer) => {
    const correct = question.a - question.b;
    if (answer === correct) {
      setScore((prev) => prev + 1);
      setFeedback("✅ Correct!");
      playSound("yes");
    } else {
      setFeedback("❌ Incorrect!");
      playSound("no");
    }
    setTimeout(() => generateQuestion(), 800);
  };

  useEffect(() => {
    generateQuestion();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameOver(true);
          playSound("winner");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const resetGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    generateQuestion();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameOver(true);
          playSound("winner");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const FloatingIcon = ({ Icon, style }) => (
    <Icon
      className="text-[#bb4fa9] opacity-10 text-[4rem] lg:text-[6rem] absolute animate-float"
      style={style}
    />
  );
  return (
    <div>
      {/* Background Floating Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingIcon Icon={FaCalculator} style={{ top: "25%", left: "8%" }} />
        <FloatingIcon Icon={FaBook} style={{ top: "60%", right: "10%" }} />
        <FloatingIcon Icon={FaFlask} style={{ top: "40%", left: "50%" }} />
      </div>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#fff3f9] to-[#dbeffe] font-sans">
        {/* ⬅️ زر الرجوع */}
        <div className="flex-grow flex flex-col items-center justify-center px-4 py-12 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-24 left-6 bg-[#bb4fa9] text-white font-bold px-5 py-2 rounded-full shadow-lg hover:bg-[#a13d93] transition"
          >
            ← Back
          </button>

          {gameOver ? (
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-xl w-full text-center animate-fade-in">
              <p className="text-3xl text-[#4caf50] font-bold mb-6">
                🎉 Great Job!
              </p>
              <p className="text-lg text-gray-700 mb-6">
                You scored <strong>{score}</strong> points!
              </p>
              <button
                onClick={resetGame}
                className="bg-[#bb4fa9] text-white px-6 py-3 rounded-full hover:bg-[#a13d93] transition font-bold"
              >
                🔁 Try Again
              </button>
            </div>
          ) : (
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center transition-all duration-500">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#bb4fa9] mb-6">
                ➖ Subtraction Challenge
              </h1>

              <div className="text-md sm:text-lg text-gray-600 mb-4 font-medium">
                ✅ Score: {score}
              </div>

              <p className="text-lg sm:text-xl text-gray-800 font-semibold mb-6">
                What is{" "}
                <span className="text-[#bb4fa9] font-bold">
                  {question.a} - {question.b}
                </span>
                ?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {options.map((opt, idx) => (
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
                ⏱️ Time Left: <span className="font-semibold">{timeLeft}</span>{" "}
                seconds
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default Mines;
