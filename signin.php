<?php
// Include database connection
include 'connect.php';

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
// Prepare a statement to prevent SQL injection
$query = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Verify password
    if (password_verify($password, $user['password'])) {

        session_start();
        // Success: Set session variables
        $_SESSION['user_id'] = $user['ID']; // Assuming UserId is a column in your users table
        $_SESSION['user_type'] = $user['userType']; // Geologist or Company
        $_SESSION['user_firstname'] = $user['firstName']; // You can store the user's name or email as well
        $_SESSION['user_lastname'] = $user['lastName']; // You can store the user's name or email as well
        $_SESSION['user_email'] = $user['email']; // You can store the user's name or email as well

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
