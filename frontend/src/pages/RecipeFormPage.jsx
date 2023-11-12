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
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <form onSubmit={onSubmit}>

                    <label htmlFor="title">title</label>
                    <input type="text" placeholder="Title" 
                        {...register("title")} autoFocus
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"/>

                    <label htmlFor="description">description</label>
                    <textarea rows="3" placeholder="Description"
                        {...register("description")}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"></textarea>

                    {/* OJO ESTO NECESITA TENER UN DEFAULT DA ERROR AL UPDATE */}
                    <label htmlFor="date">Date</label>
                    <input type="date" {...register("date")}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"/>

                    <button className="bg-indigo-500 px-3 py-2 rounded-md">Save</button>

                </form>
            </div>
        </div>
    )

}

export default RecipeFormPage