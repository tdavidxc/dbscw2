import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Supabase initialization (replace with your project details)
const supabaseUrl = 'https://nntrmdwbrsukpbcdledw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5udHJtZHdicnN1a3BiY2RsZWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1OTM1MDcsImV4cCI6MjAyODE2OTUwN30.TwTuNJrxB8B8haWAVdqLDyVsgkuip1omzJL7Q1Z3iWQ';
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const resultsContainer = document.getElementById('results');

// Check if Supabase client is initialized
if (supabase) {
  console.log('Supabase client initialized successfully!');
} else {
  console.error('Supabase client initialization failed!');
}

// Function to handle people search
const handlePeopleSearch = async () => {
  console.log("person search attempt");
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
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

      // DOING THE ACTUAL QUERY
      let query = supabase.from('People').select();
      if (name) {
        query = query.or(`Name.ilike.*${name}*`);
      }
      if (license) {
        query = query.or(`LicenseNumber.ilike.*${license}*`);
      }
      const { data, error } = await query;

      if (error) {
        console.error(error);
        messageContainer.textContent = 'Error code:1 occurred during search.';
      } else if (!data || data.length === 0) {
        messageContainer.textContent = 'No results found.';
      } else {
        messageContainer.textContent = 'Search successful.';
        
        console.log("data retrieved: \n"+data)

        // Create a table element
        const table = document.createElement('table');
        table.classList.add('results-table');
      
        // Create table header row
        const headerRow = document.createElement('tr');
        const headers = ['Name', 'Address', 'DOB', 'License Number', 'Expiry Date'];
        headers.forEach(headerText => {
          const headerCell = document.createElement('th');
          headerCell.textContent = headerText;
          headerRow.appendChild(headerCell);
        });
        table.appendChild(headerRow);
      
        // Create table rows for each person
        data.forEach(person => {
          const row = document.createElement('tr');
          const cells = ['Name', 'Address', 'DOB', 'LicenseNumber', 'ExpiryDate'];
          cells.forEach(cellName => {
            const cell = document.createElement('td');
            cell.textContent = person[cellName];
            row.appendChild(cell);
          });
          table.appendChild(row);
        });
      
        // Append the table to the results container
        resultsContainer.appendChild(table);
      }
    });
  }
};

// Function to handle vehicle search
const handleVehicleSearch = async () => {
  console.log("vehicle search attempt");
  const vehicleSearchForm = document.getElementById('vehicleSearchForm');
  if (vehicleSearchForm) {
    vehicleSearchForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent default form submission

      const regoInput = document.getElementById('rego');
      const messageContainer = document.getElementById('message');

      if(!regoInput){
        console.log("regoInput is invalid");
      }
      if(!messageContainer){
        console.log("messageContainer is invalid");
      }
      const rego = regoInput.value.trim();
      

      // Clear previous search results and messages
      resultsContainer.innerHTML = '';
      messageContainer.innerHTML = '';

      if (!rego) {
        messageContainer.textContent = 'Error: Please enter a vehicle registration number.';
        return; // Exit if the field is empty
      }

      // DOING THE ACTUAL QUERY
      console.log("rego: "+rego);
      let query = supabase.from('Vehicles').select();
      if (rego) {
        query = query.or(`VehicleID.ilike.*${rego}*`);
      }
      const { data, error } = await query;
      console.log("data: "+data);

      if (error) {
        console.error(error);
        messageContainer.textContent = 'Error occurred during search.';
      } else if (!data || data.length === 0) {
        messageContainer.textContent = 'No results found.';
      } else {
        messageContainer.textContent = 'Search successful.';
        
        // Create a table element
        const table = document.createElement('table');
        table.classList.add('results-table');

        // Create table header row
        const headerRow = document.createElement('tr');
        const headers = ['VehicleID', 'Make', 'Model', 'Colour', 'OwnerID'];
        headers.forEach(headerText => {
          const headerCell = document.createElement('th');
          headerCell.textContent = headerText;
          headerRow.appendChild(headerCell);
        });
        table.appendChild(headerRow);

        // Create table rows for each vehicle
        data.forEach(vehicle => {
          const row = document.createElement('tr');
          const cells = ['VehicleID', 'Make', 'Model', 'Colour', 'OwnerID'];
          cells.forEach(cellName => {
            const cell = document.createElement('td');
            cell.textContent = vehicle[cellName];
            row.appendChild(cell);
          });
          table.appendChild(row);
        });

        // Append the table to the results container
        resultsContainer.appendChild(table);
      }
    });
  }else{
    console.log("vehicleSearchForm is invalid");
  }
};

// Call the functions to handle people search and vehicle search
handlePeopleSearch();
handleVehicleSearch();