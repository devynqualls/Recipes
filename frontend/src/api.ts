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