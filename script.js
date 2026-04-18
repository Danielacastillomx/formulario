const form = document.getElementById('google-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.querySelector('.btn-text');
const loader = document.getElementById('loader');
const statusMessage = document.getElementById('status-message');

// 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇
// ¡IMPORTANTE! Reemplaza el texto de abajo con tu URL de Google Apps Script
const scriptURL = 'https://script.google.com/macros/s/AKfycbz51bZV_PijRsDe8FmQcu5DcBrt21xZOs5JxqCigRmaeZ9CCQNyNn3RGpIBxCFUBe36/exec';
// 👆 👆 👆 👆 👆 👆 👆 👆 👆 👆 👆 👆 👆 👆 👆 👆 👆 👆 👆 👆

form.addEventListener('submit', e => {
    e.preventDefault(); // Evita que la página se recargue
    
    // Cambiar estado del botón a modo "Cargando"
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    loader.style.display = 'block';
    
    // Ocultar mensajes anteriores
    statusMessage.style.display = 'none';
    statusMessage.className = 'status-message';

    // Capturar todos los datos del formulario
    const formData = new FormData(form);

    // Enviar datos a Google Sheets
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            // Mostrar mensaje de éxito
            statusMessage.textContent = '¡Datos enviados correctamente!';
            statusMessage.classList.add('success');
            form.reset(); // Limpiar el formulario
        })
        .catch(error => {
            // Mostrar mensaje de error en caso de fallo
            console.error('Error!', error.message);
            statusMessage.textContent = 'Hubo un error al enviar. Por favor, intenta de nuevo.';
            statusMessage.classList.add('error');
        })
        .finally(() => {
            // Devolver el botón a su estado normal
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            loader.style.display = 'none';
        });
});
