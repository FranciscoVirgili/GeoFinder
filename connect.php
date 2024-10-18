<?php
$host = aaaaaaaaaaaaaaaaa.website";
$user = "geofinder_admin";
$pass =  "W72!pGIpYBiH"; // Your actual password 
$db = "GeoFinder";

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    error_log("Connection failed: " . $conn->connect_error); // Log the error
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed.'])); // Send JSON error response
}

// Do not output anything else

//Putty
//User: c2tfgywwlwbu
//Pass: Developer2024!
?>
