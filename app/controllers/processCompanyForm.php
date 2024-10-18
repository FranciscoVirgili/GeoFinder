<?php
session_start();


if (!isset($_SESSION['user_id'])) {
    http_response_code(401); 
    echo json_encode(["status" => "error", "message" => "You must be logged in to submit the form."]);
    exit();
}

// Database connection
$host = "localhost";
$user = "root";
$pass = ""; 
$db = "GeoFinder"; 

$conn = new mysqli($host, $user, $pass, $db);

// Connection errors
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]));
}

// Get JSON input from the form
$formData = json_decode(file_get_contents("php://input"), true);

if (!$formData) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit();
}

// Prepare SQL query to insert the data
$stmt = $conn->prepare("INSERT INTO company_data 
    (company_name, abn, acn, email, phone, state_residence, city, number_employees, type_company, years_experience, hours_day, commodity_experience) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

if ($stmt === false) {
    die(json_encode(["status" => "error", "message" => "Failed to prepare SQL statement."]));
}

// Bind parameters to avoid SQL injection
$stmt->bind_param(
    "ssssssssssss",
    $formData['company-name'],
    $formData['abn'],
    $formData['acn'],
    $formData['email'],
    $formData['phone'],
    $formData['state-residence'],
    $formData['citiesDropdown'],
    $formData['number-employees'],
    $formData['type-company'],
    $formData['years-experience'],
    $formData['hours-day'],
    implode(",", $formData['commodities-experience']) // Convert array to a comma-separated string
);

// Execute the query
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Form submitted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

// Close the connection
$stmt->close();
$conn->close();
?>
