import { useAuth } from '../context/AuthContext';
import { useRecipes } from "../context/RecipesContext";
import RecipeCard from '../components/RecipeCard';
import { useEffect } from 'react';

function ProfilePage() {
  const { getRecipes, recipes } = useRecipes();
  const { user } = useAuth();

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
    <div>
      <div>
        Hola, {user.username}
      </div>
      <h1 className='text-3xl font-extrabold my-2 text-center mb-6'>Tus recetas:</h1>
      <div className='grid sm:grid-cols-2 md:grid-cols-2 gap-2'>
        {
          recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe._id} />
          ))
        }
      </div>
    </div>
  )
}

export default ProfilePage