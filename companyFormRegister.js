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
  'countriesDropdown': 'Country of residence',
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

  // Dropdown of town Aus
  // Seleccionamos el elemento <select>
  const citiesDropdown = document.getElementById('citiesDropdown');

  // Cargamos el archivo JSON con Fetch API
  fetch('australianCities.json')
      .then(response => response.json()) // Convertimos la respuesta a JSON
      .then(cities => {
          // Iteramos sobre las ciudades del JSON
          cities.forEach(cityData => {
              // Creamos una nueva opción <option> para cada ciudad
              const option = document.createElement('option');
              option.value = cityData.city;  // Asignamos el valor "city"
              option.textContent = cityData.city;  // Mostramos el texto de la ciudad
              
              // Agregamos la opción al dropdown
              citiesDropdown.appendChild(option);
          });
      })
      .catch(error => {
          console.error('Error loading the JSON file:', error);
      });

// Función de validación
function validateForm() {
  let valid = true;

  const textFields = ['company-name', 'abn','acn', 'email', 'phone'];
  textFields.forEach(field => {
    const inputElement = document.getElementById(field);
    if (!inputElement.value.trim()) {
      alert(`${friendlyNames[field]} is required`);
      inputElement.focus();
      valid = false;
      return; // Añadir return aquí para detener la validación
    }
  });
  
  // Validación de campos select
  const selectFields = ['countriesDropdown', 'state-residence', 'citiesDropdown', 'number-employees', 'type-company', 'commodity-experience', 'years-experience', 'hours-day'];
  selectFields.forEach(field => {
    const select = document.getElementById(field);
    if (!select.value) {
      alert(`Please select a value for ${friendlyNames[field]}.`);
      select.focus();
      valid = false;
      return; // Añadir return aquí para detener la validación
    }
  });

// Validar checkboxes (experiencia con campos de trabajo, preferencias de sitio y location experience)
const experienceCheckboxes = document.querySelectorAll('input[name="experience-as[]"]:checked');
if (experienceCheckboxes.length === 0) {
  alert('Please select at least one type of experience.');
  valid = false;
  return valid;
}
const workPreferenceCheckboxes = document.querySelectorAll('input[name="work-preference[]"]:checked');
if (workPreferenceCheckboxes.length === 0) {
  alert('Please select at least one work time preference.');
  valid = false;
  return valid;
}
const locationExperienceCheckboxes = document.querySelectorAll('input[name="experience-in[]"]:checked');
if (locationExperienceCheckboxes.length === 0) {
  alert('Please select at least one location experience.');
  valid = false;
  return valid;
}
const workSitePreference = document.querySelectorAll('input[name="site-preference[]"]:checked');
if (workSitePreference.length === 0) {
  alert('Please select at least one work site preference.');
  valid = false;
  return valid;
}
const experienceWithCheckboxes = document.querySelectorAll('input[name="experience-with[]"]:checked');
if (experienceWithCheckboxes.length === 0) {
  alert('Please select at least one principal activity.');
  valid = false;
  return valid;
}
const drivingExperienceCheckboxes = document.querySelectorAll('input[name="driving-experience[]"]:checked');
if (drivingExperienceCheckboxes.length === 0) {
  alert('Please select at least one driving experience.');
  valid = false;
  return valid;
}
const rosterCheckboxes = document.querySelectorAll('input[name="roster[]"]:checked');
if (rosterCheckboxes.length === 0) {
  alert('Please select at least roster preference.');
  valid = false;
  return valid;
} 

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