<?php
//session_start();

// Check if the user is logged in
if (isset($_SESSION['user_id'])) {
    // Return a JSON response with the user details
    echo json_encode(['status' => 'logged_in', 'user_type' => $_SESSION['user_type']]);
} else {
    // Return a JSON response indicating the user is not logged in
    echo json_encode(['status' => 'not_logged_in']);
}
?>
