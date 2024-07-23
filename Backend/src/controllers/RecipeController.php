<?php

namespace App\Controllers;

use App\Models\Recipe;

class RecipeController
{
    private $recipeModel;
    private $mailer;

    public function __construct()
    {
        session_start();
        $this->recipeModel = new Recipe();
    }

    public function createRecipe()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $name = $data['name'];
        $ingredients = $data['ingredients'];
        $steps = $data['steps'];
        $recipe_url = $data['recipe_url'];
        $created_at = date("Y-m-d H:i:s");
        $user_id = $_SESSION['user_id'];
        
        $insertedId = $this->recipeModel->createRecipe($name, $ingredients, $steps, $recipe_url, $created_at, $user_id);
        
        if (is_numeric($insertedId)) {
            echo json_encode(['message' => 'Recipe created!', 'recipe_id' => $insertedId]);
        } else {
            echo json_encode(['message' => 'Failed to create recipe.']);
        }
    }

    public function getAllRecipes()
    {
        $recipes = $this->recipeModel->getRecipes();
        echo json_encode($recipes);
    }

    public function getRecipeById($id)
    {
        $recipe = $this->recipeModel->getRecipeById($id);
        echo json_encode($recipe);
    }

    // Additional methods for updating and deleting recipes
}

?>
