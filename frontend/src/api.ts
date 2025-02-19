import { Recipe } from "./types";

export const searchRecipes = async (searchTerm: string, page: number) => {
 const baseUrl = new URL("http://localhost:5001/api/recipes/search"); 
 baseUrl.searchParams.append("searchTerm", searchTerm);
baseUrl.searchParams.append("page", page.toString());

const response = await fetch(baseUrl);
if (!response.ok) {
  throw new Error(`Failed to search for recipes: ${response.statusText}`);
}
return await response.json();
}

export const getRecipeSummary = async (recipeId: string) => {
    const baseUrl = new URL(`http://localhost:5001/api/recipes/${recipeId}/summary`);
    const response = await fetch(baseUrl);

    if (!response.ok) {
        throw new Error(`Failed to get recipe summary: ${response.statusText}`);
    }
    return await response.json();
 }

 export const getFavoriteRecipes = async () => {
    const response = await fetch("http://localhost:5001/api/recipes/favorite");
    if (!response.ok) {
        throw new Error(`Failed to get favorite recipes: ${response.statusText}`);
    }
    return await response.json();
 }

 export const addFavoriteRecipe = async (recipe: Recipe) => {
   const body = { recipeId: recipe.id };
    const response = await fetch("http://localhost:5001/api/recipes/favorite", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        throw new Error(`Failed to add favorite recipe: ${response.statusText}`);
    }
 }

    export const removeFavoriteRecipe = async (recipe: Recipe) => {
        const response = await fetch(`http://localhost:5001/api/recipes/favorite/${recipe.id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`Failed to remove favorite recipe: ${response.statusText}`);
        }
    }