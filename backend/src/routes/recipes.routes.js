import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getRecipes, createRecipe, getRecipe, updateRecipe, deleteRecipe } from "../controllers/recipes.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createRecipeSchema, updateRecipeSchema } from "../schemas/recipe.schema.js";
import upload from "../multer.js";

const router = Router();

router.get("/recipes", authRequired, getRecipes)

router.get("/recipes/:id", authRequired, getRecipe)

// router.post("/recipes", authRequired, upload.array("pictures"), validateSchema(createRecipeSchema), createRecipe)

router.post("/recipes", authRequired, upload.array("pictures"), createRecipe)

router.put("/recipes/:id", authRequired, validateSchema(updateRecipeSchema), updateRecipe)

router.delete("/recipes/:id", authRequired, deleteRecipe)

export default router;