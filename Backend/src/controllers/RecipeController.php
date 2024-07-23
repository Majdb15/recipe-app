<?php

namespace App\Controllers;

use App\Models\Recipe;
use App\Models\RecipeShare;

class RecipeController
{
    private $recipeModel;
    private $recipeShareModel;

    public function __construct()
    {
        session_start();
        $this->recipeModel = new Recipe();
        $this->recipeShareModel = new RecipeShare();
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

    public function shareRecipe()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        //$data=$_POST;
        $user_id = $data['user_id'];
        $recipe_id = $data['recipe_id'];
        $recipient_email = $data['recipient_email'];

        if (empty($user_id) || empty($recipe_id) || empty($recipient_email)) {
            echo json_encode(['message' => 'Invalid input.']);
            return;
        }

        // Insert data into the recipe_share table
        $result = $this->recipeShareModel->createShare($user_id, $recipe_id, $recipient_email);

        if ($result) {
            echo json_encode(['message' => 'Recipe shared successfully!']);
        } else {
            echo json_encode(['message' => 'Failed to share recipe.']);
        }
    }

    
}

?>
