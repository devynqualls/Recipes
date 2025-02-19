import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Recipe } from "../types";

interface Props {
    recipe: Recipe;
    onClick: () => void;
    isFavorite: boolean;
    onFavoriteClick: (recipe: Recipe) => void;
}

export const RecipeCard = ({recipe, onClick, isFavorite, onFavoriteClick}: Props) => {
    return (
        <div className="recipe-card" onClick={onClick}>
        <img src={recipe.image} alt={recipe.title} />
        <div className="recipe-card-title">
            <span onClick={(event) => {
                event.stopPropagation();
                onFavoriteClick(recipe);
            }}>
                {isFavorite ? <AiFillHeart size={25} color="red" /> : <AiOutlineHeart size={25} />}
            </span>
            <h3>{recipe.title}</h3>
        </div>
        </div>
    );
}