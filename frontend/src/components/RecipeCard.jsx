import { useRecipes } from "../context/RecipesContext";
import RecipeDate from "./RecipeDate";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

// Falta la logica de comprobar si es propia o ajena y cambiar los botones
// TODO DIFICULTAD DEVUELVE UNDEFINED
function RecipeCard({ recipe }) {
    const { deleteRecipe } = useRecipes();

    return (
        <div className="bg-zinc-700 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold text-white">{recipe.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <button onClick={() => {
                        deleteRecipe(recipe._id);
                    }} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" style={{marginLeft:'17px'}}>
                        Eliminar
                    </button>
                    <Link to={`/recipes/${recipe._id}`} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Editar
                    </Link>
                </div>
            </header>
            <p className="text-slate-300">{recipe.description}</p>
            <img src={`http://localhost:4000/${recipe.pictures[0]}`} alt="Fotos receta"/>
        </div>
    )

    // return (

    // )
}

export default RecipeCard;