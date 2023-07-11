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