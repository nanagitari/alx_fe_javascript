const quotes = [
    { text: "The only way to do great work is to always have grit.", category: "Inspiration" },
    { text: "Life is all about making memories.", category: "Life" },
    { text: "When you hit rock bottom the only way is up .", category: "Motivation" },
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    const quoteElement = document.getElementById('dynamicContent');

    quoteElement.innerHTML = '';

    const blockquote = document.createElement('blockquote');
    blockquote.textContent = `"${randomQuote.text}"`;

    const category = document.createElement('p');
    category.textContent = `Category: ${randomQuote.category}`;

    quoteElement.appendChild(blockquote);
    quoteElement.appendChild(category);
}
function newQuote() {
    showRandomQuote();
}
function createAddQuoteForm() {
    const formContainer = document.getElementById('formContainer');

    formContainer.innerHTML = '';

    const form = document.createElement('form');
    form.id = 'addQuoteForm';

    const labelText = document.createElement('label');
    labelText.setAttribute('for', 'quoteText');
    labelText.textContent = 'Quote Text:';
    
    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.id = 'quoteText';
    inputText.name = 'quoteText';
    inputText.required = true;

    const breakLine1 = document.createElement('br');

    const labelCategory = document.createElement('label');
    labelCategory.setAttribute('for', 'quoteCategory');
    labelCategory.textContent = 'Category:';

    const inputCategory = document.createElement('input');
    inputCategory.type = 'text';
    inputCategory.id = 'quoteCategory';
    inputCategory.name = 'quoteCategory';
    inputCategory.required = true;

    const breakLine2 = document.createElement('br');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Quote';

    form.appendChild(labelText);
    form.appendChild(inputText);
    form.appendChild(breakLine1);

    form.appendChild(labelCategory);
    form.appendChild(inputCategory);
    form.appendChild(breakLine2);

    form.appendChild(submitButton);

    formContainer.appendChild(form);

    form.addEventListener('submit', function (event) {
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


