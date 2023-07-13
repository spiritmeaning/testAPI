<?php
if (isset($_POST['menuLabel']) && isset($_POST['menuLink'])) {
  $menuLabel = $_POST['menuLabel'];
  $menuLink = $_POST['menuLink'];
  $topic = $_POST['topic'];

  // Include your database connection code here
  // Example:
  $host = 'localhost';
  $username = 'rajesh';
  $password = 'SriRamSita1234$#@!';
  $database = 'spiritmeaningorg';

  // Create a connection
  $connection = new mysqli($host, $username, $password, $database);

  // Check the connection
  if ($connection->connect_error) {
    die('Connection failed: ' . $connection->connect_error);
  }

  // Perform the database query to add the menu
  // Example query:
  $sql = "SELECT topicId FROM topic WHERE topicName IN (SELECT TopicName from topic where TopicId =$topic) ";

  $result = $connection->query($sql);

  $menuSubmenuData = [];

  $menuSubmenuData[] = $row;
  $sql = "INSERT INTO menu1 (label, link,topic_id) VALUES ('$menuLabel', '$menuLink',$topic)";
  $result = $connection->query($sql);

  if ($result) {
    echo "Menu added successfully";
  } else {
    echo "Error adding menu: " . $connection->error;
  }


  // Close the database connection
  $connection->close();
}
?>