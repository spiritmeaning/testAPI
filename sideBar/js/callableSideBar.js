function createDynamicSidebar() {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('wrapper', 'd-flex', 'align-items-stretch');

    const sidebarNav = document.createElement('nav');
    sidebarNav.id = 'sidebar';

    const sidebarDiv = document.createElement('div');
    sidebarDiv.classList.add('p-4', 'pt-5');

    const logoLink = document.createElement('a');
    logoLink.href = '#';
    logoLink.classList.add('img', 'logo', 'rounded-circle', 'mb-5');
    logoLink.style.backgroundImage = 'url(images/logo.jpg)';

    const sidebarMenu = document.createElement('ul');
    sidebarMenu.id = 'sidebarMenu';
    sidebarMenu.classList.add('list-unstyled', 'components', 'mb-5');

    const footerDiv = document.createElement('div');
    footerDiv.classList.add('footer');

    const footerText = document.createElement('p');
    footerText.innerHTML = `&copy; ${new Date().getFullYear()} All rights reserved | This template is made with <i class="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib.com</a>`;

    footerDiv.appendChild(footerText);

    sidebarDiv.appendChild(logoLink);
    sidebarDiv.appendChild(sidebarMenu);
    sidebarDiv.appendChild(footerDiv);

    sidebarNav.appendChild(sidebarDiv);

    const mainDiv = document.createElement('div');
    mainDiv.classList.add('col-md-9', 'main');

    const mainContentDiv = document.createElement('div');
    mainContentDiv.id = 'mainContent';

    mainDiv.appendChild(mainContentDiv);

    wrapperDiv.appendChild(sidebarNav);
    wrapperDiv.appendChild(mainDiv);

    document.body.appendChild(wrapperDiv);
}
