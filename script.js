const containerQuote = document.querySelector(".quote-container");
const loader = document.querySelector(".loader");

const labelQuoteText = document.querySelector(".quote-text");
const labelAuthor = document.querySelector(".author");

const btnTweet = document.querySelector(".btn-tweeter");
const btnNewQuote = document.querySelector(".btn-new-tweet");

let quotes = [];

function displayLoader() {
  containerQuote.hidden = true;
  loader.hidden = false;
}

function hideLoader() {
  loader.hidden = true;
  containerQuote.hidden = false;
}

async function loadQuotes() {
  displayLoader();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    quotes = data;
    getRandomQuote();
  } catch (err) {
    console.log(err);
  }
}

function getRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  labelQuoteText.textContent = quote.text;
  labelAuthor.textContent = `~ ${quote.author ?? "Unknown"}`;
  if (quote.text.length > 240) {
    labelQuoteText.classList.add("quote-large-text");
  } else if (quote.text.length > 120) {
    labelQuoteText.classList.add("quote-mid-text");
  } else {
    labelQuoteText.classList.remove("quote-large-text");
    labelQuoteText.classList.remove("quote-mid-text");
  }
  hideLoader();
}

// Tweet Quote
function tweetQuote() {
  const quote = labelQuoteText.innerText;
  const author = labelAuthor.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// event handlers
btnNewQuote.addEventListener("click", getRandomQuote);
btnTweet.addEventListener("click", tweetQuote);
loadQuotes();
