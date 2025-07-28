import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    badgeDefinition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BadgeDefinition",
        required: true
    },
    earnedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.model("Badge", badgeSchema);