document.addEventListener("DOMContentLoaded", function(e) {

    //Primero verifico si hay algo guardado con ese nombre
    if (localStorage.getItem("datos_user")) {

        //Muestroel objeto en pantalla con DOM:
        document.getElementById("usuarioInfo").innerHTML =
            localStorage.getItem("datos_user");

    } else {
        document.getElementById("usuarioInfo").innerHTML = "No hay datos almacenados";
    }

})