import express from "express";
import cors from "cors";
import * as RecipeAPI from "./recipe-api.js"


const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/recipe/search", async (req, res) => {
  res.json({ message: "success" });
});

app.listen(5001, () => {
  console.log("Server running on localhost:5001");
});

app.get("/api/recipe/search", async (req, res) => {
  const searchTerm = req.query.searchTerm
  const page = parseInt(req.query.page);

  const results = await RecipeAPI.searchRecipes(searchTerm, page);
  return res.json(results);
});