var database = firebase.database();

// Initialize Firebase with your configuration
function initFire() {
    var firebaseAppScript = document.createElement('script');
    firebaseAppScript.src = "https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js";
    document.head.appendChild(firebaseAppScript);
  
    var firebaseAuthScript = document.createElement('script');
    firebaseAuthScript.src = "https://www.gstatic.com/firebasejs/8.9.1/firebase-auth.js";
    document.head.appendChild(firebaseAuthScript);
  
    var firebaseDatabaseScript = document.createElement('script');
    firebaseDatabaseScript.src = "https://www.gstatic.com/firebasejs/8.9.1/firebase-database.js";
    document.head.appendChild(firebaseDatabaseScript);
  
    // Wait for Firebase Realtime Database library to load
    firebaseAppScript.onload = function () {
      firebase.initializeApp(firebaseConfig);
  
  
  
    };
    firebaseAuthScript.onload = function () {
  
      auth = firebase.auth();
  
  
    };
    firebaseDatabaseScript.onload = function () {
  
      database = firebase.database();
  
      const quizzesRef = database.ref('quizzes');
      console.log("HI");
  
    };
  }
function saveMenuData(menuData, menuId = null) {
    const menuRef = database.ref('navbar/menus');
    if (menuId) {
        // Update existing menu
        menuRef.child(menuId).update(menuData, (error) => {
            if (error) {
                console.error('Error updating menu data:', error);
            } else {
                console.log('Menu data updated successfully!');
                // Clear the form after successful update
                document.getElementById('menuForm').reset();
            }
        });
    } else {
        // Create new menu
        menuRef.push(menuData, (error) => {
            if (error) {
                console.error('Error saving menu data:', error);
            } else {
                console.log('Menu data saved successfully!');
                // Clear the form after successful submission
                document.getElementById('menuForm').reset();
            }
        });
    }
}

// Function to retrieve menu structure from Firebase RTDB
function retrieveMenuStructure() {
    if (firebase.auth().signInWithEmailAndPassword('spiritmeaning@gmail.com', 'SriRamSita1234$#@!')) {
        const menuStructureRef = database.ref('navbar/menus');
        menuStructureRef.on('value', (snapshot) => {
            const menuStructure = snapshot.val();
            renderMenuStructure(menuStructure);
        });
    }
}
// Function to render menu structure on the page
function renderMenuStructure(menuStructure) {
    const menuStructureList = document.getElementById('menuStructure');
    menuStructureList.innerHTML = '';

    if (menuStructure) {
        Object.entries(menuStructure).forEach(([key, value]) => {
            const menuItem = document.createElement('li');
            menuItem.textContent = value.label;
            menuItem.dataset.menuId = key;

            const deleteMenuButton = document.createElement('button');
            deleteMenuButton.innerHTML = '<i class="fas fa-minus-circle"></i>';
            deleteMenuButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteMenuButton.addEventListener('click', () => deleteMenu(key));
            menuItem.appendChild(deleteMenuButton);

            const editMenuButton = document.createElement('button');
            editMenuButton.innerHTML = '<i class="fas fa-edit"></i>';
            editMenuButton.classList.add('btn', 'btn-primary', 'btn-sm', 'me-2');
            editMenuButton.addEventListener('click', () => editMenu(key, value));
            menuItem.appendChild(editMenuButton);

            if (value.submenus) {
                const submenuList = document.createElement('ul');
                submenuList.classList.add('submenu-list');

                Object.entries(value.submenus).forEach(([submenuKey, submenuValue]) => {
                    const submenuItem = document.createElement('li');
                    submenuItem.textContent = submenuValue.label;

                    const deleteSubmenuButton = document.createElement('button');
                    deleteSubmenuButton.innerHTML = '<i class="fas fa-minus-circle"></i>';
                    deleteSubmenuButton.classList.add('btn', 'btn-danger', 'btn-sm');
                    deleteSubmenuButton.addEventListener('click', () => deleteSubmenu(key, submenuKey));
                    submenuItem.appendChild(deleteSubmenuButton);

                    submenuList.appendChild(submenuItem);
                });

                menuItem.appendChild(submenuList);
            }

            menuStructureList.appendChild(menuItem);
        });
    }
}

// Function to handle editing a menu
function editMenu(menuId, menu) {
    document.getElementById('label').value = menu.label;
    document.getElementById('link').value = menu.link;

    // Clear existing submenu fields
    const submenuContainer = document.getElementById('submenuContainer');
    submenuContainer.innerHTML = '';

    // Add each submenu as a field in the form
    if (menu.submenus) {
        Object.entries(menu.submenus).forEach(([submenuKey, submenuValue]) => {
            const submenuDiv = document.createElement('div');
            submenuDiv.classList.add('submenu');

            const labelInput = document.createElement('input');
            labelInput.type = 'text';
            labelInput.name = 'submenuLabel';
            labelInput.placeholder = 'Submenu Label';
            labelInput.value = submenuValue.label;
            submenuDiv.appendChild(labelInput);

            const linkInput = document.createElement('input');
            linkInput.type = 'text';
            linkInput.name = 'submenuLink';
            linkInput.placeholder = 'Submenu Link';
            linkInput.value = submenuValue.link;
            submenuDiv.appendChild(linkInput);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete Submenu';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.addEventListener('click', () => submenuDiv.remove());
            submenuDiv.appendChild(deleteButton);

            submenuContainer.appendChild(submenuDiv);
        });
    }

    // Remove the edited menu from the database
    deleteMenu(menuId);
}

// Function to delete a submenu
function deleteSubmenu(menuId, submenuId) {
    const menuRef = database.ref(`navbar/menus/${menuId}`);
    menuRef.child(`submenus/${submenuId}`).remove();
}

// Function to delete a menu and its submenus
function deleteMenu(menuId) {
    const menuRef = database.ref(`navbar/menus/${menuId}`);
    menuRef.remove();
}

// Function to add a submenu field to the form
function addSubmenu() {
    const submenuContainer = document.getElementById('submenuContainer');

    const submenuDiv = document.createElement('div');
    submenuDiv.classList.add('submenu');

    const labelInput = document.createElement('input');
    labelInput.type = 'text';
    labelInput.name = 'submenuLabel';
    labelInput.placeholder = 'Submenu Label';
    submenuDiv.appendChild(labelInput);

    const linkInput = document.createElement('input');
    linkInput.type = 'text';
    linkInput.name = 'submenuLink';
    linkInput.placeholder = 'Submenu Link';
    submenuDiv.appendChild(linkInput);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Submenu';
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteButton.addEventListener('click', () => submenuDiv.remove());
    submenuDiv.appendChild(deleteButton);

    submenuContainer.appendChild(submenuDiv);
}

// Function to handle form submission
document.getElementById('menuForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const label = document.getElementById('label').value;
    const link = document.getElementById('link').value;

    const submenus = [];
    const submenuFields = document.getElementsByClassName('submenu');
    for (let i = 0; i < submenuFields.length; i++) {
        const submenuLabel = submenuFields[i].querySelector('input[name="submenuLabel"]').value;
        const submenuLink = submenuFields[i].querySelector('input[name="submenuLink"]').value;
        submenus.push({ label: submenuLabel, link: submenuLink });
    }

    const menuData = { label, link, submenus };
    saveMenuData(menuData);
});

// Initialize menu structure retrieval
retrieveMenuStructure();
