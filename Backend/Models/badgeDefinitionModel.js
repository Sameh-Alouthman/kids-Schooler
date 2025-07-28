import mongoose from "mongoose";

const badgeDefinitionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

export default mongoose.model("BadgeDefinition", badgeDefinitionSchema);