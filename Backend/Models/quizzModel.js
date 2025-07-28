import mongoose from "mongoose";

const quizzSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    require:false
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    require:false
  },
  subject: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: false,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      // Array of possible answers
      options: {
        type: [String],
        required: true,
      },
      correctAnswerIndex: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Quizz", quizzSchema);
