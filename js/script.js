//import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { createClient } from '@supabase/supabase-js';

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



// Function to handle adding a vehicle
const handleAddVehicle = async () => {
  console.log("attempt to add a vehicle");
  const addVehicleForm = document.getElementById('addVehicleForm');
  if (addVehicleForm) {
    addVehicleForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent default form submission

      const regoInput = document.getElementById('rego').trim();
      const makeInput = document.getElementById('make').trim();
      const modelInput = document.getElementById('model').trim();
      const colourInput = document.getElementById('colour').trim();
      const ownerInput = document.getElementById('owner').trim();

      // Check if any input field is empty
      if (!regoInput.value || !makeInput.value || !modelInput.value || !colourInput.value || !ownerInput.value) {
        document.getElementById('message').textContent = 'Error: Please fill in all fields.';
        console.log("one of the fields is empty");
        return;
      }

      // Clear previous search results and messages
      resultsContainer.innerHTML = '';
      messageContainer.innerHTML = '';
      
      // Check if the owner exists in the people table
      console.log("checking if owner exists in the people table: "+ownerInput.value.trim());
      let query = supabase.from('People').select();
      if(ownerInput){
        query = query.or(`Name.ilike.*${ownerInput}*`);
      }
      const { data, ownerError } = await query;
      console.log("data: "+data);

      if (ownerError) {
        console.error("owner not found: "+ownerError);
        document.getElementById('message').textContent = 'Error: An error occurred while checking the owner.';
        return;
      }

      // If owner does not exist, display a form to add the owner
      if (!ownerData || ownerData.length === 0) {
        // Display form to add owner
        const ownerForm = document.getElementById('addOwnerForm');
        ownerForm.style.display = 'block';

        // Logic to handle adding a new owner
        const addOwnerButton = document.getElementById('addOwnerButton');
        addOwnerButton.addEventListener('click', async () => {
          const nameInput = document.getElementById('name');
          const addressInput = document.getElementById('address');
          const dobInput = document.getElementById('dob');
          const licenseInput = document.getElementById('license');
          const expireInput = document.getElementById('expire');

          // Check if any input field is empty
          if (!nameInput.value || !addressInput.value || !dobInput.value || !licenseInput.value || !expireInput.value) {
            document.getElementById('message').textContent = 'Error: Please fill in all fields.';
            return;
          }

          // Add owner to the People table
          const { data: newOwnerData, error: newOwnerError } = await supabase
            .from('People')
            .insert([
              {
                Name: nameInput.value.trim(),
                Address: addressInput.value.trim(),
                DOB: dobInput.value.trim(),
                LicenseNumber: licenseInput.value.trim(),
                ExpiryDate: expireInput.value.trim(),
              },
            ]);

          if (newOwnerError) {
            console.error(newOwnerError);
            document.getElementById('message').textContent = 'Error: An error occurred while adding the owner.';
          } else {
            // If owner added successfully, hide the owner form and continue adding the vehicle
            ownerForm.style.display = 'none';
            document.getElementById('message').textContent = 'Owner added successfully.';
          }
        });

      } else {
        // Owner exists, proceed to add the vehicle
        // DOING THE ACTUAL QUERY to add the vehicle
        // Assuming here that we're adding the vehicle details to a 'Vehicles' table
        const { error: addVehicleError } = await supabase
          .from('Vehicles')
          .insert([
            {
              VehicleID: regoInput.value.trim(),
              Make: makeInput.value.trim(),
              Model: modelInput.value.trim(),
              Colour: colourInput.value.trim(),
              OwnerID: ownerData[0].id, // Assuming the ID of the owner in the People table is stored in the 'id' field
            },
          ]);

        if (addVehicleError) {
          console.error(addVehicleError);
          document.getElementById('message').textContent = 'Error: An error occurred while adding the vehicle.';
        } else {
          document.getElementById('message').textContent = 'Vehicle added successfully.';
        }
      }
    });
  }
};

// Call the functions to handle people search and vehicle search and add Vehicle
handlePeopleSearch();
handleVehicleSearch();
handleAddVehicle();