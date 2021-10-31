function guardar() {
    let datos_u = {
        email: document.getElementById("email").value
    };

    let datos_u_json = JSON.stringify(datos_u);

    localStorage.setItem("datos_user", datos_u_json);
    window.location = "inicio.html";
}

//VALIDACIÓN

let form = document.getElementById('needs-validation');

form.addEventListener('submit', function(e) {
    if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        e.preventDefault();
        guardar();


    }
    form.classList.add('was-validated');
})

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {


});