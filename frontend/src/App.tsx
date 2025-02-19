import "./App.css";
import { FormEvent, useState, useRef } from "react";
import * as api from "./Api.ts";
import { Recipe } from "./types.ts";
import { RecipeCard } from "./components/RecipeCard.tsx";
import { RecipeModal } from "./components/RecipeModal.tsx";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const pageNumber = useRef(1);

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


  return (
    <div>
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
      <RecipeCard recipe={recipe} onClick={() => setSelectedRecipe(recipe)}/>
    ))}
    <button className="view-more-button" onClick={handleViewMoreClick}>View More</button>
    {selectedRecipe ? <RecipeModal recipeId={selectedRecipe.id.toString()} onClose={() => setSelectedRecipe(undefined)} /> : null}
    </div>
  );
}

export default App