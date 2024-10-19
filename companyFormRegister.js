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

/*// Validar selección múltiple de commodities
const commoditiesSelect = document.getElementById('commodities-experience');
const commoditiesErrorMessage = 'Please select at least one commodity experience.';
*/

// Función de validación
function validateForm() {
  let valid = true;
  const errorMessages = []; // Almacenar todos los mensajes de error

  // Validación de campos de texto
  const textFields = ['company-name', 'abn', 'acn', 'email', 'phone'];
  textFields.forEach(field => {
    const inputElement = document.getElementById(field);
    if (!inputElement.value.trim()) {
      errorMessages.push(`${friendlyNames[field]} is required`);
      inputElement.classList.add('input-error');
      valid = false;
      inputElement.focus();
      return; // Salir del bucle
    } else {
      inputElement.classList.remove('input-error');
    }
  });

  // Validación de campos select
  const selectFields = ['state-residence', 'citiesDropdown', 'number-employees', 'type-company', 'years-experience', 'hours-day', 'commodities-experience'];
  selectFields.forEach(field => {
    const select = document.getElementById(field);
    if (!select.value) {
      errorMessages.push(`Please select a value for ${friendlyNames[field]}.`);
      valid = false;
      select.focus();
      return; // Salir del bucle
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
      errorMessages.push(item.message); // Agrega el mensaje de error
      checkboxes.forEach(checkbox => {
        checkbox.classList.add('error-highlight'); // Agrega la clase 'error-highlight'
      });

      // Desplazar hasta el primer checkbox del grupo no válido
      checkboxes[0].scrollIntoView();
      checkboxes[0].focus();
      valid = false;
    } else {
      checkboxes.forEach(checkbox => {
        checkbox.classList.remove('error-highlight'); // Remover la clase de error si ya está corregido
      });
    }
  });

  // Validar campos de fechas
  const dayStart = document.getElementById('day-start');
  if (!dayStart.value) {
    errorMessages.push('Please select a start date.');
    valid = false;
    dayStart.focus();
  }

  const dayEnd = document.getElementById('day-end');
  if (!dayEnd.value) {
    errorMessages.push('Please select an end date.');
    valid = false;
    dayEnd.focus();
  }

  const startDate = dayStart.value;
  const endDate = dayEnd.value;
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    errorMessages.push('The start date cannot be later than the end date.');
    valid = false;
    dayEnd.focus();
  }

  // Mostrar un solo alerta con todos los mensajes de error si hay errores
  if (errorMessages.length > 0) {
    alert(errorMessages.join('\n'));
  }

  return valid; // Asegúrate de devolver el estado de validación
}

// Evento de envío del formulario
document.querySelector('.companyFormRegister').addEventListener('submit', function (event) {
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

/* 
//////////////
 // Dropdown of countries
  // Seleccionamos el elemento <select>
  const countriesDropdown = document.getElementById('countriesDropdown');

  // Cargamos el archivo JSON con Fetch API
  fetch('countries.json')
      .then(response => response.json()) // Convertimos la respuesta a JSON
      .then(countries => {
          // Iteramos sobre las ciudades del JSON
          countries.forEach(countriesData => {
              // Creamos una nueva opción <option> para cada ciudad
              const option = document.createElement('option');
              option.value = countriesData.name;  // Asignamos el valor "city"
              option.textContent = countriesData.name;  // Mostramos el texto de la ciudad
              
              // Agregamos la opción al dropdown
              countriesDropdown.appendChild(option);
          });
      })
      .catch(error => {
          console.error('Error loading the JSON file:', error);
      });
*/

