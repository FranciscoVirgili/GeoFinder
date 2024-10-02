// Friendly Names
const friendlyNames = {
  'company-name': 'Company Name',
  'email': 'Email',
  'phone': 'Mobile Phone',
  'primary-office-location': 'Primary Office Location',
  'primary-state-operation': 'Primary state of operation',
  'other-state-operation': 'Other state of operation',
  'number-employees': 'Number of full time employees',
  'type-company': 'Type of company',
  'commodity-experience': 'Commodity Experience',
  'years-experience': 'Years Experience',
  'hours-day': 'Hours per Day', 
  'roster-hours': 'Roster Hours', 
  'location-work': 'Location of Work'
};

// Función de validación
function validateForm() {
  let valid = true;



  const textFields = ['company-name', 'email', 'phone', 'primary-office-location', 'commodity-experience', 'location-work'];
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
  const selectFields = ['primary-state-operation', 'other-state-operation', 'number-employees', 'type-company', 'years-experience', 'hours-day', 'roster-hours'];
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