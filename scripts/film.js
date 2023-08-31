const gallery = document.querySelector('.gallery');
const scrollDotContainer = document.querySelector('.scroll-dot-container');
const images = document.querySelectorAll('.gallery-image');
const galleryHeight = gallery.clientHeight;

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
    scrollToIndex(dotIndex);
  }
});

for (let i = 0; i < images.length; i++) {
  const scrollDot = document.createElement('div');
  scrollDot.classList.add('scroll-dot');
  scrollDotContainer.appendChild(scrollDot);
}

updateScrollDots(0);
