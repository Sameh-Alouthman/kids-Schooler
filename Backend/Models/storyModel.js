import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  pages: [
    {
      pageNumber: {
        type: Number,
        required: true,
      },
      text: {
        type: String,
        required: false,
      },
      imageUrl: {
        type: String,
        required: false,
      },
      audioUrl: {
        type: String,
        required: false,
      },
    },
  ],
  section: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Story", storySchema);
