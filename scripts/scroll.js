const containerIds = ['container1', 'container2', 'container3', 'container4', 'container5', 'container6'];
let currentContainerIndex = 0;

function showCurrentContainer() {
    containerIds.forEach((id, index) => {
        const container = document.getElementById(id);
        if (index === currentContainerIndex) {
            container.style.opacity = 1;
            container.style.zIndex = 1; // Bring the current container to the top
        } else {
            container.style.opacity = 0;
            container.style.zIndex = 0; // Move other containers below
        }
    });
}

function handleArrowKey(event) {
    // Check if the event target is an input field or a textarea
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return; // Allow arrow key events in input fields and textareas
    }

    if (event.key === 'ArrowRight') {
        currentContainerIndex = (currentContainerIndex + 1) % containerIds.length;
    } else if (event.key === 'ArrowLeft') {
        currentContainerIndex = (currentContainerIndex - 1 + containerIds.length) % containerIds.length;
    }
    showCurrentContainer();
}

function handleScroll(event) {
    if (event.deltaX > 0) {
        currentContainerIndex = (currentContainerIndex + 1) % containerIds.length;
    } else if (event.deltaX < 0) {
        currentContainerIndex = (currentContainerIndex - 1 + containerIds.length) % containerIds.length;
    }
    showCurrentContainer();
}

function handleClickArrow(iconClass) {
    if (iconClass === 'arrow-right') {
        currentContainerIndex = (currentContainerIndex + 1) % containerIds.length;
    } else if (iconClass === 'arrow-left') {
        currentContainerIndex = (currentContainerIndex - 1 + containerIds.length) % containerIds.length;
    }
    showCurrentContainer();
}


document.addEventListener('keydown', handleArrowKey);

const arrowRightIcon = document.querySelector('.arrow-icon.arrow-right');
arrowRightIcon.addEventListener('click', () => handleClickArrow('arrow-right'));

const arrowLeftIcon = document.querySelector('.arrow-icon.arrow-left');
arrowLeftIcon.addEventListener('click', () => handleClickArrow('arrow-left'));

// Initialize the visibility of the containers
showCurrentContainer();
