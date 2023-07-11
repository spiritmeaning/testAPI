<?php
// Database connection configuration
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

// Fetch menu data from the database
$query = "SELECT * FROM menu1";
$result = $connection->query($query);

$menuData = [];
while ($row = $result->fetch_assoc()) {
    $menuItem = [
        'id' => $row['id'],
        'label' => $row['label'],
        'link' => $row['link']
        // Add more properties if needed
    ];

    // Fetch submenus for the current menu item
    $submenuQuery = "SELECT * FROM submenu1 WHERE menu_id = " . $row['id'];
    $submenuResult = $connection->query($submenuQuery);

    $submenus = [];
    while ($submenuRow = $submenuResult->fetch_assoc()) {
        $submenu = [
            'id' => $submenuRow['id'],
            'label' => $submenuRow['label'],
            'link' => $submenuRow['link']
            // Add more properties if needed
        ];

        $submenus[] = $submenu;
    }

    $menuItem['submenus'] = $submenus;
    $menuData[] = $menuItem;
}

// Close the database connection
$connection->close();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Sidebar Menu</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="/spiritmeaning/sideBar/css/css/style.css">
    <!-- Custom CSS -->
    
</head>

<body>
    <div class="wrapper d-flex align-items-stretch">
        <nav id="sidebar">
            <div class="p-4 pt-5">
                <a href="#" class="img logo rounded-circle mb-5" style="background-image: url(/spiritmeaning/sideBar/css/css/images/logo.jpg);"></a>
                <ul id="sidebarMenu" class="list-unstyled components mb-5">
                    <?php foreach ($menuData as $menuItem): ?>
                        <li class="<?php echo ($menuItem['id'] === 1) ? 'active' : ''; ?>">
                            <?php if (!empty($menuItem['submenus'])): ?>
                                <a href="#menu-<?php echo $menuItem['id']; ?>" data-toggle="collapse" aria-expanded="false"
                                    class="dropdown-toggle"><?php echo $menuItem['label']; ?></a>
                                <ul class="collapse list-unstyled" id="menu-<?php echo $menuItem['id']; ?>">
                                    <?php foreach ($menuItem['submenus'] as $submenu): ?>
                                        <li>
                                            <a href="<?php echo $submenu['link']; ?>"><?php echo $submenu['label']; ?></a>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php else: ?>
                                <a href="<?php echo $menuItem['link']; ?>"><?php echo $menuItem['label']; ?></a>
                            <?php endif; ?>
                        </li>
                    <?php endforeach; ?>
                </ul>

                <div class="footer">
                    <p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                        &copy;
                        <script>document.write(new Date().getFullYear());</script> All rights reserved | This
                        template is made with <i class="icon-heart" aria-hidden="true"></i> by <a
                            href="https://colorlib.com" target="_blank">Colorlib.com</a>
                        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                    </p>
                </div>
            </div>
        </nav>

        <div id="content" class="p-4 p-md-5">
  

            <h2 class="mb-4">Sidebar #01</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.</p>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('sidebarCollapse').addEventListener('click', function () {
            document.getElementById('sidebar').classList.toggle('active');
        });
    </script>

    <!-- Bootstrap JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script src="/spiritmeaning/sideBar/js/jquery.min.js"></script>
    <script src="/spiritmeaning/sideBar/js/popper.js"></script>
    <script src="/spiritmeaning/sideBar/js/bootstrap.min.js"></script>
    <script src="/spiritmeaning/sideBar/js/main.js"></script>
</body>

</html>