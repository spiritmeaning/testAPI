<?php
if (isset($_POST['menuId']) && isset($_POST['submenuId'])) {
  $menuId = $_POST['menuId'];
  $submenuId = $_POST['submenuId'];

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
  $sql = "DELETE FROM submenu1 WHERE menu_id = $menuId AND id = $submenuId";
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
