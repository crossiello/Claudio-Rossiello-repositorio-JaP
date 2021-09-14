//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e) {

    if (localStorage.getItem("producto")) {

        datos_u_json = localStorage.getItem("producto");

        datos_u = JSON.parse(datos_u_json);

        //Muestro el objeto en pantalla con DOM:
        document.getElementById("claudio").innerHTML = datos_u.indexProducto;

    } else {
        document.getElementById("usuarioInfo").innerHTML = "Ingresar usuario";
    }

})