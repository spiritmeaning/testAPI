<?php
$connection = new mysqli('127.0.0.1', 'rajesh', 'SriRamSita1234$#@!', 'spiritmeaningorg');

// Check the connection
if ($connection->connect_error) {
    die('Connection failed: ' . $connection->connect_error);
}

?>