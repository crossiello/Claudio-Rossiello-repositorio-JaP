//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    document.getElementById("boton").addEventListener("click", function() {

        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;

        if (inputEmail.value === '') {
            inputEmail.classList.add("invalid");
            camposCompletos = false;
        } else {
            inputEmail.classList.remove("invalid");
        }

        if (inputPassword.value === '') {
            inputPassword.classList.add("invalid");
            camposCompletos = false;
        } else {
            inputPassword.classList.remove("invalid")
        }

        if (camposCompletos) {
            window.location = 'inicio.html';
        } else {
            alert("Debes ingresar los datos")
        }
    });

});


function guardarDatos() {

    //Creo un objeto que contega los datos a guardar:
    let datos_u = {
        email: document.getElementById("inputEmail").value
    };

    let datos_u_json = JSON.stringify(datos_u);


    localStorage.setItem("datos_user", datos_u_json);
}