/*// Friendly Names
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
  'state-residence': 'State of residence',
  'gender': 'Gender',
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

  const textFields = ['company-name', 'abn', 'acn', 'email', 'phone'];

  textFields.forEach(field => {
    const inputElement = document.getElementById(field);
    if (!inputElement.value.trim()) {
      alert(`${friendlyNames[field]} is required`);
      inputElement.classList.add('input-error');
      inputElement.focus();
      valid = false;
      return; 
    } else {
      inputElement.classList.remove('input-error');
    }
  });
  
  // Validación de campos select
  const selectFields = ['state-residence', 'citiesDropdown', 'number-employees', 'type-company', 'years-experience', 'hours-day', 'commodities-experience'];
  selectFields.forEach(field => {
    const select = document.getElementById(field);
    if (!select.value) {
      alert(`Please select a value for ${friendlyNames[field]}.`);
      select.focus();
      valid = false;
      return; // Añadir return aquí para detener la validación
    }
  });

  // Validar checkboxes (experiencias)
  const checkboxesToValidate = [
    { name: 'experience-as[]', message: 'Please select at least one type of experience.' },
    { name: 'work-time[]', message: 'Please select at least one work time preference.' },
    { name: 'work-site[]', message: 'Please select at least one work site.' },
    { name: 'experience-with[]', message: 'Please select at least one experience with.' },
    { name: 'driving-experience[]', message: 'Please select at least one driving experience.' },
  ];

  checkboxesToValidate.forEach(item => {
    const checkboxes = document.querySelectorAll(`input[name="${item.name}"]:checked`);
    if (checkboxes.length === 0) {
      alert(item.message);
      valid = false;
    }
  });

// Validar campos de fechas
const dayStart = document.getElementById('day-start');
if (!dayStart.value) {
  alert('Please select a start date.');
  valid = false;
  dayStart.focus();
  return valid;
}

const dayEnd = document.getElementById('day-end');
if (!dayEnd.value) {
  alert('Please select end date.');
  valid = false;
  dayEnd.focus();
  return valid;
}

const startDate = document.getElementById('day-start').value;
const endDate = document.getElementById('day-end').value;

if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
  alert('The start date cannot be later than the end date.');
  valid = false;
  dayEnd.focus();
}
return valid;
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

// Función de validación
function validateForm() {
  let valid = true;

  const textFields = ['company-name', 'abn', 'acn', 'email', 'phone'];

  textFields.forEach(field => {
    const inputElement = document.getElementById(field);
    if (!inputElement.value.trim()) {
      alert(`${friendlyNames[field]} is required`);
      inputElement.classList.add('input-error');
      inputElement.focus();
      valid = false;
      return; 
    } else {
      inputElement.classList.remove('input-error');
    }
  });

  // Validación de campos select
  const selectFields = ['state-residence', 'citiesDropdown', 'number-employees', 'type-company', 'years-experience', 'hours-day', 'commodities-experience'];
  selectFields.forEach(field => {
    const select = document.getElementById(field);
    if (!select.value) {
      alert(`Please select a value for ${friendlyNames[field]}.`);
      select.classList.add('input-error');
      select.focus();
      valid = false;
      return;
    } else {
      select.classList.remove('input-error');
    }
  });

  // Validar checkboxes (experiencias)
  const checkboxesToValidate = [
    { name: 'experience-as[]', message: 'Please select at least one type of experience.' },
    { name: 'work-time[]', message: 'Please select at least one work time preference.' },
    { name: 'work-site[]', message: 'Please select at least one work site.' },
    { name: 'experience-with[]', message: 'Please select at least one experience with.' },
    { name: 'driving-experience[]', message: 'Please select at least one driving experience.' },
  ];

  checkboxesToValidate.forEach(item => {
    const checkboxes = document.querySelectorAll(`input[name="${item.name}"]:checked`);
    if (checkboxes.length === 0) {
      alert(item.message);
      valid = false;
    }
  });

  // Validar campos de fechas
  const dayStart = document.getElementById('day-start');
  const dayEnd = document.getElementById('day-end');

  if (!dayStart.value) {
    alert('Please select a start date.');
    dayStart.classList.add('input-error');
    valid = false;
    dayStart.focus();
  } else {
    dayStart.classList.remove('input-error');
  }

  if (!dayEnd.value) {
    alert('Please select end date.');
    dayEnd.classList.add('input-error');
    valid = false;
    dayEnd.focus();
  } else {
    dayEnd.classList.remove('input-error');
  }

  const startDate = dayStart.value;
  const endDate = dayEnd.value;

  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    alert('The start date cannot be later than the end date.');
    valid = false;
    dayEnd.classList.add('input-error');
    dayEnd.focus();
  } else {
    dayEnd.classList.remove('input-error');
  }

  return valid;
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
