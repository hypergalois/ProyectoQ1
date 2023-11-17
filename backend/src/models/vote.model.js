const mongoose = require("mongoose")

const voteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true
    },
    value: {
        type: Number,
        enum: [1, -1],
        required: true
    }
},
{
    timestamps: true
})

const Vote = mongoose.model("Vote", voteSchema)

export default Vote