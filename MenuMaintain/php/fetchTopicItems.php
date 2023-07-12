<?php
// Include your database connection code here
$host = '127.0.0.1';
$username = 'rajesh';
$password = 'SriRamSita1234$#@!';
$database = 'spiritmeaningorg';

// Create a connection
$connection = new mysqli($host, $username, $password, $database);

// Check the connection
if ($connection->connect_error) {
    die('Connection failed: ' . $connection->connect_error);
}

// Handle POST request to insert new menu item
// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     if (isset($_POST['menuLabel']) && isset($_POST['menuLink'])) {
//         $menuLabel = $_POST['menuLabel'];
//         $menuLink = $_POST['menuLink'];

//         // Perform the database query to insert new menu item
//         $insertQuery = "INSERT INTO menu1 (label, link) VALUES ('$menuLabel', '$menuLink')";
//         $insertResult = $connection->query($insertQuery);

//         if ($insertResult) {
//             // Return success response
//             echo 'Menu added successfully';
//         } else {
//             // Return error response
//             echo 'Error adding menu';
//         }
//     }
// }

// Fetch Menu Items
$query = "SELECT * FROM topic";
$result = $connection->query($query);

$topicItems = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $topicItem = array(
            'TopicId' => $row['TopicId'],
            'TopicName' => $row['TopicName']
        );

        $topicItems[] = $topicItem;
    }
}

// Close the database connection
$connection->close();

// Return the menu items as JSON
echo json_encode($topicItems);
?>