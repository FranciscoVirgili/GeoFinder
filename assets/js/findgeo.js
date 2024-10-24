const swiper = new Swiper('.slider-wrapper', {

    loop: true,
    grabCursor: true,
    spaceBetween: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
      dynamicBullets: true,

    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
// Responsive Breakpoints
  });


// Capturar datos Formulario Find Geo
document.getElementById('formFindGeo').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío por defecto del formulario
    console.log('Formulario no enviado automáticamente');
    // Capturar valores de los inputs
    const formData = {
        name: document.getElementById('geoName').value,
        email: document.getElementById('geoEmail').value,
        phone: document.getElementById('geoPhone').value,
        location: document.getElementById('geoLocation').value,
        services: Array.from(document.querySelectorAll('input[name="services"]:checked')).map(cb => cb.value),
        budget: document.getElementById('geoBudget').value,
        availability: document.getElementById('geoAvailability').value,
        start_date: document.getElementById('startDate').value,
        contact_preference: document.querySelector('input[name="contact_preference"]:checked').value,
        comments: document.getElementById('comments').value
    };

    console.log(formData);

    // Convertir a JSON
    const jsonData = JSON.stringify(formData);
    
    // Mostrar JSON en consola
    console.log(jsonData);
});
    // Aquí es donde enviarías los datos a un servidor usando fetch
    /*
    fetch('https://tu-servidor.com/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
        body: jsonData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
});

*/