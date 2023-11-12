import { useState, useEffect } from 'react'
import { useTasks } from "../context/TasksContext";
import RecipeCard from '../components/RecipeCard';

function RecipesPage() {
    
    const { getRecipes, recipes } = useTasks();

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
                    <RecipeCard recipe={recipe} key={recipe.id} />
                ))
            }
        </div>
    )
}

export default RecipesPage