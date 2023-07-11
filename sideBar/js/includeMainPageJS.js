function includeMainPage(pathToFile) {
           
    const mainContent = document.getElementById('mainContent');

    // Use AJAX or fetch to load the main page HTML file
    fetch(pathToFile)
        .then(response => response.text())
        .then(html => {
            mainContent.innerHTML = html;
            
        })
        .catch(error => {
            console.error('Error loading main page:', error);
        });
}