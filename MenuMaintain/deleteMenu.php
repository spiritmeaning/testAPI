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

// Delete Menu
if (isset($_POST['deleteMenu'])) {
  $menuId = $_POST['menuId'];

  // Delete submenu items first
  $deleteSubmenuQuery = "DELETE FROM submenu WHERE menuId = '$menuId'";
  if ($connection->query($deleteSubmenuQuery) === TRUE) {
    // Delete the menu item
    $deleteMenuQuery = "DELETE FROM menu1 WHERE id = '$menuId'";
    if ($connection->query($deleteMenuQuery) === TRUE) {
      echo "Menu and its submenus have been deleted successfully.";
    } else {
      echo "Error deleting menu: " . $connection->error;
    }
  } else {
    echo "Error deleting submenus: " . $connection->error;
  }

  // Close the database connection
  $connection->close();
  exit;
}

// Delete Submenu
if (isset($_POST['deleteSubmenu'])) {
  $submenuId = $_POST['submenuId'];

  // Delete the submenu item
  $deleteSubmenuQuery = "DELETE FROM submenu WHERE id = '$submenuId'";
  if ($connection->query($deleteSubmenuQuery) === TRUE) {
    echo "Submenu has been deleted successfully.";
  } else {
    echo "Error deleting submenu: " . $connection->error;
  }

  // Close the database connection
  $connection->close();
  exit;
}
?>
