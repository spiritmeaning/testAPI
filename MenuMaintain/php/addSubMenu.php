<?php
if (isset($_POST['submenuLabel']) && isset($_POST['submenuLink']) && isset($_POST['menuId'])) {
  $submenuLabel = $_POST['submenuLabel'];
  $submenuLink = $_POST['submenuLink'];
  $menuId = $_POST['menuId'];

//   Include your database connection code here
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

//   Perform the database query to add the submenu
//   Example query:
  $sql = "INSERT INTO submenu1 (label, link, menu_id) VALUES ('$submenuLabel', '$submenuLink', $menuId)";
  $result = $connection->query($sql);

  if ($result) {
    echo "Submenu added successfully";
  } else {
    echo "Error adding submenu: " . $connection->error;
  }

//   Close the database connection
  $connection->close();
}
?>
