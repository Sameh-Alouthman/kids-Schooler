import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MathPage from "./pages/quiz/GameMathPage";
import Books from "./pages/book/Books";
import FlipBook from "./pages/book/FlipBook";
import Homepage from "./pages/home";
import Quizzes from "./pages/Quizzes";
import GamePage from "./pages/gamePage";
import MemoryGame from "./components/ShuffleCards";
import EnglishQuiz from "./pages/quiz/EnglishQuiz";
import Sum from "./components/arthOperators/Sum";
import Mines from "./components/arthOperators/Mines";
import Multiply from "./components/arthOperators/MultiplicationGame";
import Divide from "./components/arthOperators/division";
import ScienceQuiz from "./pages/quiz/ScienceQuiz";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Navbar from "./components/navbar";
import CountVideo from "./pages/countVideo";
import AddPage from "./pages/add";
import AddLesson from "./pages/addLesson";
import VideoPage from "./pages/addVideo";
import CountLesson from "./pages/countLesson";
import MathSection from "./pages/mathSection";
import AdminDashboard from "./components/AdminDashboard";
import AdminUser from "./components/Admin-User";
import AdminStory from "./components/Admin-Story";
import AdminLesson from "./components/Admin-Lesson";
import AdminQuizz from "./components/Admin-Quizz";
import AdminGame from "./components/Admin-Game";
import Profile from "./pages/profile";
import Footer from "./components/footer"
import LessonsPage from "./pages/lessons";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/stories" element={<Books />} />
        <Route path="/story/:id" element={<FlipBook />} />
        <Route path="/games" element={<GamePage />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/math-quiz" element={<MathPage />} />
        <Route path="/science" element={<MemoryGame />} />
        <Route path="/english-quiz" element={<EnglishQuiz />} />
        <Route path="/addition" element={<Sum />} />
        <Route path="/subtraction" element={<Mines />} />
        <Route path="/multiplication" element={<Multiply />} />
        <Route path="/division" element={<Divide />} />
        <Route path="/science-quiz" element={<ScienceQuiz />} />
        <Route path="/VideoPage" element={<VideoPage />} />
        <Route path="/CountVideo" element={<CountVideo />} />
        {/* <Route path="/VideoPage3" element={<VideoPage3 />} /> */}
        <Route path="/math" element={<MathSection />} />
        <Route path="/Add" element={<AddPage />} />
        <Route path="/CountLesson" element={<CountLesson />} />
        <Route path="/lesson" element={<AddLesson />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AdminUser" element={<AdminUser />} />
        <Route path="/AdminStory" element={<AdminStory />} />
        <Route path="/AdminQuizz" element={<AdminQuizz />} />
        <Route path="/AdminLesson" element={<AdminLesson />} />
        <Route path="/AdminGame" element={<AdminGame />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
