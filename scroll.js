const container1 = document.getElementById('container1');
const container2 = document.getElementById('container2');
const container3 = document.getElementById('container3');
const container4 = document.getElementById('container4'); // New container
const container5 = document.getElementById('container5'); // New container
const container6 = document.getElementById('container6'); // New container

// Set the initial z-index for all containers
const initialZIndex = 10;
const containers = [container1, container2, container3, container4, container5, container6];
containers.forEach((container, index) => {
    container.style.zIndex = initialZIndex + index;
    container.style.opacity = 0;
});

container2.style.opacity = 0; // Hide container2 initially
container3.style.opacity = 0; // Hide container3 initially
container4.style.opacity = 0; // Hide container4 initially
container5.style.opacity = 0; // Hide container5 initially
container6.style.opacity = 0; // Hide container6 initially

let currentIndex = 0; // Start from container1 (index 0)

function showContainer(index) {
    containers.forEach((container, i) => {
        if (i === index) {
            container.style.opacity = 1;
            container.style.zIndex = Math.max(...containers.map(c => parseInt(c.style.zIndex))) + 1; // Move to the top
        } else {
            container.style.opacity = 0;
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % containers.length;
    } else if (event.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + containers.length) % containers.length;
    }
    showContainer(currentIndex);
});

// Show container1 initially and hide other containers
showContainer(currentIndex);
