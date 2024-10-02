
// Capturar datos del formulario "Register"
document.querySelector('.registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  
    // Crear un objeto para almacenar los datos
    const formData = {};
  
    // Capturar los campos de texto y select
    const fields = ['firstName', 'lastName', 'username', 'city', 'state', 'zip', 'email', 'password', 'confirmPassword'];
    fields.forEach(field => {
      formData[field] = document.getElementById(field + 'Register').value;
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
    console.log(jsonFormData);
  });
  
