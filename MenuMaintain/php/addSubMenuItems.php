<?php
// Include your database connection code here
// Example:
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

// Perform the database query to fetch menu and submenu data
// Example query:
$sql = "SELECT menu1.label AS menuLabel, menu1.link AS menuLink, submenu1.label AS submenuLabel, submenu1.link AS submenuLink, submenu1.menu_id AS menuId, submenu1.id AS submenuId FROM menu1 LEFT JOIN submenu1 ON menu1.id = submenu1.menu_id";
$result = $connection->query($sql);

$menuSubmenuData = [];
while ($row = $result->fetch_assoc()) {
  $menuSubmenuData[] = $row;
}

// Return menu and submenu data as JSON response
echo json_encode($menuSubmenuData);

// Close the database connection
$connection->close();
?>
