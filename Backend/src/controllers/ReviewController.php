<?php

namespace App\Controllers;

use App\Models\Review;

class ReviewController
{
    private $reviewModel;

    public function __construct()
    {
        
        $this->reviewModel = new Review();
    }

    public function createReview()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        //$data = $_POST;
        $recipe_id = $data['recipe_id'];
        $user_id = $data['user_id'];
        $review_message = $data['review_message'];
        $rating = $data['rating'];
        
        $insertedId = $this->reviewModel->createReview($recipe_id, $user_id, $review_message, $rating);
        
        if (is_numeric($insertedId)) {
            echo json_encode(['message' => 'Review created!', 'review_id' => $insertedId]);
        } else {
            echo json_encode(['message' => 'Failed to create review.']);
        }
    }

    public function getReviewsByRecipeId($recipe_id)
    {
        $reviews = $this->reviewModel->getReviewsByRecipeId($recipe_id);
        echo json_encode($reviews);
    }

    // Additional methods for updating and deleting reviews
}

?>
