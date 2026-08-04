const quotes = [
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
    { text: "So many books, so little time.", author: "Frank Zappa" },
    { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
    { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
    { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "If you tell the truth, you don't have to remember anything.", author: "Mark Twain" },
    { text: "A friend is someone who knows all about you and still loves you.", author: "Elbert Hubbard" },
    { text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde" },
    { text: "Always forgive your enemies; nothing annoys them so much.", author: "Oscar Wilde" },
    { text: "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.", author: "Martin Luther King Jr." },
    { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
    { text: "We accept the love we think we deserve.", author: "Stephen Chbosky" },
    { text: "Without music, life would be a mistake.", author: "Friedrich Nietzsche" },
    { text: "I am so clever that sometimes I don't understand a single word of what I am saying.", author: "Oscar Wilde" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" },
    { text: "Here's to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes.", author: "Rob Siltanen" },
    { text: "It is better to be hated for what you are than to be loved for what you are not.", author: "Andre Gide" },
    { text: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.", author: "H. Jackson Brown Jr." },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison" },
    { text: "It is never too late to be what you might have been.", author: "George Eliot" },
    { text: "There is no greater agony than bearing an untold story inside you.", author: "Maya Angelou" },
    { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
    { text: "Life isn't about finding yourself. Life is about creating yourself.", author: "George Bernard Shaw" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston S. Churchill" },
    { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
];

let currentIndex = -1;
let isTransitioning = false;

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const btnNewQuote = document.getElementById('btn-new-quote');

function getRandomQuote() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentIndex && quotes.length > 1);
    
    currentIndex = newIndex;
    return quotes[currentIndex];
}

function displayQuote() {
    if (isTransitioning) return;
    isTransitioning = true;

    const quote = getRandomQuote();
    
    quoteContainer.classList.add('fade-out');
    
    setTimeout(() => {
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = quote.author;
        
        quoteContainer.classList.remove('fade-out');
        
        setTimeout(() => {
            isTransitioning = false;
        }, 300); 

    }, 300); 
}

btnNewQuote.addEventListener('click', displayQuote);

window.addEventListener('DOMContentLoaded', () => {
    const quote = getRandomQuote();
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = quote.author;
});