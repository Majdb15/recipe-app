<?php

//server configuration for CORS security
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Send a 200 OK response for preflight requests
    http_response_code(200);
    exit();
}

require __DIR__ . '/../vendor/autoload.php';

use Bramus\Router\Router;

$router = new Router();

$router->get('/hello', function() {
    echo 'Hello, World!';
});

$router->run();