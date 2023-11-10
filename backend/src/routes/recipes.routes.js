import { Router } from "express";

const router = Router();

router.get("/recipes", getRecipes)

router.get("/recipes/:id", getRecipeById)

router.post("/recipes", createRecipe)

router.put("/recipes/:id", updateRecipeById)

router.delete("/recipes/:id", deleteRecipeById)

export default router;