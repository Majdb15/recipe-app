<?php

namespace App\Models;

class User
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
     * Insert a new record for users when they signup
     * @param string $username
     * @param string $email
     * @param string $password
     * @param string $created_at
     * @return bool|string
     */
    public function createUser($username, $email, $password, $created_at)
    {
        $stmt = $this->db->prepare("INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $username, $email, $password, $created_at);
        
        if ($stmt->execute()) {
            return $this->db->insert_id;
        } else {
            return false;
        }
    }

    /**
     * get a user by his specific ID
     * @param int $id
     * @return array|bool|null
     */
    public function getUserById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE id_user = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }

    // Additional methods for user authentication and management
}

?>
