import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'contentType'
  },
  contentType: {
    type: String,
    required: true,
    enum: ["Lesson", "Game", "Story", "Quizz"],
  },
  status: {
    type: String,
    enum: ["To-be-Started", "In-Progress", "Completed"],
    default: "To-be-Started",
  },
  score: {
    type: Number,
    default: 0
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
});

export default mongoose.model("Progress", progressSchema);