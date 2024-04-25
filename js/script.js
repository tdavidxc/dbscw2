import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Supabase initialization (replace with your project details)
const supabaseUrl = 'https://nntrmdwbrsukpbcdledw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5udHJtZHdicnN1a3BiY2RsZWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1OTM1MDcsImV4cCI6MjAyODE2OTUwN30.TwTuNJrxB8B8haWAVdqLDyVsgkuip1omzJL7Q1Z3iWQ';
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const searchForm = document.getElementById('searchForm');
const resultsContainer = document.getElementById('results');

// Check if Supabase client is initialized
if (supabase) {
  console.log('Supabase client initialized successfully!');
} else {
  console.error('Supabase client initialization failed!');
}
// Check if form and results container are selected
if (searchForm && resultsContainer) {
  console.log('Form and results container selected successfully!');
} else {
  console.error('Failed to select form or results container!');
}

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const nameInput = document.getElementById('name');
  const licenseInput = document.getElementById('license');
  const messageContainer = document.getElementById('message');

  const name = nameInput.value.trim();
  const license = licenseInput.value.trim();

  // Clear previous search results and messages
  resultsContainer.innerHTML = '';
  messageContainer.innerHTML = '';

  if (!name && !license) {
    messageContainer.textContent = 'Error: Please enter at least one search term.';
    return; // Exit if both fields are empty
  } else if (name && license) {
    messageContainer.textContent = 'Error: Please enter only one search term.';
    return; // Exit if both fields are filled
  }

  const { data, error } = await supabase
    .from('People')
    .select('*')
    .like(name ? 'name' : 'license_number', `%${name || license}%`, { caseInsensitive: true });

  if (error) {
    console.error(error);
    messageContainer.textContent = 'Error occurred during search.';
  } else if (data.length === 0) {
    messageContainer.textContent = 'No results found.';
  } else {
    messageContainer.textContent = 'Search successful.';
    data.forEach(person => {
      const resultDiv = document.createElement('div');
      // Populate resultDiv with person data
      // For example:
      resultDiv.textContent = `Name: ${person.name}, Address: ${person.address}, DOB: ${person.dob}, LicenseNumber: ${person.license_number}, ExpiryDate: ${person.expiry_date}`;
      resultsContainer.appendChild(resultDiv);
    });
  }
});