
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
  'roster-hours': 'Roster Hours',
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

  // Validar género (radio buttons)
  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    alert('Please select a gender.');
    const firstGenderRadio = document.querySelector('input[name="gender"]');
    firstGenderRadio.focus();
    valid = false;
  }

// Validación de campos select
const selectFields = ['age', 'education-level', 'hours-day', 'state-residence', 'citiesDropdown', 'years-experience', 'commodities-experience'];
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
  { name: 'experience-in[]', message: 'Please select at least one work site experience.' },
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

  // Validar fechas
  const dayStart = document.getElementById('day-start');
  const dayEnd = document.getElementById('day-end');

  if (!dayStart.value) {
    alert('Please select a start date.');
    dayStart.focus();
    valid = false;
  } else if (!dayEnd.value) {
    alert('Please select an end date.');
    dayEnd.focus();
    valid = false;
  } else if (new Date(dayStart.value) > new Date(dayEnd.value)) {
    alert('The start date cannot be later than the end date.');
    dayEnd.focus();
    valid = false;
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
