<?php
session_start();

// Prepare response array
$response = [];

// Check if the user is logged in
if (isset($_SESSION['user_id'])) {
    // Populate response with session details
    $response['status'] = 'logged_in';
    $response['user_id'] = $_SESSION['user_id'];
    $response['user_type'] = $_SESSION['user_type']; // Assuming user_type is saved in the session
    $response['user_email'] = $_SESSION['user_email']; // Add more session details if needed
    $response['user_firstname'] = $_SESSION['user_firstname'];
    $response['user_lastname'] = $_SESSION['user_lastname'];
} else {
    // If not logged in
    $response['status'] = 'not_logged_in';
}

// Ensure correct JSON output
header('Content-Type: application/json');
echo json_encode($response);
exit();
?>

