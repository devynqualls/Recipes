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

app.post("/api/recipes/:recipeId/favourite", async (req, res) => {
  const recipeId = req.body.recipeId;

  try {
    const favouriteRecipe = await prismaClient.favouriteRecipes.create({
      data: {
        recipeId: recipeId
      }
    });
    return res.status(201)
  } catch (error) {
    return res.status(500).json({ error: "Unable to save recipe as favourite" });
  }
})

app.listen(5001, () => {
  console.log("Server running on localhost:5001");
});