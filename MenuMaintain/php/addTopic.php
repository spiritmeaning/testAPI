<?php
if (isset($_POST['topicLabel']) ) {
  $topicLabel = $_POST['topicLabel'];
  

  // Include your database connection code here
  Example:
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
  $sql = "INSERT INTO topic (TopicName) VALUES ('$topicLabel')";
  $result = $connection->query($sql);

  if ($result) {
    echo "Topic added successfully";
  } else {
    echo "Error adding menu: " . $connection->error;
  }

  // Close the database connection
  $connection->close();
}
?>
