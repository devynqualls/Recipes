import { getRecipeSummary } from "../Api";
import { RecipeSummary } from "../types";
import React, { useState, useEffect } from "react";
import * as RecipeAPI from "../Api";

interface Props {
    recipeId: string;
    onClose: () => void;
}

export const RecipeModal = ({recipeId, onClose}: Props) => {
    const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>();

    useEffect(() => {
        const fetchRecipeSummary = async () => {
            try {
                const summaryRecipe = await RecipeAPI.getRecipeSummary(recipeId);
                setRecipeSummary(summaryRecipe);

            } catch (error) {
                console.error(error);
            }
        }
        fetchRecipeSummary();
    }, [recipeId]);

    if (!recipeSummary) {
        return (
            <div>No Summary Available</div>
        );
    } 
    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>{recipeSummary?.title}</h2>
                        <span className="close-button" onClick={onClose}>
                            &times;
                        </span>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: recipeSummary.summary }} />
                </div>
            </div>
        </div>
    );
}