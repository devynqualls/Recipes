import { Recipe } from "../types";

interface Props {
    recipe: Recipe;
    onClick: () => void;
}

export const RecipeCard = ({recipe, onClick}: Props) => {
    return (
        <div className="recipe-card" onClick={onClick}>
        <img src={recipe.image} alt={recipe.title} />
        <div className="recipe-card-title">
            <h3>{recipe.title}</h3>
        </div>
        </div>
    );
}