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

// Fetch submenu items for a given menu ID
if (isset($_POST['menuId'])) {
  $menuId = $_POST['menuId'];

  // Fetch submenu items from the database for the given menu ID
  $sql = "SELECT * FROM submenu1 WHERE menu_id = $menuId";
  $result = mysqli_query($connection, $sql);

  if ($result) {
    $submenuItems = [];

    while ($row = mysqli_fetch_assoc($result)) {
      $submenuItems[] = [
        'id' => $row['id'],
        'label' => $row['label'],
        'link' => $row['link']
      ];
    }

    // Return submenu items as JSON response
    echo json_encode($submenuItems);
  } else {
    // Return error message
    echo "Error fetching submenu items: " . mysqli_error($connection);
  }

  // Close the database connection
  mysqli_close($connection);
  exit;
}
?>
