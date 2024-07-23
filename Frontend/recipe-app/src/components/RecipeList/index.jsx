import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../RecipeCard";
import "./style.css"
import "../../pages/HomePage/style.css"

const RecipesList = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
        const URL = 'http://localhost/React-PHP-Recipe-App/recipe-app/Backend/public/api/get_all_recipes';
        const response = await fetch(URL, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json', 
          }
          });
          const data = await response.json();

          console.log(data);
      setRecipes(data);

    } catch (error) {
      console.log(error);

      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const navToRecipeDetail = (recipe_id)=>{
    navigate(`/recipe_details/${recipe_id}`)
  }

  return (
    <div className='recipe-card-container flex row wrap '>
      {recipes.map((recipe) => {
        return (
          <RecipeCard imageURL={recipe.recipe_picture} name={recipe.name}
            onViewMoreClick={()=>{navToRecipeDetail(recipe.id_recipe)}}
          ></RecipeCard>
        );
      })}
    </div>
  );
};

export default RecipesList;
