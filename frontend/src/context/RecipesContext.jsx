import { createContext, useContext, useState, useEffect } from "react";
import { getRecipesRequest, getRecipeRequest, createRecipeRequest, updateRecipeRequest, deleteRecipeRequest } from "../api/recipes";

const RecipesContext = createContext();

export const useRecipes = () => {
    const context = useContext(RecipesContext);
    if (!context) {
        throw new Error("useRecipes must be used within a RecipesProvider");
    }
    return context;
}

export const RecipesProvider = ({ children }) => {

    const [recipes, setRecipes] = useState([]);

    const createRecipe = async (recipe) => {
        try {
            const res = await createRecipeRequest(recipe);
            // ojo la concatenacion de los arrays
            setRecipes([...recipes, res.data])
        } catch (err) {
            console.log(err)
        }
    }

    const getRecipes = async () => {
        try {
            const res = await getRecipesRequest();
            setRecipes(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteRecipe = async (id) => {
        try {
            const res = await deleteRecipeRequest(id);
            if (res.status === 204) {
                setRecipes(recipes.filter(recipe => recipe._id !== id))
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getRecipe = async (id) => {
        try {
            const res = await getRecipeRequest(id);
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    const updateRecipe = async (id, recipe) => {
        try {
            const res = await updateRecipeRequest(id, recipe);
            if (res.status === 200) {
                // cuando se actualice ya fetcheamos las nuevas recetas
                // setRecipes(recipes.map(recipe => recipe.id === id ? res.data : recipe))
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <RecipesContext.Provider value={{
            recipes,
            createRecipe,
            getRecipes,
            deleteRecipe,
            getRecipe,
            updateRecipe
        }}>
            {children}
        </RecipesContext.Provider>
    )

}