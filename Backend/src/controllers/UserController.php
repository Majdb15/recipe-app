<?php

namespace App\Controllers;

use App\Models\User;

class UserController
{
    private $userModel;

    public function __construct()
    {
        session_start();
        $this->userModel = new User();
    }

    public function createUser()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $username = $data['username'];
        $email = $data['email'];
        $password = password_hash($data['password'], PASSWORD_BCRYPT);
        $created_at = date("Y-m-d H:i:s");
        
        $insertedId = $this->userModel->createUser($username, $email, $password, $created_at);
        
        if (is_numeric($insertedId)) {
            $_SESSION['user_id'] = $insertedId;
            echo json_encode(['message' => 'User created!', 'user_id' => $insertedId]);
        } else {
            echo json_encode(['message' => 'Failed to create user.']);
        }
    }

    public function getUserById($id)
    {
        $user = $this->userModel->getUserById($id);
        echo json_encode($user);
    }

    // Additional methods for user authentication and management
}

?>
