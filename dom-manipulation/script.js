const defaultQuotes = [
    { text: "The only way to do great work is to always have grit.", category: "Inspiration" },
    { text: "Life is all about making memories.", category: "Life" },
    { text: "When you hit rock bottom the only way is up .", category: "Motivation" },
];
function getQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    return storedQuotes ? JSON.parse(storedQuotes) : defaultQuotes

}
function saveQuotes(quotes) {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}


let quotes = getQuotes();
function getUniqueCategories() {
    const categories = quotes.map(quote => quote.category);
    return [...new Set(categories)];
}
function populateCategories() {
    const categories = getUniqueCategories();
    const categoryDropdown = document.getElementById('categoryFilter');

    categoryDropdown.innerHTML = '';

    const allOption = document.createElement('option');
    allOption.value = '';
    allOption.textContent = 'All';
    categoryDropdown.appendChild(allOption);

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });

    const lastSelectedCategory = localStorage.getItem('selectedCategory');
    if (lastSelectedCategory) {
        categoryDropdown.value = lastSelectedCategory;
        filterQuotes(lastSelectedCategory);
    }
}
function filterQuotes(category) {
    const quoteElement = document.getElementById('quoteDisplay');
    quoteElement.innerHTML = ''; 

    const filteredQuotes = category ? quotes.filter(quote => quote.category === category) : quotes;

    filteredQuotes.forEach(quote => {
        const blockquote = document.createElement('blockquote');
        blockquote.textContent = `"${quote.text}"`;

        const categoryParagraph = document.createElement('p');
        categoryParagraph.textContent = `Category: ${quote.category}`;

        quoteElement.appendChild(blockquote);
        quoteElement.appendChild(categoryParagraph);
    });
}

function saveSelectedCategory(category) {
    localStorage.setItem('selectedCategory', category);
}

function handleCategoryChange(event) {
    const selectedCategory = event.target.value;

    filterQuotes(selectedCategory);

    saveSelectedCategory(selectedCategory);
}
function addQuote(quoteText, quoteCategory) {
    
    quotes.push({ text: quoteText, category: quoteCategory });

    saveQuotes(quotes);

    if (!getUniqueCategories().includes (quoteCategory)){
        populateCategories ();
    }
    alert ('Quote added succefully');
}

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

function exportQuotesAsJSON() {
    const quotesJSON = JSON.stringify(quotes, null, 2);

    const blob = new Blob([quotesJSON], { type: 'application/json' });

    const link = document.createElement('a');
    
    link.href = URL.createObjectURL(blob);

    link.download = 'quotes.json';

    link.click();

    URL.revokeObjectURL(link.href);

}
document.addEventListener('DOMContentLoaded', function() {
    
    showRandomQuote();

    createAddQuoteForm();

    const showQuoteBtn = document.getElementById('showRandomQuoteBtn');
    if (showQuoteBtn) {
        showQuoteBtn.addEventListener('click', newQuote);
    } else {
        console.error('Show Random Quote button not found!');
    }
    const exportBtn = document.getElementById('exportQuotesBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportQuotesAsJSON);
    } else {
        console.error('Export Quotes button not found!');
    }
});
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

function fetchQuotesFromServer() {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5') 
        .then(response => response.json())
        .then(data => {
            const serverQuotes = data.map(post => ({
                text: post.title,
                category: "Server" 
            }));
            quotes = [...quotes, ...serverQuotes];
            
            saveQuotes(quotes);
            populateCategories();
        })
        .catch(error => console.error('Error fetching quotes:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    fetchQuotesFromServer();

});
function postQuoteToServer(quoteText, quoteCategory) {
    const newQuote = {
        title: quoteText, 
        body: quoteCategory,
        userId: 1 
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newQuote),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Quote successfully posted:', data);
    })
    .catch(error => console.error('Error posting quote:', error));
}

function addQuote(quoteText, quoteCategory) {
    
    quotes.push({ text: quoteText, category: quoteCategory });

    saveQuotes(quotes);

    if (!getUniqueCategories().includes(quoteCategory)) {
        populateCategories();
    }

    postQuoteToServer(quoteText, quoteCategory);

    alert('Quote added successfully!');
}

function startPollingForUpdates() {
    setInterval(fetchQuotesFromServer, 30000); 
}

document.addEventListener('DOMContentLoaded', function() {
    fetchQuotesFromServer(); 
    startPollingForUpdates();

});

function fetchAndSyncQuotes() {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5') 
        .then(response => response.json())
        .then(serverData => {
            
            const serverQuotes = serverData.map(post => ({
                text: post.title,
                category: "Server"
            }));
            syncQuotes(serverQuotes);
        })
        .catch(error => console.error('Error fetching quotes:', error));
}

function syncQuotes(serverQuotes) {
    const updatedQuotes = [];
    const conflictQuotes = []; 

    const serverQuotesMap = new Map(serverQuotes.map(q => [q.text, q]));

    quotes.forEach(localQuote => {
        const serverQuote = serverQuotesMap.get(localQuote.text);
        if (serverQuote) {
        
            if (localQuote.category !== serverQuote.category) {
            
                conflictQuotes.push({ local: localQuote, server: serverQuote });
            } else {
            
                updatedQuotes.push(localQuote);
            }
            serverQuotesMap.delete(localQuote.text); 
        } else {
            
            updatedQuotes.push(localQuote);
        }
    });

    
    serverQuotesMap.forEach(serverQuote => updatedQuotes.push(serverQuote));

    
    quotes = updatedQuotes;
    saveQuotes(quotes);
    populateCategories(); 

    if (conflictQuotes.length > 0) {
        handleConflicts(conflictQuotes);
    } else {
        showNotification("Quotes synced with serve!");
    }
}



function startPollingForUpdates() {
    setInterval(fetchAndSyncQuotes, 30000); 
}

document.addEventListener('DOMContentLoaded', function() {
    fetchAndSyncQuotes(); 
    startPollingForUpdates(); 
});
function handleConflicts(conflictQuotes) {
    
    showNotification("Conflicts detected. Please resolve the conflicts below.");

    const conflictResolutionArea = document.getElementById('conflictResolutionArea');
    conflictResolutionArea.innerHTML = ''; 

    conflictQuotes.forEach(({ local, server }) => {
        const conflictDiv = document.createElement('div');
        conflictDiv.style.marginBottom = '10px';
        conflictDiv.innerHTML = `
            <p><strong>Conflict for quote:</strong></p>
            <blockquote>${local.text}</blockquote>
            <p>Local Category: ${local.category}</p>
            <p>Server Category: ${server.category}</p>
            <button onclick="resolveConflict('${local.text}', 'local')">Keep Local</button>
            <button onclick="resolveConflict('${local.text}', 'server')">Keep Server</button>
        `;
        conflictResolutionArea.appendChild(conflictDiv);
    });

    conflictResolutionArea.style.display = 'block'; 
}

function resolveConflict(quoteText, choice) {
    const conflictResolutionArea = document.getElementById('conflictResolutionArea');
    conflictResolutionArea.style.display = 'none'; 

    const conflictQuote = quotes.find(quote => quote.text === quoteText);
    if (choice === 'local') {
        showNotification(`Kept local version for: "${quoteText}".`);
    } else {
        
        const serverQuote = quotes.find(quote => quote.text === quoteText && quote.category === "Server");
        if (serverQuote) {
            conflictQuote.category = serverQuote.category; 
            showNotification(`Updated to server version for: "${quoteText}".`);
        }
    }

    saveQuotes(quotes);
    populateCategories(); 
}

async function fetchAndSyncQuotes() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5'); 
        const serverData = await response.json();

    
        const serverQuotes = serverData.map(post => ({
            text: post.title,
            category: "Server" 
        }));

        syncQuotes(serverQuotes);
    } catch (error) {
        console.error('Error fetching quotes:', error);
        showNotification("Failed to fetch quotes from the server."); 
    }
}