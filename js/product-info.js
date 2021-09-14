//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e) {

    //Primero verifico si hay algo guardado con ese nombre
    if (localStorage.getItem('producto')) {

        //Muestro el objeto en pantalla con DOM:
        document.getElementById("claudio").innerHTML = localStorage.getItem('indiceProducto');

    } else {
        document.getElementById("claudio").innerHTML = "Ocurrio un error";
    }



});