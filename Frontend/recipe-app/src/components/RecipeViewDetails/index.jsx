import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../base/Button";
import './style.css'

const RecipeViewDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = async (recipeId) => {
    try {
      const URL = `http://localhost/React-PHP-Recipe-App/recipe-app/Backend/public/api/get_recipe/${recipeId}`;
      const response = await fetch(URL);
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  useEffect(() => {
    fetchRecipe(id);
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }
  const splitSteps = (steps) => {
    // Match all steps starting with a number followed by a dot and space
    return steps.split(/(?=\d+\.\s)/).filter(step => step.trim());
  };

  return (
    <div className=" container flex column wrap full-width ">
      <div className="flex column center">
        <h2>{recipe.name}</h2>
      <img  src={recipe.recipe_picture} alt={recipe.name} width={'500px'} height={"250px"} />
    <p>{recipe.ingrediants}</p>
        <ul>
            {splitSteps(recipe.steps).map((step, index) => (
            <li key={index}>{step}</li>
            ))}
        </ul>

      </div>
      
      <div className="buttons-div ">
            <Button text={"Share Recipe"}></Button>
            <Button text={"Download Recipe"}></Button>
      </div>
      <div className="time flex wrap">
            <p>created: {recipe.created_at}</p>
            <p>updated: {recipe.last_updated}</p>
      </div>
    </div>
  );
};

export default RecipeViewDetails;
