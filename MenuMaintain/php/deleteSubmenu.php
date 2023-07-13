<?php
if (isset($_POST['topicid']) && isset($_POST['menuid']) && isset($_POST['submenuid'])) {
  $topicID = $_POST['topicid'];
  $menuID = $_POST['menuid'];
  $submenuID = $_POST['submenuid'];

  // Include your database connection code here
  // Example:
  $host = '127.0.0.1';
  $username = 'rajesh';
  $password = 'SriRamSita1234$#@!';
  $database = 'spiritmeaningorg';
  
//   Create a connection
  $connection = new mysqli($host, $username, $password, $database);

//   Check the connection
  if ($connection->connect_error) {
      die('Connection failed: ' . $connection->connect_error);
  }
  
//   Perform the database query to delete the submenu
//   Example query:
  $sql = "DELETE FROM submenu1 WHERE topic_id =$topicID AND menu_id = $menuID AND id = $submenuID";
  $result = $connection->query($sql);

  if ($result) {
    echo "Submenu deleted successfully";
  } else {
    echo "Error deleting submenu: " . $connection->error;
  }

//   Close the database connection
  $connection->close();
}
?>
