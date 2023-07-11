<?php

// MySQL database configuration
$host = '127.0.0.1';
$username = 'rajesh';
$password = 'SriRamSita123#@!';
$database = 'spiritmeaningorg';

// Function to hash the password using bcrypt
function hashPassword($password) {
    return password_hash($password, '');
}

// Function to verify the password
function verifyPassword($password, $hashedPassword) {
    return password_verify($password, $hashedPassword);
}

$email = 'rajesh';
$password = 'SriRamSita123#@!';

// Create a connection
$connection = new mysqli($host, $username, $password, $database);

// Check the connection
if ($connection->connect_error) {
    die('Connection failed: ' . $connection->connect_error);
}

// Prepare the query
$query = "SELECT * FROM users1 WHERE email = ?";
$stmt = $connection->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // User found, verify the password
    $user = $result->fetch_assoc();
    $hashedPassword = $user['password'];

    if (verifyPassword($password, $hashedPassword)) {
        echo 'Password is correct';
    } else {
        echo 'Password is incorrect';
    }
} else {
    echo 'User not found';
}

$connection->close();

?>
