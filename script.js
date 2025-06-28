const apiKey = '415a2cb5eb6f44298d4cfb9dc9c17304'; //API Key
const apiUrl = 'https://newsapi.org/v2/top-headlines'; 
const searchButton = document.querySelector('button');
const searchInput = document.querySelector('#inputData');
const resultsContainer = document.querySelector("#searchResults");
async function fetchNews(query = '') {
    try {
        let url = `${apiUrl}?apiKey=${apiKey}&country=us`; 
        if (query) {
            url += `&q=${query}`; 
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
            displayArticles(data.articles);
        } else {
            resultsContainer.innerHTML = "<p>No results found</p>";
        }
    } catch (error) {
        console.error('Error fetching the news:', error);
        resultsContainer.innerHTML = "<p>There was an error fetching the news. Please try again later.</p>";
    }
}
function displayArticles(articles) {
    resultsContainer.innerHTML = '';
    articles.forEach(article => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("article");

        articleElement.innerHTML = `
            <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
            <p><strong>Source:</strong> ${article.source.name}</p>
            <p><strong>Category:</strong> ${article.category || 'General'}</p>
            <p>${article.description || 'No description available.'}</p>
            <hr>
        `;

        resultsContainer.appendChild(articleElement);
    });
}
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    fetchNews(query); 
});
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        fetchNews(query); 
    }
});
let debounceTimeout;
searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const query = searchInput.value.trim();
        fetchNews(query); 
    }, 500); 
});
fetchNews(); 
