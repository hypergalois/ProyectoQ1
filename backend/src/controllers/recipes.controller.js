import Recipe from "../models/recipe.model.js"

export const getRecipes = async (req, res) => {
    const recipes = await Recipe.find({
        user: req.user.id
    }).populate("user")
    res.json(recipes)
}

export const createRecipe = async (req, res) => {
    const { title, description, date } = req.body
    const newRecipe = new Recipe({
        title,
        description,
        date,
        user: req.user.id
    })

    try {
        const savedRecipe = await newRecipe.save()
        res.json(savedRecipe)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate("user")
        if (!recipe) {
            return res.status(404).json({ message: "No se ha encontrado la receta" })
        }
        res.json(recipe)
    } catch (error) {
        return res.status(404).json({ message: "No se ha encontrado la tarea" })
    }
}

export const updateRecipe = async (req, res) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!recipe) {
        return res.status(404).json({ message: "No se ha encontrado la receta" })
    }
    res.json(recipe)
}

export const deleteRecipe = async (req, res) => {
    const recipe = await Recipe.deleteOne(req.params.id)
    if (!recipe) {
        return res.status(404).json({ message: "No se ha encontrado la receta" })
    }
    return res.sendStatus(204)
}