<?php

if (isset($_GET['menuList'])) {
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
  if (isset($_GET['menuList'])) {
    $menuList = $_GET['menuList'];
    
    // Delete submenu items first
    
    $deleteSubmenuQuery = "DELETE FROM submenu1 WHERE menu_id IN (SELECT id FROM menu1 WHERE id = $menuList)";
  echo($deleteSubmenuQuery);
    $deleteSubMenuQuerySuccess = $connection->query($deleteSubmenuQuery);
    if ($deleteSubMenuQuerySuccess) {
      $deleteMenuQuery = "DELETE FROM menu1 WHERE id = $menuList";
      echo ($deleteMenuQuery);
      $deleteMenuQuerySuccess = $connection->query($deleteMenuQuery);
      if ($deleteMenuQuerySuccess) {
        echo "Row deleted successfully.";
      } else {
        echo "Error deleting row from the main table: " . $connection->error;
      }
    } else {
      echo "Error deleting dependent rows: " . $connection->error;
    }
    $connection->close();
    exit;
  }

  // Delete Submenu

}
?>
