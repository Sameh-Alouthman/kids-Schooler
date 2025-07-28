import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: false,
  },
  subject: {
    type: String,
    enum: ["Math", "Languages", "Science"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: "English",
  },
  
});

export default mongoose.model("Lesson", lessonSchema);
