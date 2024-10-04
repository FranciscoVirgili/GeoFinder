<?php
// Include database connection
include 'connect.php';

// Enable error reporting for debugging
ini_set('display_errors', 0); // Disable displaying errors to the user
ini_set('log_errors', 1); // Enable logging of errors
ini_set('error_log', 'error_log.txt'); // Specify the error log file

// Get the raw POST data
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Check for JSON decode errors
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON received.']);
    exit();
}

// Sanitize and validate input data
$firstName = $conn->real_escape_string($data['firstName']);
$firstName = ucfirst($firstName);
$lastName = $conn->real_escape_string($data['lastName']);
$lastName = ucfirst($lastName);
$displayName = isset($data['displayName']) ? $conn->real_escape_string($firstName . " " . $lastName ) : null;
$userType = $conn->real_escape_string($data['userType']);
$userType = ucfirst($userType);
$email = $conn->real_escape_string($data['email']);
$password = password_hash($conn->real_escape_string($data['password']), PASSWORD_DEFAULT);

// Check if Created and Modified timestamps are provided
$created = isset($data['Created']) ? date('Y-m-d H:i:s', $data['Created'] / 1000) : date('Y-m-d H:i:s');
$modified = isset($data['Modified']) ? date('Y-m-d H:i:s', $data['Modified'] / 1000) : date('Y-m-d H:i:s');

// Check for existing user by email
if (isset($data['email'])) {
    // Prepare the SQL query to check for existing email
    $checkEmailQuery = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($checkEmailQuery);

    // Check if the query was successful
    if ($result) {
        // Check if any rows were returned
        if ($result->num_rows > 0) {
            // Email exists, return a message
            echo json_encode(['status' => 'error', 'message' => 'This email is already registered. Please Sign In instead.']);
            exit;
        } else {
            // Email does not exist, proceed with registration
            // Prepare the SQL query
            $sql = "INSERT INTO users (firstName, lastName, displayName, userType, email, password, created, modified) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);

            if ($stmt === false) {
                error_log("SQL preparation error: " . $conn->error);
                echo json_encode(['status' => 'error', 'message' => 'SQL error during preparation.']);
                exit();
            }

            // Bind the parameters
            $stmt->bind_param("ssssssss", $firstName, $lastName, $displayName, $userType, $email, $password, $created, $modified);

            // Execute the query
            if ($stmt->execute()) {
                echo json_encode(['status' => 'success', 'message' => 'User registered successfully. Please validate the verification email that will be sent shortly.']);
            } else {
                error_log("Execution error: " . $stmt->error);
                echo json_encode(['status' => 'error', 'message' => 'Failed to register user.']);
            }
        }
    } else {
        // Query error, handle it
        echo json_encode(['status' => 'error', 'message' => 'Database query failed.']);
        exit;
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Email not provided.']);
    exit;
}

// Close statement and connection after all operations
if (isset($stmt) && $stmt) {
    $stmt->close();
}
$conn->close();
?>
