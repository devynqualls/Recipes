import express from "express";
import cors from "cors";
import * as RecipeAPI from "./recipe-api.js"
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();

const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/recipes/search", async (req, res) => {
  const searchTerm = req.query.searchTerm
  const page = req.query.page;

  const results = await RecipeAPI.searchRecipes(searchTerm, page);
  return res.json(results);
});

app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  const recipeId = req.params.recipeId;
  const recipe = await RecipeAPI.getRecipe(recipeId);
  return res.json(recipe);
});

app.get("/api/recipes/favorite", async (req, res) => {
  try {
    const favoriteRecipes = await prismaClient.favouriteRecipes.findMany();
    const recipeIds = favoriteRecipes.map((recipe) =>
      recipe.recipeId.toString()
    );
    const favorites = await RecipeAPI.getFavoriteRecipesByIds(recipeIds);
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Oops, something went wrong." });
  }
});

app.post("/api/recipes/favorite", async (req, res) => {
  const { recipeId } = req.body;
  try {
    const favoriteRecipe = await prismaClient.favouriteRecipes.create({
      data: { recipeId: recipeId },
    });
    res.status(201).json(favoriteRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Oops, something went wrong." });
  }
});

// delete favorite recipe
app.delete("/api/recipes/favorite", async (req, res) => {
  const recipeId = req.body.recipeId
  try {
    await prismaClient.favouriteRecipes.delete({
      where: { recipeId },
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Oops, something went wrong." });
  }
});

app.listen(5001, () => {
  console.log("Server running on localhost:5001");
});