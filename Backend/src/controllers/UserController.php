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
        //$data=$_POST;
        $name = $data['name'];
        $email = $data['email'];
        $password = password_hash($data['password'], PASSWORD_BCRYPT);
        $created_at = date("Y-m-d H:i:s");
        
        $insertedId = $this->userModel->createUser($name, $email, $password, $created_at);
        
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

    public function logUserIn(){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);

            //$data=$_POST;
            if (json_last_error() !== JSON_ERROR_NONE) {
                http_response_code(400);
                echo json_encode(['message' => 'Invalid JSON format.']);
                return;
            }
            $email = trim($data['email']);
            $password = trim($data['password']);


            if (empty($email) || empty($password)) {
                http_response_code(400);
                echo json_encode(['message' => 'Email and password are required.']);
                return;
            }

            $user = $this->userModel->getUserByEmail($email);

            if ($user && password_verify($password, $user['password'])) {
                $_SESSION['loggedUserID'] = $user['id_user'];
                http_response_code(200);
                echo json_encode([
                    'message' => 'Login successful.',
                    'userID'=>$_SESSION['loggedUserID'],
                ]);
            } else {
                http_response_code(401);
                echo json_encode(['message' => 'Invalid email or password.']);
            }
        } else {
            // Handle non-POST requests
            http_response_code(405);
            echo json_encode(['message' => 'Method not allowed.']);
        }
    }

    public function getUsersEmails(){
        $user = $this->userModel->getUsersEmails();
        echo json_encode($user);
    }
}

?>
