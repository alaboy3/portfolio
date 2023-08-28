// Load the header
fetch('Header.html')
    .then(response => response.text())
    .then(data => {
        const headerPlaceholder = document.getElementById('header-placeholder');
        headerPlaceholder.innerHTML = data;
    });

// Load the footer
fetch('Footer.html')
    .then(response => response.text())
    .then(data => {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        footerPlaceholder.innerHTML = data;
    });

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
});



