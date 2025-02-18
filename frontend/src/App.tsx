import "./App.css";
import { useState } from "react";
import * as api from "./api.ts";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearchSubmit = async () => { 
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <h1>React App</h1>
    </div>
  );
}

export default App