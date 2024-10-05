/*
// Friendly Names
const friendlyNames = {
  'company-name': 'Company Name',
  'surname': 'Surname',
  'email': 'Email',
  'phone': 'Mobile Phone',
  'state-residence': 'State of Residence',
  'age': 'Age',
  'country': 'Country',
  'gender': 'Gender',
  'commodity-experience': 'Commodity Experience',
  'years-experience': 'Years Experience',
  'education-level': 'Level of Education',
  'hours-day': 'Hours per Day', 
  'roster-hours': 'Roster Hours', 
  'location-work': 'Location of Work'
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

  // Validación de campos de texto
  const textFields = ['first-name', 'surname', 'email', 'phone', 'state-residence', 'country', 'commodity-experience', 'location-work'];
  textFields.forEach(field => {
    const inputElement = document.getElementById(field);
    if (!inputElement.value.trim()) {
      alert(`${friendlyNames[field]} is required`);
      inputElement.focus();
      valid = false;
    }
  });

  // Validación de campos select
  const selectFields = ['age',   'education-level', 'hours-day', 'roster-hours'];
  selectFields.forEach(field => {
    const select = document.getElementById(field);
    if (!select.value) {
      alert(`Please select a value for ${friendlyNames[field]}.`);
      select.focus();
      valid = false;
    }
  });

  // Validar género (radio buttons)
  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    alert('Please select a gender.');
    gender.focus();
    valid = false;
  }

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
    alert('Please select at least one experience with.');
    valid = false;
    return valid;
  }

  const drivingExperienceCheckboxes = document.querySelectorAll('input[name="driving-experience[]"]:checked');
  if (drivingExperienceCheckboxes.length === 0) {
    alert('Please select at least one driving experience.');
    valid = false;
    return valid;
  }

  // Validar campos de fechas
const availability = document.getElementById('availability');
if(!availability.value){
  alert('Please select availability date.');
  valid = false;
  availability.focus();
  return;
}

  const dayStart = document.getElementById('day-start');
  if(!dayStart.value){
    alert('Please select a start date.');
    valid = false;
    dayStart.focus();
    return valid;
  }

  const dayEnd = document.getElementById('day-end');
  if(!dayEnd.value){
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
*/

// Friendly Names
const friendlyNames = {
  'name': 'First Name',
  'surname': 'Surname',
  'email': 'Email',
  'phone': 'Mobile Phone',
  'state-residence': 'State of Residence',
  'country': 'Country',
  'gender': 'Gender',
  'commodity-experience': 'Commodity Experience',
  'age': 'Age',
  'countriesDropdown': 'Country of residence',
  'state-residence': 'State of Residence',
  'gender': 'Gender',
  'citiesDropdown': 'City',
  'years-experience': 'Years Experience',
  'education-level': 'Level of Education',
  'hours-day': 'Hours per Day',
  'roster-hours': 'Roster Hours',
};

// Dropdown of countries
const countriesDropdown = document.getElementById('countriesDropdown');
fetch('countries.json')
  .then(response => response.json())
  .then(countries => {
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.name;
      option.textContent = country.name;
      countriesDropdown.appendChild(option);
    });
  })
  .catch(error => console.error('Error loading the JSON file:', error));

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

  // Validación de campos de texto
  const textFields = ['first-name', 'surname', 'email', 'phone'];
  textFields.forEach(field => {
    const inputElement = document.getElementById(field);
    if (!inputElement.value.trim()) {
      alert(`${friendlyNames[field]} is required`);
      inputElement.focus();
      valid = false;
    }
  });

  // Validación de campos select
  const selectFields = ['age', 'education-level', 'hours-day', 'countriesDropdown', 'state-residence', 'citiesDropdown', 'commodity-experience', 'years-experience', 'education-level'];
  selectFields.forEach(field => {
    const select = document.getElementById(field);
    if (!select.value) {
      alert(`Please select a value for ${friendlyNames[field]}.`);
      select.focus();
      valid = false;
    }
  });

  // Validar género (radio buttons)
  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    alert('Please select a gender.');
    gender.focus();
    valid = false;
  }

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
    alert('Please select at least one experience with.');
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
document.querySelector('.geologistFormRegister').addEventListener('submit', function (event) {
  event.preventDefault();

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
