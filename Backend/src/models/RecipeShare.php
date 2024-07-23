<?php

namespace App\Models;

class RecipeShare
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
     * Create a new record in the recipe_share table
     * @param int $user_id
     * @param int $recipe_id
     * @param string $recipient_email
     * @return boolean
     */
    public function createShare($user_id, $recipe_id, $recipient_email)
    {
        $stmt = $this->db->prepare("INSERT INTO recipe_shares (user_id, recipe_id, shared_with) VALUES (?, ?, ?)");
        $stmt->bind_param("iis", $user_id, $recipe_id, $recipient_email);

        $result = $stmt->execute();
        $stmt->close();
        
        return $result;
    }

    /**
     * Get all shares for a specific recipe
     * @param int $recipe_id
     * @return array|null
     */
    public function getSharesByRecipeId($recipe_id)
    {
        $stmt = $this->db->prepare("SELECT * FROM recipe_share WHERE recipe_id = ?");
        $stmt->bind_param("i", $recipe_id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * Get all recipes shared with a specific user
     * @param int $user_id
     * @return array|null
     */
    public function getSharesByUserId($user_id)
    {
        $stmt = $this->db->prepare("SELECT * FROM recipe_share WHERE user_id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function __destruct()
    {
        // Close the database connection when the object is destroyed
        $this->db->close();
    }
}

?>
