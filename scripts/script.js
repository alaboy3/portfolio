// Load the header
fetch('./header.html')
    .then(response => response.text())
    .then(data => {
        const headerPlaceholder = document.getElementById('header-placeholder');
        headerPlaceholder.innerHTML = data;
    });

// Load the footer
fetch('./footer.html')
.then(response => response.text())
.then(data => {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    footerPlaceholder.innerHTML = data;
});

document.addEventListener("DOMContentLoaded", function() {
  const fadeInContainer = document.querySelector(".fadeInElements");
  fadeInContainer.classList.add("fadeInElements");
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
const interactiveElements = document.querySelectorAll('a[href], a[id], [role="button"], iconify-icon, .iconify');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
});

let isCursorExpanded = false; // To track cursor expansion state

interactiveElements.forEach((element) => {
  element.addEventListener('mouseenter', () => {
    cursor.style.backgroundColor = 'rgba(83.92, 42.75, 10.98, 0.8)';
    cursor.style.width = '30px';
    cursor.style.height = '30px';
    if (!isCursorExpanded) {
      cursor.style.backgroundSize = '6px 3px';
      isCursorExpanded = true;
    }
  });

  element.addEventListener('mouseleave', () => {
    cursor.style.backgroundColor = 'rgba(255, 165, 0, 0.5)';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    if (isCursorExpanded) {
      cursor.style.backgroundSize = '4px 2px';
      isCursorExpanded = false;
    }
  });
});