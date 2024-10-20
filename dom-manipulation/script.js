const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Example API for quotes

// Function to fetch quotes from the server periodically
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(apiUrl);
    const serverQuotes = await response.json();
    console.log('Fetched quotes from server:', serverQuotes);
    syncServerQuotes(serverQuotes);
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
  }
}

// Simulate fetching quotes from server every 30 seconds
setInterval(fetchQuotesFromServer, 30000);

// Function to post data to the mock API
function postQuote() {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST', // Specify the method
    headers: {
      'Content-Type': 'application/json' // Set the content type to JSON
    },
    body: JSON.stringify(newQuote) // Convert the quote object to JSON
  })
  .then(response => {
    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // Parse the response as JSON
  })
  .then(data => {
    console.log('Success:', data); // Handle the response data
  })
  .catch(error => {
    console.error('Error:', error); // Handle any errors
  });
}

// Call the function to post the quote
postQuote();

// Array of quote objects with text and category
let quotes = [
  { text: "Text.", category: "Category" },
  { text: "Text.", category: "Category" },
  { text: "Text.", category: "Category" },
  { text: "Text.", category: "Category" },
];
// Function to populate categories in the dropdown menu
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
// Function to filter and display quotes based on selected category
function filterQuotes() {
  const categoryFilter = document.getElementById('categoryFilter').value;
  const filteredQuotes = (categoryFilter === 'all') ? quotes : quotes.filter(q => q.category === categoryFilter);


// Function to display a random quote using innerHTML
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const quoteDisplay = document.getElementById('quoteDisplay');

  // Using innerHTML to structure the quote display with HTML
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <p><strong>Category:</strong> ${randomQuote.category}</p>
  `;
}
// Function to create and display the form for adding new quotes
function createAddQuoteForm() {
    const formContainer = document.getElementById('add-quote-form');

    // Create a form element
    const form = document.createElement('form');
    form.id = 'quote-form';

    // Create input for quote text
    const quoteInput = document.createElement('input');
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter quote text';
    quoteInput.required = true;

    // Create input for quote category
    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';
    categoryInput.required = true;

    // Create a addQuote button
    const addQuoteButton = document.createElement('button');
    addQuoteButton.textContent = 'Add Quote';
    
    // Append inputs and button to the form
    form.appendChild(quoteInput);
    form.appendChild(categoryInput);
    form.appendChild(addQuoteButton);

    // Append form to the container
    formContainer.appendChild(form);

    // Add event listener to handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Create a new quote object
        const newQuote = {
            text: quoteInput.value,
            category: categoryInput.value
        };

        // Add the new quote to the quotes array
        quotes.push(newQuote);

        // Clear input fields
        quoteInput.value = '';
        categoryInput.value = '';


// Event listener for "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Add new quote to the quotes array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Clear input fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  // Optionally, show the new quote right after it's added
  showRandomQuote();
}
      // Save the quotes array to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}
// Update categories in the dropdown
  const categoryFilter = document.getElementById('categoryFilter');
  if (![...categoryFilter.options].some(opt => opt.value === newQuoteCategory)) {
    const option = document.createElement('option');
    option.value = newQuoteCategory;
    option.textContent = newQuoteCategory;
    categoryFilter.appendChild(option);
  }

// Sync server quotes with local storage
function syncQuotes(serverQuotes) {
  const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

  // Merge server and local quotes, with server taking precedence
  const updatedQuotes = [...serverQuotes];

  localQuotes.forEach(localQuote => {
    const existingQuote = updatedQuotes.find(quote => quote.id === localQuote.id);
    if (!existingQuote) {
      updatedQuotes.push(localQuote);
    }
  });

  // Save merged quotes to local storage
  localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
  console.log('Synced quotes:', updatedQuotes);

  // Update the UI
  showRandomQuote();
}
// Load quotes from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
// Initialize quotes array from localStorage
  let quotes = JSON.parse(localStorage.getItem('quotes')) || [];
// Restore the last selected filter from localStorage
  const savedCategory = localStorage.getItem('selectedCategory') || 'all';
  categoryFilter.value = savedCategory;
  // Show the last viewed quote from sessionStorage, if any
  const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
  if (lastViewedQuote) {
    document.getElementById('quoteDisplay').innerHTML = `
      <p>"${lastViewedQuote.text}"</p>
      <p><strong>Category:</strong> ${lastViewedQuote.category}</p>
    `;
  } else {
    // Otherwise, show a random quote
    showRandomQuote();
  }
});

// Show a random quote when the page loads
document.addEventListener('DOMContentLoaded', showRandomQuote);
      
// Export quotes to JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'quotes.json';
  downloadLink.click();
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}
// Conflict resolution: Notify users if quotes have been updated
function notifyUserOfUpdate() {
  const notificationDiv = document.createElement('div');
  notificationDiv.textContent = 'Quotes synced with server!';
  notificationDiv.classList.add('notification');
  document.body.appendChild(notificationDiv);

  setTimeout(() => {
    notificationDiv.remove();
  }, 5000);
}

// Manual conflict resolution option (prompt)
function manualConflictResolution() {
  const userChoice = confirm('Server data conflicts with local data. Do you want to use server data?');
  if (userChoice) {
    localStorage.setItem('quotes', JSON.stringify(serverQuotes));
    showRandomQuote();
  }
}
