// BUTTONS Geo or Company:
  // Initialize variable to store the selection
  let selectedChoice = '';

  // Get the buttons by their IDs
  const btnCompany = document.getElementById('btnCompany');
  const btnGeo = document.getElementById('btnGeo');

  // Function to handle the selection
  function selectOption(selectedButton, unselectedButton, choice) {
    // Set the selected button's color (e.g., highlight it)
    selectedButton.style.backgroundColor = 'blue';  // Change to the desired active color
    selectedButton.style.color = 'white';           // Change to the desired text color

    // Reset the unselected button's color (e.g., make it inactive)
    unselectedButton.style.backgroundColor = '';    // Reset to default
    unselectedButton.style.color = '';              // Reset to default

    // Save the selection
    selectedChoice = choice;
    console.log('Selected Choice:', selectedChoice);  // Debugging purpose
  }

  // Add click event listeners to the buttons
  btnCompany.addEventListener('click', function() {
    selectOption(btnCompany, btnGeo, 'Company');
  });

  btnGeo.addEventListener('click', function() {
    selectOption(btnGeo, btnCompany, 'Geologist');
  });




//Registration Form Validation:
const form = document.querySelector('.registerForm');
const emailInput = document.getElementById('email-Register');
const confirmEmailInput = document.getElementById('confirmEmail-Register');
const emailError = document.getElementById('emailError');
const emailTick = document.getElementById('emailTick'); // One tick shared for both email fields
const passwordInput = document.getElementById('password-Register');
const confirmPasswordInput = document.getElementById('confirmPassword-Register');
const passwordError = document.getElementById('passwordError');
const passwordTick = document.getElementById('passwordTick'); // One tick shared for both password fields
const submitButton = document.getElementById('submit-Register');
const termsInput = document.getElementById('terms-Register');
const termsError = document.getElementById('termsError');

function validateForm() {
    let valid = true;

    // Email validation - only show error after both fields are filled
    if (emailInput.value !== '' && confirmEmailInput.value !== '') {
        if (emailInput.value !== confirmEmailInput.value) {
            
           // emailError.style.display = 'block';
            emailError.style.color = 'red';
            emailTick.style.display = 'none'; // Hide tick if emails don't match
            valid = false;
        } else {
            //emailError.style.display = 'none'; // Hide error if emails match
            emailError.style.color = 'transparent';
            emailTick.style.display = 'inline'; // Show tick when emails match
        }
    } else {
        //emailError.style.display = 'none'; // Hide error until both are filled
        emailError.style.color = 'transparent';
        emailTick.style.display = 'none';  // Hide tick until both are filled
    }

    // Password validation - only show error after both fields are filled
    if (passwordInput.value !== '' && confirmPasswordInput.value !== '') {
        if (passwordInput.value !== confirmPasswordInput.value) {
            //passwordError.style.display = 'block';
            passwordError.style.color = 'red';
            passwordTick.style.display = 'none'; // Hide tick if passwords don't match
            valid = false;
        } else {
            //passwordError.style.display = 'none'; // Hide error if passwords match
            passwordError.style.color = 'transparent';
            passwordTick.style.display = 'inline'; // Show tick when passwords match
        }
    } else {
        //passwordError.style.display = 'none'; // Hide error until both are filled
        passwordError.style.color = 'transparent';
        passwordTick.style.display = 'none';  // Hide tick until both are filled
        valid = false;
    }
    if(termsInput.checked){
      termsError.style.display = 'none'; // Hide terms error
    }

    // Disable submit if form is invalid

    submitButton.setAttribute.disabled = !valid;
    submitButton.disabled = !valid;


}

// Add event listeners to fields to validate on input
emailInput.addEventListener('change', validateForm);
confirmEmailInput.addEventListener('change', validateForm);
passwordInput.addEventListener('change', validateForm);
confirmPasswordInput.addEventListener('change', validateForm);
termsInput.addEventListener('input', validateForm);

// Initially disable submit button
submitButton.disabled = true;




// Capturar datos del formulario "Register"
document.querySelector('.registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    if(termsInput.checked && selectedChoice  ){
      
    // Crear un objeto para almacenar los datos
    const formData = {};
  
    // Capturar los campos de texto y select
    const fields = ['firstName', 'lastName', 'email', 'confirmEmail', 'password', 'confirmPassword'];
    fields.forEach(field => {
      formData[field] = document.getElementById(field + '-Register').value;
    });
  console.log(formData);
    // Capturar los checkboxes seleccionados
    const services = [];
    document.querySelectorAll('input[name="services"]:checked').forEach(checkbox => {
      services.push(checkbox.value);
    });
    formData['services'] = services;
  
    // Capturar el checkbox de términos y condiciones
    formData['terms'] = document.querySelector('input[name="terms"]').checked;
  
    // Convertir el objeto en JSON
    const jsonFormData = JSON.stringify(formData, null, 2);
  
    // Mostrar el JSON en la consola o enviar a un servidor
    //console.log(jsonFormData);

        const userData = {
          "firstName": formData.firstName,
          "lastName": formData.lastName,
          "displayName": formData.firstName +" "+ formData.lastName,
          "userType": selectedChoice,
          "email": formData.email,
          "password": formData.password,
          "Created": Date.now(),
          "Modified": Date.now(),
      };
      console.log(userData);

      // Send JSON data with fetch
      fetch('register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify JSON in the headers
        },
        body: JSON.stringify(userData) // Convert JS object to JSON string
      })
      .then(response => response.json()) // Parse JSON response
      .then(data => {
        console.log(data); // Log the server response
        if (data.status === 'success') {
            //alert(data.message); // Show success message
            showPopup('User registered successfully!');
            // You can redirect or clear the form here if needed
            // Redirect to the login page after a brief delay
            setTimeout(() => {
              window.location.href = 'Signin.html'; // Change 'login.html' to your actual login page URL
          }, 1000); // 2-second delay before redirect (optional)

        } else {
            
            showPopup(data.message); // Show error message
            //alert(data.message); // Show error message
        }
      })
      .catch(error => console.error('Error:', error));

  

    }
    else {
      // Reset the error message
      termsError.style.display = 'inline'; // Show terms error
      
      if (!termsInput.checked && !selectedChoice) {
          termsError.textContent = 'Please accept Terms and Conditions and select if you are a Geologist or a Company to create the Account.';
      } else if (!termsInput.checked) {
          termsError.textContent = 'Please accept Terms and Conditions to create the Account.';
      } else if (!selectedChoice) {
          termsError.textContent = 'Please select if you are a Geologist or a Company to create the Account.';
      }
  }


  

  });
  

function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    popupMessage.textContent = message;
    popup.style.display = 'block'; // Show the popup
}

// Close the popup when the user clicks on <span> (x)
document.getElementById('closePopup').onclick = function() {
    document.getElementById('popup').style.display = 'none';
};

// Close the popup when the user clicks anywhere outside of the popup
window.onclick = function(event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
}



//  Password Validation ------------------------------

var myInput = document.getElementById("password-Register");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
}

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}