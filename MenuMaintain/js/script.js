


$(document).ready(function () {
  // Load menu and submenu data on page load
  // loadMenuItems();
  // AJAX request to fetch menu items



  // ADD TOPIC  STEP 1

  $('.addBtnTopic').click(function (e) {

    var topicLabel = $('#topicLabel').val();

    if (topicLabel == '') {
      alert("The Topic Label cannot be Blank ");
      return;
    }
    $.ajax({
      type: 'POST',
      url: '/spiritmeaning/MenuMaintain/php/addTopic.php', // Update the path to the PHP file
      data: { topicLabel: topicLabel },
      success: function (response) {
        // Clear form fields


        // Update the menuList select options
        //  updateMenuList(menuLabel, menuLink);

        loadMenuSubmenuList();
      }
    });
  });

  // DELETE TOPIC  STEP 2
  $('.deleteBtnTopic').click(function () {

    var topicList = $('#topicList').val();;

    // Perform AJAX request to delete the submenu
    $.ajax({
      type: 'GET',
      url: '/spiritmeaning/MenuMaintain/php/deleteTopic.php', // Update the path to the PHP file
      data: { topicList: topicList },
      success: function () {
        loadMenuSubmenuList();
      }
    });
  });


  //LOAD TOPIC STEP 3
  function loadTopic() {
    $.ajax({
      type: 'GET',
      url: '/spiritmeaning/MenuMaintain/php/fetchTopicItems.php', // Update the path to the PHP file
      success: function (response) {
        // Parse the JSON response
        var topicItems = JSON.parse(response);

        // Clear the menu and submenu list
        //  $('#menuList').empty();

        // Loop through the menu and submenu data and add rows to the table
        topicItems.forEach(function (item) {

          var topicName = item.TopicName;
          var topicId = item.TopicId;

          var option = $('<option>').val(topicId).text(topicName);

          // Append the new option to the menuList select element
          $('#topicList').append(option);

        });


      }
    });
  }

  // ADD MENU STEP 1

  $('.addBtnMenu').click(function (e) {

    var menuLabel = $('#menuLabel').val();
    var menuLink = $('#menuLink').val();
    var topic = $('#topicList').val();

    if (menuLabel == '' || menuLink == '') {
      alert("The Menu Label or Link Fields cannot be Blank ");
      return;
    }
    $.ajax({
      type: 'POST',
      url: '/spiritmeaning/MenuMaintain/php/addMenu.php', // Update the path to the PHP file
      data: { menuLabel: menuLabel, menuLink: menuLink, topic: topic },
      success: function (response) {

        // Clear form fields


        // Update the menuList select options
        //  updateMenuList(menuLabel, menuLink);

        loadMenuSubmenuList();
      }
    });
  });

  // DELETE MENU STEP 2

  // Attach event handler for delete buttons
  $('.deleteBtnMenu').click(function () {
    var menuList = $('#menuList').val();;

    // Perform AJAX request to delete the submenu
    $.ajax({
      type: 'GET',
      url: '/spiritmeaning/MenuMaintain/php/deleteMenu.php', // Update the path to the PHP file
      data: { menuList: menuList },
      success: function (result) {
        alert(result);
        loadMenuSubmenuList();
      }
    });
  });

  // LOADMENU STEP 3

  function loadMenu() {

    $.ajax({
      type: 'GET',
      url: '/spiritmeaning/MenuMaintain/php/fetchMenuItems.php', // Update the path to the PHP file
      success: function (response) {
        // Parse the JSON response
        var menuItems = JSON.parse(response);
        // Loop through the menu and submenu data and add rows to the table
        menuItems.forEach(function (item) {
          var menulabel = item.label
          var menuid = item.id


          var option = $('<option>').val(menuid).text(menulabel);
          // Append the new option to the menuList select element
          $('#menuList').append(option);
        });
      }
    });


  }

  //ADD SUBMENU STEP 1
  $('.addBtnSubmenu').click(function (e) {

    var submenuLabel = $('#submenuLabel').val();
    var submenuLink = $('#submenuLink').val();
    var menuId = $('#menuList').val();
    var topicList = $('#topicList').val();
    if (submenuLabel == '' || submenuLink == '' || menuId == '') {
      alert("The Submenu Label or Submenu Link cannot be Blank ");
      return;
    }


    // DELETE SUBMENU  STEP 2
    // $('.deleteBtnTopic').click(function () {

    //   var topicList = $('#topicList').val();;

    //   // Perform AJAX request to delete the submenu
    //   $.ajax({
    //     type: 'GET',
    //     url: '/spiritmeaning/MenuMaintain/php/deleteTopic.php', // Update the path to the PHP file
    //     data: { topicList: topicList },
    //     success: function () {
    //       loadMenuSubmenuList();
    //     }
    //   });
    // });

    $.ajax({
      type: 'POST',
      url: '/spiritmeaning/MenuMaintain/php/addSubMenu.php', // Update the path to the PHP file
      data: {
        submenuLabel: submenuLabel,
        submenuLink: submenuLink,
        menuId: menuId,
        topicList: topicList
      },
      success: function (result) {

        alert(result);
        loadMenuSubmenuList();
      }
    });
  });


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
            '<td>' + item.TOPIC + '</td>' +
            '<td>' + item.MENULABEL + '</td>' +
            '<td>' + item.MENULINK + '</td>' +
            '<td>' + item.SUBMENULABEL + '</td>' +
            '<td>' + item.SUBMENULINK + '</td>' +
            '<td>' +
            '<button class="btn btn-danger deleteBtn"  data-topicid="' + item.TOPIC_ID + '" data-menuid="' + item.MENU_ID + '" data-submenuid="' + item.SUBMENU_ID + '">Delete</button>' +
            '</td>' +
            '</tr>';
          $('#menuSubmenuList').append(row);
        });

        // Attach event handler for delete buttons
        $('.deleteBtn').click(function (data) {

          var topicid = $(this).data('topicid');
          var menuid = $(this).data('menuid');
          var submenuid = $(this).data('submenuid');

          // Perform AJAX request to delete the submenu
          $.ajax({
            type: 'POST',
            url: '/spiritmeaning/MenuMaintain/php/deleteSubmenu.php', // Update the path to the PHP file
            data: { topicid: topicid, menuid: menuid, submenuid: submenuid },
            success: function (result) {
              alert(result);
              // Refresh menu and submenu list
              loadTopic();
              loadMenu();
              loadMenuSubmenuList();
            }
          });
        });
      }
    });





  }
  loadTopic();
  loadMenu();
  loadMenuSubmenuList();


});
