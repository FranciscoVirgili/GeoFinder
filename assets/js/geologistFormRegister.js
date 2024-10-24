// Friendly Names
const friendlyNames = {
  'first-name': 'First Name',
  'surname': 'Surname',
  'email': 'Email',
  'phone': 'Mobile Phone',
  'state-residence': 'State of Residence',
  'gender': 'Gender',
  'commodities-experience': 'Commodity Experience', 
  'age': 'Age',
  'citiesDropdown': 'City',
  'years-experience': 'Years Experience',
  'education-level': 'Level of Education',
  'hours-day': 'Hours per Day',
};

// Dropdown of town Aus
const citiesDropdown = document.getElementById('citiesDropdown');
const stateDropdown = document.getElementById('state-residence');

fetch('australianCities.json')
  .then(response => response.json())
  .then(cities => {
    // Almacena las ciudades agrupadas por estado
    const citiesByState = {};

    cities.forEach(city => {
      if (!citiesByState[city.admin_name]) {
        citiesByState[city.admin_name] = [];
      }
      citiesByState[city.admin_name].push(city.city);
    });

    // Maneja el cambio en el dropdown de estados
    stateDropdown.addEventListener('change', (event) => {
      const selectedState = event.target.value;
      
      // Limpia el dropdown de ciudades
      citiesDropdown.innerHTML = '<option value="" disabled selected>Select town of residence</option>';

      // Si hay ciudades para el estado seleccionado, las añade
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

// Función de validación
function validateForm() {
  let valid = true;
  const errorMessages = []; // Declarar array de errores
  let firstInvalidField = null; // Para almacenar el primer campo no válido
  
  // Validación de campos de texto
  const textFields = ['first-name', 'surname', 'email', 'phone'];
  textFields.forEach(field => {
    const inputElement = document.getElementById(field);
    if (!inputElement.value.trim()) {
      alert(`${friendlyNames[field]} is required`);
      if (!firstInvalidField) {
        firstInvalidField = inputElement; // Almacena el primer campo no válido
      }
      valid = false;
    }
  });

  // Validar género (radio buttons)
  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    alert('Please select a gender.');
    if (!firstInvalidField) {
      firstInvalidField = document.querySelector('input[name="gender"]');
    }
    valid = false;
  }

// Validación de campos select
const selectFields = ['age', 'education-level', 'hours-day', 'state-residence', 'citiesDropdown', 'years-experience', 'commodities-experience'];
selectFields.forEach(field => {
  const select = document.getElementById(field);
  if (!select.value) {
    alert(`Please select a value for ${friendlyNames[field]}.`);
    if (!firstInvalidField) {
      firstInvalidField = select;
    }
    valid = false;
  }
});


  // Validar checkboxes (experiencias)
  const checkboxesToValidate = [
    { name: 'experience-as[]', message: 'Please select at least one type of experience.' },
    { name: 'work-time[]', message: 'Please select at least one work time preference.' },
    { name: 'work-site[]', message: 'Please select at least one work site.' },
    { name: 'experience-with[]', message: 'Please select at least one experience with.' },
    { name: 'driving-experience[]', message: 'Please select at least one driving experience.' },
    { name: 'roster[]', message: 'Please select roster preference.' },
  ];

  checkboxesToValidate.forEach(item => {
    const checkboxes = document.querySelectorAll(`input[name="${item.name}"]`);
    const checkedBoxes = document.querySelectorAll(`input[name="${item.name}"]:checked`);

    if (checkedBoxes.length === 0) {
      errorMessages.push(item.message);
      checkboxes.forEach(checkbox => {
        checkbox.classList.add('error-highlight');
      });
      if (!firstInvalidField) {
        firstInvalidField = checkboxes[0];
      }
      valid = false;
    } else {
      checkboxes.forEach(checkbox => {
        checkbox.classList.remove('error-highlight');
      });
    }
  });

  // Validar campos de fechas
  const dayStart = document.getElementById('day-start');
  const dayEnd = document.getElementById('day-end');
  
  // Forzamos la apertura del date picker al hacer clic en el input
  dayStart.addEventListener("click", function() {
  this.focus();
});
  dayEnd.addEventListener("click", function() {
  this.focus();
});
  if (!dayStart.value) {
    errorMessages.push('Please select a start date.');
    if (!firstInvalidField) {
      firstInvalidField = dayStart;
    }
    valid = false;
  }

  if (!dayEnd.value) {
    errorMessages.push('Please select an end date.');
    if (!firstInvalidField) {
      firstInvalidField = dayEnd;
    }
    valid = false;
  }

  if (dayStart.value && dayEnd.value && new Date(dayStart.value) > new Date(dayEnd.value)) {
    errorMessages.push('The start date cannot be later than the end date.');
    if (!firstInvalidField) {
      firstInvalidField = dayEnd;
    }
    valid = false;
  }

  // Mostrar un solo alerta con todos los mensajes de error si hay errores
  if (errorMessages.length > 0) {
    alert(errorMessages.join('\n'));
  }

  // Desplazar y enfocar el primer campo no válido, si existe
  if (firstInvalidField) {
    firstInvalidField.scrollIntoView();
    firstInvalidField.focus();
  }

  return valid;
}

// Evento de envío del formulario
document.querySelector('.geologistFormRegister').addEventListener('submit', function (event) {
event.preventDefault();

// Verificar si es válido
const formIsValid = validateForm();
if (!formIsValid) {
  return;
}

// Convertir el formulario a JSON
const formData = new FormData(event.target);
const formObject = {};
formData.forEach((value, key) => {
  if (formObject[key]) {
    if (!Array.isArray(formObject[key])) {
      formObject[key] = [formObject[key]];
    }
    formObject[key].push(value);
  } else {
    formObject[key] = value;
  }
});

const formDataJSON = JSON.stringify(formObject, null, 2);
console.log(formDataJSON);
});

