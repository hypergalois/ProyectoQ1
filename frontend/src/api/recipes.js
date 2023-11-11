import { axiosInstance } from "./axios.js";

export const getRecipesRequest = () => axiosInstance.get("/recipes");

export const getRecipeRequest = id => axiosInstance.get(`/recipes/${id}`);

export const createRecipeRequest = recipe => axiosInstance.post("/recipes", recipe);

export const updateRecipeRequest = (id, recipe) => axiosInstance.put(`/recipes/${id}`, recipe);

export const deleteRecipeRequest = id => axiosInstance.delete(`/recipes/${id}`);