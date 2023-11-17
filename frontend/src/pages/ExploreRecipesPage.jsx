import { useState, useEffect } from 'react'
import { useRecipes } from "../context/RecipesContext";
import RecipeCard from '../components/RecipeCard';

//TODO hay que encontrar las de todos los usuarios

function ExploreRecipesPage() {
    
    const { getRecipes, recipes } = useRecipes();

    useEffect(() => {
        getRecipes()
    }, [])

    if (recipes.length === 0) return (
        <div>
            <h1>Recetas</h1>
            <p>No se ha podido encontrar ninguna receta.</p>
        </div>
    )

    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-2 gap-2'>
            {
                recipes.map((recipe) => (
                    <RecipeCard recipe={recipe} key={recipe._id} />
                ))
            }
        </div>
    )
}

export default ExploreRecipesPage