import "./App.css";
import { FormEvent, useState } from "react";
import * as api from "./api.ts";
import { Recipe } from "./types.ts";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("burgers");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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
      <div key={recipe.id}>
        recipe image: {recipe.image}
        recipe title: {recipe.title}
      </div>
    ))}
    </div>

  );
}

export default App