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
$sql = "SELECT  topic.TopicName AS TOPIC ,menu1.label AS MENULABEL, menu1.link AS MENULINK, submenu1.label AS SUBMENULABEL, submenu1.link AS SUBMENULINK ,
topic.TopicID AS TOPIC_ID ,menu1.id AS MENU_ID, submenu1.id AS SUBMENU_ID
FROM topic,menu1,submenu1 where topic.TopicId=submenu1.topic_id and menu1.id=submenu1.menu_id AND submenu1.label IS NOT NULL AND submenu1.link IS NOT NULL AND menu1.link is NOT NULL and menu1.label is not NULL";
$result = $connection->query($sql);

$menuSubmenuData = [];
while ($row = $result->fetch_assoc()) {
  $menuSubmenuData[] = $row;
  // Exclude rows with null submenu values

}

// Return menu and submenu data as JSON response
echo json_encode($menuSubmenuData);

// Close the database connection
$connection->close();
?>