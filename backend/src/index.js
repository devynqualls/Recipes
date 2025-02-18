import express from "express";
import cors from "cors";
import * as RecipeAPI from "./recipe-api.js"
import dotenv from "dotenv";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/recipes/search", async (req, res) => {
  const searchTerm = req.query.searchTerm
  const page = req.query.page;

  const results = await RecipeAPI.searchRecipes(searchTerm, page);
  return res.json(results);
});

app.listen(5001, () => {
  console.log("Server running on localhost:5001");
});