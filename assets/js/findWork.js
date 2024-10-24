document.getElementById("formFindWork").addEventListener('submit', function (event){
    event.preventDefault(); // Evitar el envío tradicional del formulario

    const formFindWordData = {
        fullName: document.getElementById("fullNameFW").value,
        email: document.getElementById("emailFW").value,
        phone: document.getElementById("phoneFW").value,
        location: document.getElementById("locationFW").value,
        service: Array.from(document.querySelectorAll('input[name="services"]:checked')).map(cb => cb.value),
        experience: document.getElementById("experienceFW").value,
        certifications: document.getElementById("certificationsFW").value,
        availability: document.getElementById("availabilityFW").value,
        hourRate: document.getElementById("hourRateFW").value,
        portfolio: document.getElementById("portfolioFW").value,
        aditionalInformation: document.getElementById("additionalInfoFW").value,
    }

    console.log(formFindWordData)

     // Convertir a JSON
     const jsonData = JSON.stringify(formFindWordData);
    
     // Mostrar JSON en consola
     console.log(jsonData);

});