function generateSidebar(menuItem, parentElement) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const span = document.createElement('span');
    span.classList.add('dropdown-icon');
    a.appendChild(span);
    a.href = menuItem.link;
    a.textContent = menuItem.label;

    if (menuItem.submenus && menuItem.submenus.length > 0) {
        a.setAttribute('data-toggle', 'collapse');
        a.setAttribute('aria-expanded', 'false');
        a.classList.add('dropdown-toggle');

        const submenuUl = document.createElement('ul');
        submenuUl.classList.add('collapse', 'list-unstyled');
        submenuUl.id = menuItem.key;

        menuItem.submenus.forEach(submenu => {
            if (submenu) {
                const submenuLi = document.createElement('li');
                const submenuA = document.createElement('a');
                submenuA.href = submenu.link;
                submenuA.textContent = submenu.label;
                submenuLi.appendChild(submenuA);
                submenuUl.appendChild(submenuLi);
            }
        });

        li.appendChild(a);
        li.appendChild(submenuUl);

        a.addEventListener('click', function (e) {
            e.preventDefault();
            submenuUl.classList.toggle('show');
            span.classList.toggle('collapsed');
        });
    } else {
        li.appendChild(a);
        a.addEventListener('click', function (e) {
            e.preventDefault();

            includeMainPage(menuItem.link);


        });
    }

    parentElement.appendChild(li);
}



const firebaseConfig = {
    apiKey: "AIzaSyDgOZOH3upRrphZP834oOLJuHpCY9wcrzE",
    authDomain: "spiritmeaning-email.firebaseapp.com",
    projectId: "spiritmeaning-email",
    storageBucket: "spiritmeaning-email.appspot.com",
    messagingSenderId: "274529228758",
    appId: "1:274529228758:web:d8b9d3646c2880de74f677",
    measurementId: "G-ZPGXSCFT60"
};

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();
const database = firebase.database();
const rootRef = firebase.database().ref('navbar/menus');
firebase.auth().signInWithEmailAndPassword('spiritmeaning@gmail.com', 'SriRamSita1234$#@!')
    .then(() => {
        // Function to extract submenu data
        function extractDatabaseStructure(rootRef, result = []) {
            return new Promise((resolve, reject) => {
                rootRef.once('value', (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        const key = childSnapshot.key;
                        const value = childSnapshot.val();

                        if (value !== undefined && value.label !== undefined && value.link !== undefined) {
                            const menuItem = {
                                key: key,
                                label: value.label,
                                link: value.link
                            };

                            if (value.submenus) {
                                menuItem.submenus = [];
                                Object.values(value.submenus).forEach((submenu) => {
                                    if (submenu.label !== undefined && submenu.link !== undefined) {
                                        const submenuItem = {
                                            key: submenu.label,
                                            label: submenu.label,
                                            link: submenu.link
                                        };
                                        menuItem.submenus.push(submenuItem);
                                    }
                                });
                            }

                            result.push(menuItem);

                            if (value !== null && typeof value === 'object') {
                                extractDatabaseStructure(childSnapshot.ref, result)
                                    .then(resolve)
                                    .catch(reject);
                                console.log(menuItem);
                                generateSidebar(menuItem, sidebarMenu);
                            }

                        }

                    });

                });

            });
        }

        const sidebarMenu = document.getElementById('sidebarMenu');
        const extractedData = [];

        extractDatabaseStructure(rootRef, extractedData)
            .then((extractedData) => {
                generateSidebar(extractedData, sidebarMenu);
            })
            .catch((error) => {
                console.error('Error extracting database structure:', error);
            });
    })
    .catch((error) => {
        console.log("Authentication error:", error);
    });

