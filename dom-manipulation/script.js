// Array of quote objects with text and category
let quotes = [
  { text: "Text.", category: "Category" },
  { text: "Text.", category: "Category" },
  { text: "Text.", category: "Category" },
  { text: "Text.", category: "Category" },
];

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

// Show a random quote when the page loads
document.addEventListener('DOMContentLoaded', showRandomQuote);
