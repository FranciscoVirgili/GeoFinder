document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    // Capturar los valores del formulario
    const formData = {
        email: document.getElementById("inputEmail4").value,
        password: document.getElementById("inputPassword4").value,
        address: document.getElementById("inputAddress").value,
        city: document.getElementById("inputCity").value,
        zip: document.getElementById("inputZip").value,
        checkMeOut: document.getElementById("gridCheck").checked
    };

    // Ver los datos capturados en la consola
    console.log(formData);

    // Convertir los datos a JSON
    const jsonData = JSON.stringify(formData, null, 2);

    // Crear un blob con los datos JSON
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Crear un enlace de descarga
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'formData.json';  // Nombre del archivo a descargar
    document.body.appendChild(a);
    a.click(); // Hacer clic en el enlace para iniciar la descarga

    // Eliminar el enlace del DOM
    document.body.removeChild(a);
});
