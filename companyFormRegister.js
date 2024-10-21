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

// document.addEventListener('DOMContentLoaded', function () {
//   // Add event listeners for next buttons
//   document.getElementById('next-1').addEventListener('click', function () {
//     nextFormPart(1);
//   });

//   document.getElementById('next-2').addEventListener('click', function () {
//     nextFormPart(2);
//   });

//   document.getElementById('next-3').addEventListener('click', function () {
//     nextFormPart(3);
//   });

//   // Add event listeners for back buttons
//   document.getElementById('back-2').addEventListener('click', function () {
//     previousFormPart(2);
//   });

//   document.getElementById('back-3').addEventListener('click', function () {
//     previousFormPart(3);
//   });

//   document.getElementById('back-4').addEventListener('click', function () {
//     previousFormPart(4);
//   });
// });

// // Functions for showing/hiding form parts
// function nextFormPart(currentPart) {
//   document.getElementById(`form-part-${currentPart}`).style.display = 'none';
//   document.getElementById(`form-part-${currentPart + 1}`).style.display = 'block';
// }

// function previousFormPart(currentPart) {
//   document.getElementById(`form-part-${currentPart}`).style.display = 'none';
//   document.getElementById(`form-part-${currentPart - 1}`).style.display = 'block';
// }


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
  // Add event listeners for next buttons
  document.getElementById('next-1').addEventListener('click', function () {
    validateAndProceed(1);
  });

  document.getElementById('next-2').addEventListener('click', function () {
    validateAndProceed(2);
  });

  document.getElementById('next-3').addEventListener('click', function () {
    validateAndProceed(3);
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

  // Loop through all form inputs and add validation logic
  const inputsToValidate = document.querySelectorAll('.validate-input');
  inputsToValidate.forEach(input => {
    const errorElement = document.getElementById(`${input.id}-error`);

    // Validate on blur
    input.addEventListener('blur', function () {
      validateInput(input, errorElement);
    });

    // Validate on input
    input.addEventListener('input', function () {
      validateInput(input, errorElement);
    });
  });

  // Function to validate the current form part and proceed
  function validateAndProceed(currentPart) {
    const formPart = document.getElementById(`form-part-${currentPart}`);
    const inputsToValidate = formPart.querySelectorAll('.validate-input'); // Only validate inputs in this form part

    let formIsValid = true;
    
    // Validate all inputs in the current part
    inputsToValidate.forEach(input => {
      const errorElement = document.getElementById(`${input.id}-error`);
      if (!validateInput(input, errorElement)) {
        formIsValid = false; // Set form validity to false if any input fails validation
      }
    });

    // If the form part is valid, proceed to the next part
    if (formIsValid) {
      nextFormPart(currentPart);
    } else {
      //alert('Please fill in all required fields correctly.');
    }
  }

  // Function to validate a single input
  function validateInput(input, errorElement) {
    const inputType = input.type; // Get the input type (e.g., text, checkbox, etc.)

    // For text, email, number, etc., check for empty strings
    if (inputType === 'text' || inputType === 'email' || inputType === 'number') {
      if (input.value.trim() === '') {
        errorElement.style.display = 'block';
        input.classList.add('input-error');
        return false; // Input is invalid
      } else {
        errorElement.style.display = 'none';
        input.classList.remove('input-error');
        return true; // Input is valid
      }
    }

    // For checkboxes or radio buttons, ensure at least one is selected
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

    return true; // Default return true for unhandled input types
  }
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



document.getElementById('next-2').addEventListener('click', function () {
  // Validate first column: "Someone who is a"
  let experienceChecked = document.querySelectorAll('input[name="experience-as[]"]:checked').length > 0;
  let experienceError = document.querySelector('.typeExperiencechck + .error-message');
  
  if (!experienceChecked) {
      experienceError.style.display = 'block';
  } else {
      experienceError.style.display = 'none';
  }

  // Validate "Work time preference"
  let workTimeChecked = document.querySelectorAll('input[name="work-time[]"]:checked').length > 0;
  let workTimeError = document.querySelector('.workPreferencechck + .error-message');

  if (!workTimeChecked) {
      workTimeError.style.display = 'block';
  } else {
      workTimeError.style.display = 'none';
  }

  // Validate second column: "Work site preference"
  let workSiteChecked = document.querySelectorAll('input[name="work-site[]"]:checked').length > 0;
  let workSiteError = document.querySelector('.locationExperiencechck + .error-message');
  
  if (!workSiteChecked) {
      workSiteError.style.display = 'block';
  } else {
      workSiteError.style.display = 'none';
  }

  // Validate third column: "Principal activity"
  let principalActivityChecked = document.querySelectorAll('input[name="experience-with[]"]:checked').length > 0;
  let principalActivityError = document.querySelector('.experienceWithchck + .error-message');
  
  if (!principalActivityChecked) {
      principalActivityError.style.display = 'block';
  } else {
      principalActivityError.style.display = 'none';
  }

  // Prevent moving to the next part if any validation failed
  if (!experienceChecked || !workTimeChecked || !workSiteChecked || !principalActivityChecked) {
      return false; // Stop form progression
  }

  // If all validations pass, proceed to the next part
  // Your code to move to the next section...
});


