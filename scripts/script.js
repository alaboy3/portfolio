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


// Function to set up navbar highlighting
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Remove 'active' class from all links
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });

        // Add 'active' class to the clicked link
        link.classList.add('active');
    });
});

// Circular button
const cursor = document.querySelector('.circular-cursor');
const buttons = document.querySelectorAll('button, [role="button"]');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
});

buttons.forEach((button) => {
  button.addEventListener('mouseenter', () => {
    cursor.style.backgroundColor = 'rgba(255, 100, 0, 0.5)'; // Change color when over button
  });

  button.addEventListener('mouseleave', () => {
    cursor.style.backgroundColor = 'rgba(255, 165, 0, 0.5)'; // Reset color when leaving button
  });
});