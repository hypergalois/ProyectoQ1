import { useForm } from "react-hook-form";
import { useRecipes } from "../context/RecipesContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
dayjs.extend(utc)

function RecipeFormPage() {

    const { register, handleSubmit, setValue } = useForm();
    const { getRecipe, createRecipe, updateRecipe } = useRecipes();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadRecipe() {
            console.log(params)
            if (params.id) {
                const recipe = await getRecipe(params.id)
                console.log(recipe)
                setValue("title", recipe.title)
                setValue("description", recipe.description)
            }
        }
        loadRecipe()
    }, [params])

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            updateRecipe(params.id, {
                ...data,
                date: dayjs(data.date).utc().format()
            })
        } else {
            createRecipe({
                ...data,
                date: dayjs(data.date).utc().format()
            })
        }
        navigate("/recipes")
    })

    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>

                    <label htmlFor="title">title</label>
                    <input type="text" placeholder="Title" 
                        {...register("title")} autoFocus/>

                    <label htmlFor="description">description</label>
                    <textarea rows="3" placeholder="Description"
                        {...register("description")}></textarea>

                    {/* OJO ESTO NECESITA TENER UN DEFAULT DA ERROR AL UPDATE */}
                    <label htmlFor="date">Date</label>
                    <input type="date" {...register("date")}/>

                    <button>Save</button>

                </form>
            </div>
        </div>
    )

}

export default RecipeFormPage