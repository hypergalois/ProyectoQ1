import mongoose from "mongoose"

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
})

const Task = mongoose.model("Recipe", recipeSchema)

export default Task