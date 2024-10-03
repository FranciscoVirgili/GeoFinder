<?php
// Include database connection
include 'connect.php';
session_start();

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Get the raw POST data
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Check for JSON decode errors
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON received.']);
    exit();
}

// Sanitize input data
$email = $conn->real_escape_string($data['email']);
$password = $conn->real_escape_string($data['password']);

// Check if the user exists in the database
$query = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Verify password
    if (password_verify($password, $user['password'])) {
        // Success: Respond with userType to redirect accordingly
        echo json_encode([
            'status' => 'success',
            'userType' => $user['userType'], // Assuming userType is stored in the database
        ]);
    } else {
        // Password is incorrect
        echo json_encode(['status' => 'error', 'message' => 'Incorrect password.']);
    }
} else {
    // Email not found
    echo json_encode(['status' => 'error', 'message' => 'Email not found.']);
}

// Close the connection
$conn->close();
?>
