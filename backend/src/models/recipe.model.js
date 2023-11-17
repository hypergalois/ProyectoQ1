import mongoose from "mongoose"

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: String
    },
    unit: {
        type: String
    }
})

const stepSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number
    }
})

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ingredients: [ingredientSchema],
    steps: [stepSchema],
    preparationTime: {
        type: Number
    },
    cookingTime: {
        type: Number
    },
    servings: {
        type: Number
    },
    difficulty: {
        type: String
    },
    pictures: [{ type: String }],
},
{
    timestamps: true
})

const Recipe = mongoose.model("Recipe", recipeSchema)

export default Recipe