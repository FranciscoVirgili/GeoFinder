// Friendly Names
const friendlyNames = {
  'company-name': 'Company name',
  'abn': 'ABN',
  'acn': 'ACN',
  'email': 'Contact email',
  'phone': 'Mobile/Contact phone',
  'state-residence': 'State of residence',
  'country': 'Country',
  'gender': 'Gender',
  'commodity-experience': 'Commodity experience',
  'age': 'Age',
  'citiesDropdown': 'City',
  'other-towns': 'Other State of operation',
  'number-employees': 'Number of employees',
  'type-company': 'Type of company',
  'years-experience': 'Years experience',
  'education-level': 'Level of education',
  'hours-day': 'Hours per day',
};

// Dropdown of town Aus
const citiesDropdown = document.getElementById('citiesDropdown');
const stateDropdown = document.getElementById('state-residence');

fetch('australianCities.json')
  .then(response => response.json())
  .then(cities => {
    const citiesByState = {};
    cities.forEach(city => {
      if (!citiesByState[city.admin_name]) {
        citiesByState[city.admin_name] = [];
      }
      citiesByState[city.admin_name].push(city.city);
    });

    stateDropdown.addEventListener('change', (event) => {
      const selectedState = event.target.value;
      citiesDropdown.innerHTML = '<option value="" disabled selected>Select town of residence</option>';
      if (citiesByState[selectedState]) {
        citiesByState[selectedState].forEach(city => {
          const option = document.createElement('option');
          option.value = city;
          option.textContent = city;
          citiesDropdown.appendChild(option);
        });
      }
    });
  })
  .catch(error => console.error('Error loading the JSON file:', error));

document.addEventListener('DOMContentLoaded', function () {
  // Add event listeners for next buttons
  document.getElementById('next-1').addEventListener('click', function () {
    nextFormPart(1);
  });

  document.getElementById('next-2').addEventListener('click', function () {
    nextFormPart(2);
  });

  document.getElementById('next-3').addEventListener('click', function () {
    nextFormPart(3);
  });

  // Add event listeners for back buttons
  document.getElementById('back-2').addEventListener('click', function () {
    previousFormPart(2);
  });

  document.getElementById('back-3').addEventListener('click', function () {
    previousFormPart(3);
  });

  document.getElementById('back-4').addEventListener('click', function () {
    previousFormPart(4);
  });
});

// Functions for showing/hiding form parts
function nextFormPart(currentPart) {
  document.getElementById(`form-part-${currentPart}`).style.display = 'none';
  document.getElementById(`form-part-${currentPart + 1}`).style.display = 'block';
}

function previousFormPart(currentPart) {
  document.getElementById(`form-part-${currentPart}`).style.display = 'none';
  document.getElementById(`form-part-${currentPart - 1}`).style.display = 'block';
}


// document.addEventListener('DOMContentLoaded', function () {
//   // Get all inputs that need validation
//   const inputsToValidate = document.querySelectorAll('.validate-input');

//   inputsToValidate.forEach(input => {
//     const errorElement = document.getElementById(`${input.id}-error`);

//     // On blur, validate the input
//     input.addEventListener('blur', function () {
//       if (input.value.trim() === '') {
//         // Show error message and red border if input is empty
//         errorElement.style.display = 'block';
//         input.classList.add('input-error');
//       }
//     });

//     // On input, hide the error message when valid input is entered
//     input.addEventListener('input', function () {
//       if (input.value.trim() !== '') {
//         // Hide the error message and red border once the input has valid text
//         errorElement.style.display = 'none';
//         input.classList.remove('input-error');
//       }
//     });
//   });
// });

document.addEventListener('DOMContentLoaded', function () {
  // Get all inputs that need validation
  const inputsToValidate = document.querySelectorAll('.validate-input');

  // Loop through each input and apply validation on blur and input events
  inputsToValidate.forEach(input => {
    const errorElement = document.getElementById(`${input.id}-error`);

    // On blur, validate the input
    input.addEventListener('blur', function () {
      validateInput(input, errorElement);
    });

    // On input, hide the error message when valid input is entered
    input.addEventListener('input', function () {
      validateInput(input, errorElement);
    });
  });

  // On "Next" button click, validate all fields
  const nextButton = document.getElementById('next-1');

  nextButton.addEventListener('click', function (event) {
    // Run validation for all inputs
    let formIsValid = true;

    inputsToValidate.forEach(input => {
      const errorElement = document.getElementById(`${input.id}-error`);
      if (!validateInput(input, errorElement)) {
        formIsValid = false;
      }
    });

    // If form is not valid, prevent the default action (e.g., navigating to the next step)
    if (!formIsValid) {
      event.preventDefault();
      alert('Please fill in all required fields correctly.');
    }
  });

  // Function to validate a single input
  function validateInput(input, errorElement) {
    const inputType = input.type; // Get the type of the input (e.g., text, checkbox, etc.)

    // For text, email, etc., use input.value and trim() to check for empty strings
    if (inputType === 'text' || inputType === 'email' || inputType === 'number') {
      if (input.value.trim() === '') {
        // Show error message and red border if input is empty
        errorElement.style.display = 'block';
        input.classList.add('input-error');
        return false; // Return false if invalid
      } else {
        // Hide the error message and red border once the input has valid text
        errorElement.style.display = 'none';
        input.classList.remove('input-error');
        return true; // Return true if valid
      }
    }

    // For checkboxes or radio buttons, ensure that at least one is selected
    if (inputType === 'checkbox' || inputType === 'radio') {
      const checkboxes = document.querySelectorAll(`input[name="${input.name}"]:checked`);
      if (checkboxes.length === 0) {
        errorElement.style.display = 'block';
        input.classList.add('input-error');
        return false;
      } else {
        errorElement.style.display = 'none';
        input.classList.remove('input-error');
        return true;
      }
    }

    // For select dropdowns, ensure a value is selected
    if (input.tagName === 'SELECT') {
      if (input.value === '' || input.value === null) {
        errorElement.style.display = 'block';
        input.classList.add('input-error');
        return false;
      } else {
        errorElement.style.display = 'none';
        input.classList.remove('input-error');
        return true;
      }
    }
  }
});
