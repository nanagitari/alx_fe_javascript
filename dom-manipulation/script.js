const quotes = [
    { text: "The only way to do great work is to always have grit.", category: "Inspiration" },
    { text: "Life is all about making memories.", category: "Life" },
    { text: "When you hit rock bottom the only way is up .", category: "Motivation" },
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    const quoteElement = document.getElementById('dynamicContent');
    quoteElement.innerHTML = `<blockquote>"${randomQuote.text}"</blockquote>
                              <p>Category: ${randomQuote.category}</p>`;
}

function createAddQuoteForm() {
    const formContainer = document.getElementById('formContainer');
    const formHTML = `
        <h3>Add a New Quote</h3>
        <form id="addQuoteForm">
            <label for="quoteText">Quote Text:</label><br>
            <input type="text" id="quoteText" name="quoteText" required><br><br>

            <label for="quoteCategory">Category:</label><br>
            <input type="text" id="quoteCategory" name="quoteCategory" required><br><br>

            <button type="submit">Add Quote</button>
        </form>
    `;
    
    formContainer.innerHTML = formHTML;

    document.getElementById('addQuoteForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const quoteText = document.getElementById('quoteText').value;
        const quoteCategory = document.getElementById('quoteCategory').value;

        quotes.push({ text: quoteText, category: quoteCategory });

        this.reset();

        alert('Quote added successfully!');
    });
}

document.addEventListener('DOMContentLoaded', function() {

    showRandomQuote();
    createAddQuoteForm();

    document.getElementById('showRandomQuoteBtn').addEventListener('click', showRandomQuote);
});
