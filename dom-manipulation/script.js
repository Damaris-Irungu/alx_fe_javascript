// Define an array to hold quotes
const quotes = [
    { text: "Text.", category: "Category" },
    { text: "Text.", category: "category" },
    { text: "Text.", category: "Category" },
    { text: "Text.", category: "Category" },
];

// Function to show a random quote
function showRandomQuote() {
    // Select a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Display the quote in the DOM
    const quoteDisplay = document.getElementById('quote-display');
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
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

        // Optionally display the new quote or refresh the list
        showRandomQuote();
    });
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    showRandomQuote(); // Show a random quote on page load
    createAddQuoteForm(); // Create the form for adding new quotes
});