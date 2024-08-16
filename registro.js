const registroForm = document.getElementById('registro-form');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

registroForm.addEventListener('submit', function (event) {
    event.preventDefault(); 

    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (nombre === "" || email === "" || password === "" || confirmPassword === "") {
        Swal.fire({
            icon: 'error',
            title: 'Campos Incompletos',
            text: 'Por favor, completa todos los campos.'
        });
        return;
    }

    if (!validarEmail(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Correo Inválido',
            text: 'Por favor, ingresa un correo electrónico válido.'
        });
        return;
    }

    if (password.length < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña Corto',
            text: 'La contraseña debe tener al menos 6 caracteres.'
        });
        return;
    }

    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseñas No Coinciden',
            text: 'Las contraseñas no coinciden. Inténtalo de nuevo.'
        });
        return;
    }

    const usuario = {
        nombre: nombre,
        email: email,
        password: password
    };

    guardarUsuario(usuario);

    Swal.fire({
        icon: 'success',
        title: '¡Registro Exitoso!',
        text: 'Redirigiendo a la página principal...',
        timer: 2500,  // 
        timerProgressBar: true
    }).then(() => {
        window.location.href = "/index.html";
    });
});

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function guardarUsuario(usuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}
