import { useRecipes } from "../context/RecipesContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function RecipeCard({ recipe }) {
    const { deleteRecipe } = useRecipes();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{recipe.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <button onClick={() => {
                        deleteRecipe(recipe._id);
                    }} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                        delete
                    </button>
                    <Link to={`/recipes/${recipe._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                        edit
                    </Link>
                </div>
            </header>
            <p className="text-slate-300">{recipe.description}</p>
            <p>{dayjs(recipe.date).utc().format()}</p>
        </div>
    )
}

export default RecipeCard;