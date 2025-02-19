// const API_KEY = process.env.API_KEY;
const API_KEY = "5638f984796944ab965a6115641bd14a"

export const searchRecipes = async (searchTerm, page) => {
  if (!API_KEY) {
    throw new Error("API key not found");
  }

  const baseURL = "https://api.spoonacular.com/recipes/complexSearch";
  const url = new URL(baseURL);

  const queryParams = {
    apiKey: API_KEY,
    query: searchTerm,
    number: 10,
    page: page
  };

  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url.toString());
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipe = async (recipeId) => { 
  if (!API_KEY) {
    throw new Error("API key not found");
  }

  const baseURL = `https://api.spoonacular.com/recipes/${recipeId}/summary`;
  const url = new URL(baseURL);

  const queryParams = {
    apiKey: API_KEY,
  };

  url.search = new URLSearchParams(queryParams).toString();

  const response = await fetch(url.toString());
  const recipeJson = await response.json();

  return recipeJson;
}

export const getFavoriteRecipesByIds = async (ids) => {
  if (!API_KEY) {
    throw new Error("API Key not found");
  }
  const url = new URL("https://api.spoonacular.com/recipes/informationBulk");
  url.search = new URLSearchParams({
    apiKey: API_KEY,
    ids: ids.join(","),
  }).toString();

  const response = await fetch(url);
  const json = await response.json();
  return { results: json };
};