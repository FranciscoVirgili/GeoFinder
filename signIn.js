document.getElementById("form-signin").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent traditional form submission

    const formData = {
        email: document.getElementById("emailAdressInput").value,
        password: document.getElementById("userPasswordInput").value
    };

    // Send JSON data with fetch
    fetch('signin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        if (data.status === 'success') {
            // Redirect based on user type
            if (data.userType === 'Geologist') {
                window.location.href = 'geologistForm.html'; // Redirect to geologist page
            } else if (data.userType === 'Company') {
                window.location.href = 'companyForm.html'; // Redirect to company page
            }
        } else {
            // Display error message if username or password is incorrect
            const errorMessage = document.getElementById("signinError");
            errorMessage.style.display = 'block'; // Show error message
            errorMessage.innerHTML = data.message; // Set the error message text
        }
    })
    .catch(error => console.error('Error:', error));
});








// // Capturar datos de Sign In en un JSON

// document.getElementById("form-signin").addEventListener("submit", function(event) {
//     event.preventDefault(); // Evitar el envío tradicional del formulario


//     const formData = {
//         email: document.getElementById("emailAdressInput").value,
//         password: document.getElementById("userPasswordInput").value,
//     }

//     console.log(formData)
//     // Convertir los datos a JSON
//     const jsonData = JSON.stringify(formData, null, 2);

//     // Crear un blob con los datos JSON
//     const blob = new Blob([jsonData], { type: 'application/json' });

//     // Crear un enlace de descarga
//     const a = document.createElement('a');
//     a.href = URL.createObjectURL(blob);
//     a.download = 'formData.json';  // Nombre del archivo a descargar
//     document.body.appendChild(a);
//     a.click(); // Hacer clic en el enlace para iniciar la descarga

//     // Eliminar el enlace del DOM
//     document.body.removeChild(a);

// });
