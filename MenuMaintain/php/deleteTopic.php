<?php

if (isset($_GET['topicList'])) {
  echo ("Hi");
  // Include your database connection code here
  $host = '127.0.0.1';
  $username = 'rajesh';
  $password = 'SriRamSita1234$#@!';
  $database = 'spiritmeaningorg';

  // Create a connection
  $connection = new mysqli($host, $username, $password, $database);
  // $_GET['menuList'] = 'MENU1';
  // Check the connection
  if ($connection->connect_error) {
    die('Connection failed: ' . $connection->connect_error);
  }

  // Delete Menu
  if (isset($_GET['topicList'])) {
    $topicList = $_GET['topicList'];

    // Delete submenu items first

    $deleteTopicQuery = "DELETE FROM topic WHERE TopicId = $topicList";
    $deleteTopicQuerySuccess = $connection->query($deleteTopicQuery);
    if ($deleteTopicQuerySuccess) {
      echo "Row deleted successfully.";
    } else {
      echo "Error deleting row from the main table: " . $connection->error;

    }


    $connection->close();
    exit;

    // Delete Submenu

  }
}
?>