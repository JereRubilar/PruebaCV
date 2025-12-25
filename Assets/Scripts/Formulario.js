const form = document.getElementById('form');
const nombre = document.getElementById('Nombre');
const email = document.getElementById('Email');
const mensaje = document.getElementById('Mensaje');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	if (checkInputs()) {
        alert("Tu mensaje se ha enviado!");
    }
});

function checkInputs() {
	const nombreValue = nombre.value.trim();
	const emailValue = email.value.trim();
	const mensajeValue = mensaje.value.trim();

    let allValid = true;
	
	if(nombreValue === '') {
		setErrorFor(nombre, 'Debes ingresar tu nombre');
        allValid = false;
	} else {
		setSuccessFor(nombre);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Debe ingresar un email');
        allValid = false;
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Email no valido');
        allValid = false;
	} else {
		setSuccessFor(email);
	}

    if(mensajeValue === '') {
        setErrorFor(mensaje, 'No puedes enviar un mensaje vacio');
        allValid = false;
    } else {
        setSuccessFor(mensaje);
    }

    return allValid;
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'Campos error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'Campos success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}