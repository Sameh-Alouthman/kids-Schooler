import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["student", "admin"],
        default: "student",
    },
    language: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    badges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Badge"
    }]
}, {timestamps: true});

export default mongoose.model("User", userSchema);