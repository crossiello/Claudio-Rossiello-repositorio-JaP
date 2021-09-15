//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e) {

    if (localStorage.getItem("producto")) {

        datos_p_json = localStorage.getItem("producto");

        datos_p = JSON.parse(datos_p_json);

        //Muestro el objeto en pantalla con DOM:
        document.getElementById("claudio").innerHTML = datos_p.idProducto;

    } else {
        document.getElementById("usuarioInfo").innerHTML = "Ingresar usuario";
    }

})