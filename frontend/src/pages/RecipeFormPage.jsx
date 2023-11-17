import { useForm, useFieldArray } from "react-hook-form";
import { useRecipes } from "../context/RecipesContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
dayjs.extend(utc)

function RecipeFormPage() {

    const { register, handleSubmit, setValue, control } = useForm();
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
        const formData = new FormData()

        if (data.pictures && data.pictures.length > 0) {
            for (let i = 0; i < data.pictures.length; i++) {
                formData.append('pictures', data.pictures[i])
            }
        }

        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('preparationTime', data.preparationTime);
        formData.append('cookingTime', data.cookingTime);
        formData.append('servings', data.servings);
        formData.append('difficulty', data.difficulty);

        formData.append('ingredients', JSON.stringify(data.ingredients));
        formData.append('steps', JSON.stringify(data.steps));


        if (params.id) {
            updateRecipe(params.id, formData)
        } else {
            createRecipe(formData)
        }
        navigate("/explore")
    })

    const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
        control,
        name: "ingredients"
    })

    const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
        control,
        name: "steps"
    })

    return (
        <div className="flex items-center justify-center">
            <div className="bg-zinc-700 max-w-xl w-full p-10 rounded-md">

                <form onSubmit={onSubmit} encType="multipart/form-data">

                    <label htmlFor="title" className="text-white text-3xl font-extrabold my-2 text-center mb-6">Nombre</label>
                    <input type="text" placeholder="Nombre de la receta"
                        {...register("title")} autoFocus
                        className="bg-zinc-500 appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-200 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2 mb-8" />

                    <label htmlFor="description" className="text-white text-3xl font-extrabold my-2 text-center mb-6">Descripción</label>
                    <textarea rows="3" placeholder="Descripción de la receta"
                        {...register("description")}
                        className="bg-zinc-500 appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-200 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2 mb-8"></textarea>

                    <div className="space-y-4 my-4 mb-6">
                        {ingredientFields.map((item, index) => (
                            <div key={item.id} className="flex items-center space-x-2">
                                <input {...register(`ingredients[${index}].name`)} placeholder="Nombre" className="bg-zinc-500 appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-200 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                                <input {...register(`ingredients[${index}].quantity`)} placeholder="Cnt." className="bg-zinc-500 appearance-none rounded-none relative block w-20 px-4 py-2 border border-gray-300 placeholder-gray-200 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                                <input {...register(`ingredients[${index}].unit`)} placeholder="Unidad" className="bg-zinc-500 appearance-none rounded-none relative block w-20 px-4 py-2 border border-gray-300 placeholder-gray-200 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                                <button type="button" onClick={() => removeIngredient(index)}className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >Quitar</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => appendIngredient({ name: '', quantity: '', unit: '' })} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Añadir Ingrediente
                        </button>
                    </div>

                    <div className="space-y-4 mt-4 mb-6">
                        {stepFields.map((item, index) => (
                            <div key={item.id} className="flex items-center space-x-2">
                                <textarea {...register(`steps[${index}].description`)} placeholder="Descripción" className="bg-zinc-500 appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-200 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                                <input {...register(`steps[${index}].duration`)} placeholder="Duración" className="bg-zinc-500 w-20 p-2 border border-gray-300 appearance-none rounded-none relative block shadow-sm placeholder-gray-200 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                                <button type="button" onClick={() => removeStep(index)}className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >Quitar</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => appendStep({ description: '', duration: '' })} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Añadir Paso
                        </button>
                    </div>

                    <label htmlFor="preparationTime" className="text-white text-2xl font-extrabold my-2 text-center mb-6">Tiempo de preparación</label>
                    <input type="number" placeholder="Tiempo de preparación en minutos"
                        {...register("preparationTime")}
                        className="bg-zinc-500 appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-200 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2 mb-8" />

                    <label htmlFor="cookingTime" className="text-white text-2xl font-extrabold my-2 text-center mb-6">Tiempo de cocinado</label>
                    <input type="number" placeholder="Tiempo de cocinado en minutos"
                        {...register("cookingTime")}
                        className="bg-zinc-500 appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-200 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2 mb-8" />

                    <label htmlFor="servings" className="text-white text-2xl font-extrabold my-2 text-center mb-6">Raciones</label>
                    <input type="number" placeholder="Número de raciones"
                        {...register("servings")}
                        className="bg-zinc-500 appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-200 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2 mb-8" />

                    {/* Hacer unas estrellas o un slider o algo merjor, o un enum con sliding */}
                    <label htmlFor="difficulty" className="text-white text-2xl font-extrabold my-2 text-center mb-6">Dificultad</label>
                    <input type="text" placeholder="Nivel de dificultad (1-10)"
                        {...register("difficulty")}
                        className="bg-zinc-500 appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-200 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2 mb-8" />

                    <label htmlFor="pictures" className="text-white text-2xl font-extrabold my-2 text-center mb-6">Fotografías</label>
                    <input type="file"
                        {...register("pictures")} multiple
                        className="bg-zinc-500 appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-200 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2 mb-8" />

                    <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>

                </form>
            </div>
        </div>
    )

}

export default RecipeFormPage