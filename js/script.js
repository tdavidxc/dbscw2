// Supabase initialization (replace with your project details)
const supabaseUrl = 'https://nntrmdwbrsukpbcdledw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5udHJtZHdicnN1a3BiY2RsZWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1OTM1MDcsImV4cCI6MjAyODE2OTUwN30.TwTuNJrxB8B8haWAVdqLDyVsgkuip1omzJL7Q1Z3iWQ';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const searchForm = document.getElementById('searchForm');
const resultsContainer = document.getElementById('results');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const searchTerm = document.getElementById('name').value.trim() || document.getElementById('license').value.trim();

  if (!searchTerm) {
    resultsContainer.textContent = 'Please enter a search term (name or license number).';
    return; // Exit if no search term is provided
  }

  const searchField = searchTerm.includes(' ') ? 'name' : 'license_number'; // Adjust search field based on input format

  try {
    const { data, error } = await supabase
      .from('People')
      .select('*')
      .ilike(searchField, `%${searchTerm}%`); // Case-insensitive search

    if (error) {
      console.error(error);
      resultsContainer.textContent = 'An error occurred during search.';
    } else if (data.length === 0) {
      resultsContainer.textContent = 'No results found.';
    } else {
      resultsContainer.textContent = 'Search Results:';
      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const tbody = document.createElement('tbody');

      // Create table headers dynamically based on data structure
      const tableHeaders = ['Name', 'Address', 'DOB', 'License Number', 'Expiry Date'];

      thead.innerHTML = `<tr><th>${tableHeaders.join('</th><th>')}</th></tr>`;
      table.appendChild(thead);

      data.forEach(person => {
        const row = document.createElement('tr');
        // Create table cells dynamically based on data structure
        row.innerHTML = `<td>${person.name}</td><td>${person.address}</td><td>${person.dob}</td><td>${person.license_number}</td><td>${person.expiry_date}</td>`;
        tbody.appendChild(row);
      });

      table.appendChild(tbody);
      resultsContainer.appendChild(table);
    }
  } catch (error) {
    console.error(error);
  }
});