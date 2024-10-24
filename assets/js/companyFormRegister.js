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

fetch('data/australianCities.json')
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
    validateAndProceed(1);
  });

  // document.getElementById('next-2').addEventListener('click', function () {
  //   validateAndProceed(2);
  // });

  // document.getElementById('next-3').addEventListener('click', function () {
  //   validateAndProceed(3);
  // });

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

// document.addEventListener('DOMContentLoaded', function () {
//   // Add event listeners for navigation buttons
//   ['next-1', 'next-2', 'next-3'].forEach(id => {
//     document.getElementById(id).addEventListener('click', function () {
//       validateAndProceed(id.split('-')[1]); // Extracts the part number from the button ID
//     });
//   });

//   ['back-2', 'back-3', 'back-4'].forEach(id => {
//     document.getElementById(id).addEventListener('click', function () {
//       previousFormPart(id.split('-')[1]);
//     });
//   });

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

    //validate form to date from third part
    if (formPart== "form-part-3"){
      if (!validateDates()){
        formIsValid = false;
      }
    }

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

  //part 3
  document.getElementById('next-3').addEventListener('click', function () {
    const datesValid = validateDates();  // Run the date validation
    const formValid = validateAndProceed(3);  // Run the other form validations

    // Both validations should be true to proceed
    if (datesValid && formValid) {
      nextFormPart(3); // Proceed to the next form part if both are valid
    }
  });

  // Validate on input change for date fields
  document.getElementById('day-start').addEventListener('input', validateDates);
  document.getElementById('day-end').addEventListener('input', validateDates);
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

  // Validate "Driving experience" section (now using fieldset)
  let drivingChecked = document.querySelectorAll('input[name="driving-experience[]"]:checked').length > 0;
  let drivingError = document.querySelector('.drivingExperience + .error-message');
  
  if (!drivingChecked) {
      drivingError.style.display = 'block';
  } else {
      drivingError.style.display = 'none';
  }

  // Prevent moving to the next part if any validation failed
  if (!experienceChecked || !workTimeChecked || !workSiteChecked || !principalActivityChecked || !drivingChecked) {
      return false; // Stop form progression
  }
  else{ 
    nextFormPart(2);
  }

});

// Add 'change' event listeners to each checkbox group to hide error messages dynamically

// "Someone who is a" checkboxes
document.querySelectorAll('input[name="experience-as[]"]').forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
      let experienceChecked = document.querySelectorAll('input[name="experience-as[]"]:checked').length > 0;
      let experienceError = document.querySelector('.typeExperiencechck + .error-message');
      
      if (experienceChecked) {
          experienceError.style.display = 'none';
      }
  });
});

// "Work time preference" checkboxes
document.querySelectorAll('input[name="work-time[]"]').forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
      let workTimeChecked = document.querySelectorAll('input[name="work-time[]"]:checked').length > 0;
      let workTimeError = document.querySelector('.workPreferencechck + .error-message');
      
      if (workTimeChecked) {
          workTimeError.style.display = 'none';
      }
  });
});

// "Work site preference" checkboxes
document.querySelectorAll('input[name="work-site[]"]').forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
      let workSiteChecked = document.querySelectorAll('input[name="work-site[]"]:checked').length > 0;
      let workSiteError = document.querySelector('.locationExperiencechck + .error-message');
      
      if (workSiteChecked) {
          workSiteError.style.display = 'none';
      }
  });
});

// "Principal activity" checkboxes
document.querySelectorAll('input[name="experience-with[]"]').forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
      let principalActivityChecked = document.querySelectorAll('input[name="experience-with[]"]:checked').length > 0;
      let principalActivityError = document.querySelector('.experienceWithchck + .error-message');
      
      if (principalActivityChecked) {
          principalActivityError.style.display = 'none';
      }
  });
});

// "Driving experience" checkboxes
document.querySelectorAll('input[name="driving-experience[]"]').forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
      let drivingChecked = document.querySelectorAll('input[name="driving-experience[]"]:checked').length > 0;
      let drivingError = document.querySelector('.drivingExperience + .error-message');
      
      if (drivingChecked) {
          drivingError.style.display = 'none';
      }
  });
});

//Part 3

// document.addEventListener('DOMContentLoaded', function () {
//   // Add event listener for the next button in the third part
//   document.getElementById('next-3').addEventListener('click', function () {
//     validateAndProceed(3); // Validate third form part
//   });

//   // Validate on input change for date fields
//   document.getElementById('day-start').addEventListener('input', validateDates);
//   document.getElementById('day-end').addEventListener('input', validateDates);
// });

// Function to validate date fields
function validateDates() {
  const dayStart = document.getElementById('day-start');
  const dayEnd = document.getElementById('day-end');
  const dayStartError = document.getElementById('day-start-error');
  const dayEndError = document.getElementById('day-end-error');

  let isValid = true;

  // Check if the fields are empty
  if (!dayStart.value) {
    dayStartError.textContent = "Available from date is required.";
    dayStartError.style.display = 'block';
    dayStart.classList.add('input-error');
    isValid = false;
  } else {
    dayStartError.style.display = 'none';
    dayStart.classList.remove('input-error');
  }

  if (!dayEnd.value) {
    dayEndError.textContent = "Available to date is required.";
    dayEndError.style.display = 'block';
    dayEnd.classList.add('input-error');
    isValid = false;
  } else {
    dayEndError.style.display = 'none';
    dayEnd.classList.remove('input-error');
  }

  // Validate that the start date is not newer than the end date
  if (dayStart.value && dayEnd.value) {
    if (new Date(dayStart.value) > new Date(dayEnd.value)) {
      dayEndError.textContent = "Available to date cannot be earlier than Available from date.";
      dayEndError.style.display = 'block';
      dayEnd.classList.add('input-error');
      isValid = false;
    } else {
      dayEndError.style.display = 'none';
      dayEnd.classList.remove('input-error');
    }
  }

  return isValid; // Return whether dates are valid
}




