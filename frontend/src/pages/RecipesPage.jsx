import { useState, useEffect } from 'react'
import { useRecipes } from "../context/RecipesContext";
import RecipeCard from '../components/RecipeCard';

function RecipesPage() {
    
    const { getRecipes, recipes } = useRecipes();

    useEffect(() => {
        getRecipes()
    }, [])

    if (recipes.length === 0) return (
        <div>
            <h1>Recipes</h1>
            <p>No recipes found</p>
        </div>
    )

    return (
        <div>
            {
                recipes.map((recipe) => (
                    <RecipeCard recipe={recipe} key={recipe._id} />
                ))
            }
        </div>
    )
}

export default RecipesPage