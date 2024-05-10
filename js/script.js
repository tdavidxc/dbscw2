import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
//import { createClient } from '@supabase/supabase-js';

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

        // Create div elements for each person
        data.forEach(person => {
          const personDiv = document.createElement('div');
          personDiv.classList.add('person-result');

          // Populate div with person data
          const personInfo = `
            <p><strong>Name:</strong> ${person.Name}</p>
            <p><strong>Address:</strong> ${person.Address}</p>
            <p><strong>DOB:</strong> ${person.DOB}</p>
            <p><strong>License Number:</strong> ${person.LicenseNumber}</p>
            <p><strong>Expiry Date:</strong> ${person.ExpiryDate}</p>
          `;
          personDiv.innerHTML = personInfo;

          // Append person div to results container
          resultsContainer.appendChild(personDiv);
        });
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

      if (!regoInput || !messageContainer) {
        console.log("Invalid input or message container.");
        return;
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
      console.log("rego: " + rego);
      let query = supabase.from('Vehicles').select();
      if (rego) {
        query = query.or(`VehicleID.ilike.*${rego}*`);
      }
      const { data, error } = await query;
      console.log("data: " + data);

      if (error) {
        console.error(error);
        messageContainer.textContent = 'Error occurred during search.';
      } else if (!data || data.length === 0) {
        messageContainer.textContent = 'No results found.';
      } else {
        messageContainer.textContent = 'Search successful.';

        // Create div elements for each vehicle
        data.forEach(vehicle => {
          const vehicleDiv = document.createElement('div');
          vehicleDiv.classList.add('vehicle-result');

          // Populate div with vehicle data
          const vehicleInfo = `
            <p><strong>Vehicle ID:</strong> ${vehicle.VehicleID}</p>
            <p><strong>Make:</strong> ${vehicle.Make}</p>
            <p><strong>Model:</strong> ${vehicle.Model}</p>
            <p><strong>Colour:</strong> ${vehicle.Colour}</p>
            <p><strong>Owner ID:</strong> ${vehicle.OwnerID}</p>
          `;
          vehicleDiv.innerHTML = vehicleInfo;

          // Append vehicle div to results container
          resultsContainer.appendChild(vehicleDiv);
        });
      }
    });
  } else {
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
      const regoInput = document.getElementById('rego');
      const makeInput = document.getElementById('make');
      const modelInput = document.getElementById('model');
      const colourInput = document.getElementById('colour');
      const ownerInput = document.getElementById('owner');
      
      const name1 = ownerInput.value.trim();

      const messageContainer = document.getElementById('message');
      console.log("1");
      // Check if any input field is empty
      if (!regoInput || !makeInput|| !modelInput || !colourInput || !name1) {
        if(!regoInput){
          console.log("regoInput is empty");
        }
        if(!makeInput){
          console.log("makeInput is empty");
        }
        if(!modelInput){
          console.log("modelInput is empty");
        }
        if(!colourInput){
          console.log("colourInput is empty");
        }
        if(!name1){
          console.log("name1 is empty");
        }

        
        
        
        
        console.log(regoInput.value + " " + makeInput.value + " " + modelInput.value + " " + colourInput.value + " " + ownerInput.value);
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
      query = query.or(`Name.ilike.*${name1}*`);
      const { data, ownerError } = await query;

      if (ownerError || !data || data.length === 0) {
        console.error("owner not found: "+ownerError);
        console.log("data length 0 or data empty: "+data);
        document.getElementById('message').textContent = 'Error: An error occurred while checking the owner.';
      }
      if(!ownerError && data && data.length > 0){
        console.log("owner found: "+data);
      }

      // If owner does not exist, display a form to add the owner
      if (!data || data.length === 0) {
        // Display form to add owner
        const ownerForm = document.getElementById('addOwnerForm');
        ownerForm.style.display = 'block';

        // Logic to handle adding a new owner
        const addOwnerButton = document.getElementById('addOwnerButton');
        addOwnerButton.addEventListener('click', async (event) => {
          event.preventDefault();
          const ownerID = document.getElementById('personid');
          const nameInput = document.getElementById('name');
          const addressInput = document.getElementById('address');
          const dobInput = document.getElementById('dob');
          const licenseInput = document.getElementById('license');
          const expireInput = document.getElementById('expire');

          // Check if any input field is empty
          if (!ownerID.value||!nameInput.value || !addressInput.value || !dobInput.value || !licenseInput.value || !expireInput.value) {
            console.log(ownerID.value + " " + nameInput.value + " " + addressInput.value + " " + dobInput.value + " " + licenseInput.value + " " + expireInput.value);
            document.getElementById('message').textContent = 'Error: Please fill in all fields.';
            return;
          }

          // Add owner to the People table
          const {error: newOwnerError } = await supabase
            .from('People')
            .insert([
              {
                PersonID: ownerID.value,
                Name: nameInput.value,
                Address: addressInput.value,
                DOB: dobInput.value,
                LicenseNumber: licenseInput.value,
                ExpiryDate: expireInput.value,
              },
            ]);

          if (newOwnerError) {
            console.error("unable to add new owner"+newOwnerError+"sent data:");
            console.log("sent data: "+ownerID.value + " " + nameInput.value + " " + addressInput.value + " " + dobInput.value + " " + licenseInput.value + " " + expireInput.value);
            
            console.log("newOwnerError:", newOwnerError);
            
            document.getElementById('message').textContent = 'Error: An error occurred while adding the owner.';
          } else {
            // If owner added successfully, hide the owner form and continue adding the vehicle
            ownerForm.style.display = 'none';
            //document.getElementById('message').textContent = 'Owner added successfully.';
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
              VehicleID: regoInput.value,
              Make: makeInput.value,
              Model: modelInput.value,
              Colour: colourInput.value,
              OwnerID: data[0].id, // Assuming the ID of the owner in the People table is stored in the 'id' field
            },
          ]);

        if (addVehicleError) {
          console.error(addVehicleError);
          document.getElementById('message').textContent = 'Error: An error occurred while adding the vehicle.';
        } else {
          document.getElementById('message').textContent = 'Vehicle added successfully';
        }
      }
    });
  }
};

// Call the functions to handle people search and vehicle search and add Vehicle
handlePeopleSearch();
handleVehicleSearch();
handleAddVehicle();