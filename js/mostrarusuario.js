document.addEventListener("DOMContentLoaded", function(e) {

    //Primero verifico si hay algo guardado con ese nombre
    if (localStorage.getItem("datos_user")) {

        //Muestro el objeto en pantalla con DOM:
        document.getElementById("usuarioInfo").innerHTML =
            localStorage.getItem("datos_user");

    } else {
        document.getElementById("usuarioInfo").innerHTML = "Ingresar usuario";
    }

})