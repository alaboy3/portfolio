// Get all the filter links
const filterLinks = document.querySelectorAll('.nav-container a[id^="filter-"]');

// Get all the articles including the featured article
const articles = document.querySelectorAll('.blog-article, .featured-blog');

// Attach click event listeners to the filter links
filterLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        // Get the filter keywords from the link's ID
        const keywords = link.id.replace('filter-', '').split('-');

        // Toggle visibility of articles based on the keywords
        articles.forEach(article => {
            const title = article.querySelector('h2').textContent.toLowerCase().trim();

            if (keywords.includes('all') || keywords.some(keyword => title.includes(keyword))) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });

        // Remove active class from all filter links and add it to the clicked link
        filterLinks.forEach(filterLink => filterLink.classList.remove('active'));
        link.classList.add('active');
    });
});


const searchInput = document.getElementById('search-input');
const searchCount = document.getElementById('search-count');
const featuredArticle = document.querySelector('.featured-blog');
const featuredTitle = featuredArticle.querySelector('h1').textContent.toLowerCase();
let totalArticleCount = articles.length + 1; // Including the featured article

// Display the initial total count
searchCount.textContent = `${totalArticleCount} articles`;

// Attach input event listener to the search input
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let matchingCount = 0; // Initialize the matching count

    articles.forEach(article => {
        const title = article.querySelector('h2').textContent.toLowerCase();

        // Check if the search term is present in the article's title
        if (searchTerm && title.includes(searchTerm)) {
            article.style.display = 'block';
            matchingCount++; // Increment the matching count
        } else {
            article.style.display = 'none';
        }
    });

    // Check if the search term is present in the featured article's title
    if (searchTerm && featuredTitle.includes(searchTerm)) {
        featuredArticle.style.display = 'block';
        matchingCount++; // Increment the matching count for featured article
    } else if (!searchTerm) {
        featuredArticle.style.display = 'block'; // Show featured article when no search term
        matchingCount++; // Increment the matching count for total articles
    } else {
        featuredArticle.style.display = 'none';
    }

    // Display the matching count or total count when no search term
    if (searchTerm) {
        searchCount.textContent = `${matchingCount} matches`;
    } else {
        searchCount.textContent = `${totalArticleCount} articles`;
    }
});
// Get all the article links by their class name
const articleLinks = document.querySelectorAll('.blog-article, .featured-blog');

// Add a click event listener to each article link
articleLinks.forEach(article => {
    article.addEventListener('click', function(event) {
        // Get the link element inside the article
        const linkElement = article.querySelector('a');

        // Get the URL from the href attribute
        const url = linkElement.getAttribute('href');

        // Open the URL in a new tab/window
        window.open(url, '_blank');
    });
});
