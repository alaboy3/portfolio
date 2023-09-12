const gallery = document.querySelector('.gallery');
const scrollDotContainer = document.querySelector('.scroll-dot-container');
const images = document.querySelectorAll('.gallery-image');
const galleryHeight = gallery.clientHeight;
let currentIndex = 0; // Keep track of the current image index
let scrollInterval; // Variable to store the scroll interval
let userClicked = false; // Track if the user clicked a scroll dot

function scrollToIndex(index) {
  gallery.style.transform = `translateY(-${index * galleryHeight}px)`;
  updateScrollDots(index);
}

function updateScrollDots(currentIndex) {
  const scrollDots = document.querySelectorAll('.scroll-dot');
  scrollDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

scrollDotContainer.addEventListener('click', (event) => {
  const dotIndex = [...scrollDotContainer.children].indexOf(event.target);
  if (dotIndex >= 0) {
    userClicked = true; // User clicked a scroll dot
    clearInterval(scrollInterval); // Clear the previous interval
    currentIndex = dotIndex; // Set the current index to the selected dot
    scrollToIndex(currentIndex);

    // Wait for 30 seconds (30,000 milliseconds) before resuming auto-scrolling
    setTimeout(() => {
      userClicked = false; // Reset userClicked flag
      currentIndex = (currentIndex + 1) % images.length; // Move to the next image
      scrollToIndex(currentIndex);
      scrollInterval = setInterval(scrollToNextImage, 10000); // Resume auto-scrolling
    }, 30000); // 30 seconds in milliseconds
  }
});

for (let i = 0; i < images.length; i++) {
  const scrollDot = document.createElement('div');
  scrollDot.classList.add('scroll-dot');
  scrollDotContainer.appendChild(scrollDot);
}

// Function to scroll to the next image
function scrollToNextImage() {
  if (!userClicked) {
    currentIndex = (currentIndex + 1) % images.length; // Move to the next image
    scrollToIndex(currentIndex);
  }
}

// Set an interval to scroll to the next image every 10 seconds
scrollInterval = setInterval(scrollToNextImage, 10000); // 10 seconds in milliseconds

updateScrollDots(0); // Initialize with the first image
