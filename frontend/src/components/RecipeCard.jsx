import { useRecipes } from "../context/RecipesContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function RecipeCard({ recipe }) {
    const { deleteRecipe } = useRecipes();

    return (
        <div>
            <header>
                <h1>{recipe.title}</h1>
                <div>
                    <button onClick={() => {
                        deleteRecipe(recipe._id);
                    }}>
                        delete
                    </button>
                    <Link to={`/recipes/${recipe._id}`}>
                        edit
                    </Link>
                </div>
            </header>
            <p>{recipe.description}</p>
            <p>{dayjs(recipe.date).utc().format()}</p>
        </div>
    )
}

export default RecipeCard;