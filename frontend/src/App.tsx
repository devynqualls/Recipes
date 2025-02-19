import "./App.css";
import { FormEvent, useState, useRef, useEffect } from "react";
import * as api from "./Api.ts";
import { Recipe } from "./types.ts";
import { RecipeCard } from "./components/RecipeCard.tsx";
import { RecipeModal } from "./components/RecipeModal.tsx";

type Tabs = "search" | "favorites";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const favoriteRecipes = await api.getFavoriteRecipes();
        setFavoriteRecipes(favoriteRecipes.results);

      } catch (error) {
        console.error(error);
      }
    }
    fetchFavoriteRecipes();
  }, [])

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5001/api/recipes/search?searchTerm=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data.results);
      pageNumber.current = 1;
    } catch (error) {
      console.error(error);
    }
  }

  const handleViewMoreClick = async () => {
    const nextPageValue = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPageValue);
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPageValue;
    } catch (error) {
      console.error(error);
    }
  }

  const handleFavoriteIconClick = async (recipe: Recipe) => {
    try {
      await api.addFavoriteRecipe(recipe);
      setFavoriteRecipes([...favoriteRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavoriteRecipe = async (recipe: Recipe) => {
    try {
      await api.removeFavoriteRecipe(recipe);
      const updatedRecipes = favoriteRecipes.filter(
        (favRecipe) => favRecipe.id !== recipe.id
      );
      setFavoriteRecipes(updatedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  const isFavorite = (recipe: Recipe) => {
    return favoriteRecipes.some((favRecipe) => favRecipe.id === recipe.id);
  };

  return (
    <div>
      <div className="tabs">
        <h1 onClick={() => { setSelectedTab("search") }}>Search</h1>
        <h1 onClick={() => { setSelectedTab("favorites") }}>Favorites</h1>
      </div>
      {selectedTab === "search" && (
        <>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              required
              placeholder="Enter a search term"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} onClick={() => setSelectedRecipe(recipe)} onFavoriteClick={handleFavoriteIconClick} isFavorite={isFavorite(recipe)} />
          ))}
          <button className="view-more-button" onClick={handleViewMoreClick}>View More</button>
        </>
      )}
      {selectedTab === "favorites" &&
        <div>
          {favoriteRecipes.map((recipe) => (
            <RecipeCard recipe={recipe} onClick={() => setSelectedRecipe(recipe)} onFavoriteClick={removeFavoriteRecipe} isFavorite={true} />
          ))}
        </div>}
      {selectedRecipe ? <RecipeModal recipeId={selectedRecipe.id.toString()} onClose={() => setSelectedRecipe(undefined)} /> : null}
    </div>
  );
}

export default App