<?php
session_start();

// Check if the user is logged in
if (isset($_SESSION['user_id'])) {
    // Return a JSON response with the user details
    echo json_encode(['status' => 'logged_in', 'user_type' => $_SESSION['user_type']]);
} else {
    // Return a JSON response indicating the user is not logged in
    echo json_encode(['status' => 'not_logged_in']);
}

// Sample session check logic
$response = [];

    if (isset($_SESSION['user_id'])) {
        $response['user_id'] = $_SESSION['user_id'];
        $response['status'] = 'logged_in';
        $response['user_type'] = ['user_type']; // Assuming user_type is saved in the session
        $response['email'] = $_SESSION['email']; // You can add more session details here
        $response['first_name'] = $_SESSION['firstName'];
        $response['last_name'] = $_SESSION['lastName'];
        
    } else {
        $response['status'] = 'not_logged_in';
    }

    // Return session details as JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
?>
