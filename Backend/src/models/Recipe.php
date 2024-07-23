<?php

namespace App\Models;

class Recipe
{
    private $db;

    public function __construct()
    {
        $this->db = $this->connect();
    }

    private function connect()
    {
        $config = require __DIR__ . '/../../config/config.php';
        return new \mysqli($config['host'], $config['user'], $config['password'], $config['database']);
    }


    /**
         * allowing user to create a recipe
         * @param string $name
         * @param string $ingredients
         * @param string $steps
         * @param string $recipe_picture
         * @param string $created_at
         * @param int $user_id
         * @return boolean
         */
    public function createRecipe($name, $ingredients, $steps, $recipe_picture , $created_at, $user_id)
    {
        $stmt = $this->db->prepare("INSERT INTO recipes (name, ingrediants, steps, recipe_picture, created_at, user_id) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssi", $name, $ingredients, $steps,$recipe_picture, $created_at, $user_id);
        
        if ($stmt->execute()) {
            return $this->db->insert_id;
        } else {
            return false;
        }
    }

    /**
         * return all recipes to show to users
         * @return array|null
         */
    public function getRecipes()
    {
        $stmt = $this->db->prepare("SELECT * FROM recipes");
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * get a specific Receipe based on its ID
     * @param int $id
     * @return array|bool|null
     */
    public function getRecipeById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM recipes WHERE id_recipe = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }

}

?>
