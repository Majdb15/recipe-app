<?php

namespace App\Models;

class Review
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
     * insert a new record when user reviews a specific recipe
     * @param int $recipe_id
     * @param int $user_id
     * @param string $review_message
     * @param float $rating
     * @return bool|int|string
     */
    public function createReview($recipe_id, $user_id, $review_message, $rating)
    {
        $stmt = $this->db->prepare("INSERT INTO reviews (recipe_id, user_id, review_message, rating) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("iisi", $recipe_id, $user_id, $review_message, $rating);
        
        if ($stmt->execute()) {
            return $this->db->insert_id;
        } else {
            return false;
        }
    }


    /**
     * get a review based on its specific ID
     * @param int $recipe_id
     * @return array
     */
    public function getReviewsByRecipeId($recipe_id)
    {
        $stmt = $this->db->prepare("SELECT * FROM reviews WHERE recipe_id = ?");
        $stmt->bind_param("i", $recipe_id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    // Additional methods for updating and deleting reviews
}

?>
