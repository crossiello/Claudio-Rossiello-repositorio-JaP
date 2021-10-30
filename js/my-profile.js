function previewFile() {
    let preview = document.getElementById('foto');
    let file = document.getElementById("inputFile").files[0];

    let reader = new FileReader();

    //Constructor

    reader.onload = function() {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "img/avatar.jpg"
    }
}

function guardar() {

    let datos_profile = {
        nombres: document.getElementById("nombres").value,
        apellidos: document.getElementById("apellidos").value,
        edad: document.getElementById("edad").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        imagen: document.getElementById("foto").src
    }

    localStorage.setItem('profile', JSON.stringify(datos_profile));
    alert("Datos guardados con éxito");

}

function mostrar() {
    if (localStorage.getItem("profile")) {

        let profile_json = localStorage.getItem("profile");
        let profile = JSON.parse(profile_json);
        document.getElementById("nombres").value = profile.nombres;
        document.getElementById("apellidos").value = profile.apellidos;
        document.getElementById("edad").value = profile.edad;
        document.getElementById("email").value = profile.email;
        document.getElementById("telefono").value = profile.telefono;
        document.getElementById("foto").src = profile.imagen;
    } else {
        let datos_json = localStorage.getItem("datos_user");
        datos = JSON.parse(datos_json);
        document.getElementById("email").value = datos.email;
    }


}









//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    previewFile();
    mostrar();



});



//VALIDACIÓN

let form = document.getElementById('needs-validation');

form.addEventListener('submit', function(e) {
    if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        guardar();
        mostrar();

    }
    form.classList.add('was-validated');
})