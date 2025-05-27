const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const instagramBtn = document.getElementById('instagram');
const newQuoteBtn = document.getElementById('new-quote')

let apiQuotes = [];

// Show new quote
function newQuote() {
    //  Pick a random qoute from apiQuotes array
    const quote = apiQuotes.quotes[Math.floor(Math.random() * apiQuotes.quotes.length)];

    // Check if Author field is empty and replace with 'Unkown'
    if (quote.author === '') {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.quote.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    
    quoteText.textContent = quote.quote;
}

// Get Qoutes from API
async function getQuotes() {
    const apiURL = 'https://dummyjson.com/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
        // console.log(apiQoutes.quotes)
    } catch (error) {
        console.log(error)
        // Handle Catch Error here
    }
}

// Create instagram post
function instagramPost() {
    const instagramUrl = `https://www.threads.net/intent/post?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(instagramUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
instagramBtn.addEventListener('click', instagramPost);

// On Load
getQuotes();