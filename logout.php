<?php
session_start(); // Start the session

// Destroy the session to log the user out
session_unset();
session_destroy();

// Return a JSON response
echo json_encode(['status' => 'success']);
?>
