


$(document).ready(function () {
  // Load menu and submenu data on page load
  // loadMenuItems();
  // AJAX request to fetch menu items



  loadMenuSubmenuList();

  // Add Menu Form Submission




  $('.addBtnMenu').click(function (e) {
    var inputField = document.getElementById("menuLabel");
    inputField.disabled = true;
    var inputField = document.getElementById("menuLink");
    inputField.disabled = true;
    var menuLabel = $('#menuLabel').val();
    var menuLink = $('#menuLink').val();
    if (menuLabel=='' || menuLink==''){
      alert("The Menu Label or Link Fields cannot be Blank ");
      return;
    }
    $.ajax({
      type: 'POST',
      url: '/spiritmeaning/MenuMaintain/php/addMenu.php', // Update the path to the PHP file
      data: { menuLabel: menuLabel, menuLink: menuLink },
      success: function (response) {
        // Clear form fields
        $('#menuLabel').val('');
        $('#menuLink').val('');

        // Update the menuList select options
        //  updateMenuList(menuLabel, menuLink);
        loadMenuSubmenuList();
      }
    });
  });
  // Perform AJAX request to add the menu

  $('.deleteBtnMenu').click(function (e) {
    var menuList = $('#menuList').val();

    $.ajax({
      type: 'GET',
      url: '/spiritmeaning/MenuMaintain/php/deleteMenu.php', // Replace 'main.php' with the actual path to your main PHP page
      data: {
        menuList: menuList, // Provide the values for the GET parameters
       
      },
      success: function (response) {
        // Parse the JSON response
        alert(response);
        loadMenuSubmenuList();

        // Check if the GET parameters were received successfully

      },
      error: function (xhr, status, error) {
        console.log('AJAX error: ' + error);
      }
    });
  });

  // $('.deleteBtnMenu').click(function (e) {
  //   console.log("HI");
  //   rowDiv.disabled = true;

  //   // Remove the div element from its parent

  //   // Perform AJAX request to delete the menu
  //   $.ajax({
  //     type: 'GET',
  //     url: '/spiritmeaning/MenuMaintain/php/deleteMenu.php',
  //     success: function (response) {
  //       // Refresh menu and submenu list
  //       loadMenuSubmenuList();
  //     }
  //   });
  // });
  // Add Submenu Form Submission
  $('#addSubmenuForm').submit(function (e) {
    e.preventDefault();

    var submenuLabel = $('#submenuLabel').val();
    var submenuLink = $('#submenuLink').val();
    var menuId = $('#menuList').val();

    // Perform AJAX request to add the submenu
    $.ajax({
      type: 'POST',
      url: '/spiritmeaning/MenuMaintain/php/addSubmenu.php', // Update the path to the PHP file
      data: { submenuLabel: submenuLabel, submenuLink: submenuLink, menuId: menuId },
      success: function (response) {
        // Clear form fields
        $('#submenuLabel').val('');
        $('#submenuLink').val('');

        // Refresh menu and submenu list
        loadMenuSubmenuList();
      }
    });
  });

  function updateMenuList(menuLabel, menuLink) {
    // Create a new option element
    var option = $('<option>').val(menuLink).text(menuLabel);

    // Append the new option to the menuList select element
    $('#menuList').append(option);
  }


  // Function to load menu and submenu data
  function loadMenuSubmenuList() {
    // Perform AJAX request to fetch menu and submenu data
    $.ajax({
      type: 'GET',
      url: '/spiritmeaning/MenuMaintain/php/fetchMenuSubmenu.php', // Update the path to the PHP file
      success: function (response) {
        // Parse the JSON response
        var menuSubmenuData = JSON.parse(response);

        // Clear the menu and submenu list
        $('#menuSubmenuList').empty();

        // Loop through the menu and submenu data and add rows to the table
        menuSubmenuData.forEach(function (item) {
          var row = '<tr>' +
            '<td>' + item.menuLabel + '</td>' +
            '<td>' + item.menuLink + '</td>' +
            '<td>' + item.submenuLabel + '</td>' +
            '<td>' + item.submenuLink + '</td>' +
            '<td>' +
            '<button class="btn btn-danger deleteBtn" data-menuid="' + item.menuId + '" data-submenuid="' + item.submenuId + '">Delete</button>' +
            '</td>' +
            '</tr>';
          $('#menuSubmenuList').append(row);
        });

        // Attach event handler for delete buttons
        $('.deleteBtn').click(function () {
          var menuId = $(this).data('menuid');
          var submenuId = $(this).data('submenuid');

          // Perform AJAX request to delete the submenu
          $.ajax({
            type: 'POST',
            url: '/spiritmeaning/MenuMaintain/php/deleteSubmenu.php', // Update the path to the PHP file
            data: { menuId: menuId, submenuId: submenuId },
            success: function () {
              // Refresh menu and submenu list
              loadMenuSubmenuList();
            }
          });
        });

        $(document).on('click', '.deleteMenuBtn', function () {
          e.preventDefault();

          var menuSelect = $(this).data('menuSelect');

          // Perform AJAX request to delete the menu
          $.ajax({
            type: 'GET',
            url: '/spiritmeaning/MenuMaintain/php/deleteMenu.php',
            data: { menuSelect: menuSelect },
            success: function (response) {
              // Remove the deleted menu from the menuList select options

              removeMenuFromList(menuSelect);
            }
          });


          function removeMenuFromList(menuLink) {
            $('#menuList option[value="' + menuSelect + '"]').remove();
          }


        });
      }
    });


  }

  // Perform AJAX request to fetch menu items
  // $.ajax({
  //   type: 'GET',
  //   url: '/spiritmeaning/MenuMaintain/php/fetchMenuItems.php', // Update the path to the PHP file
  //   success: function (response) {
  //     // Parse the JSON response
  //     var menuItems = JSON.parse(response);

  //     // Clear the menu select options
  //     // $('#menuList').empty();

  //     // Loop through the menu items and add them to the select options
  //     menuItems.forEach(function (menuItem) {
  //       var option = $('<option>').val(menuItem.id).text(menuItem.label);
  //       $('#menuList').append(option);
  //     });
  //   }
  // });

});
