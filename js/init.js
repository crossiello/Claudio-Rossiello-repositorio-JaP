const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCTS_URL2 = "https://crossiello.github.io/Claudio-Rossiello-repositorio-JaP/json-lista-autos.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_URL2 = "https://crossiello.github.io/Claudio-Rossiello-repositorio-JaP/json-productos.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const COMENTARIOS = "https://crossiello.github.io/Claudio-Rossiello-repositorio-JaP/comentarios.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_INFO_URL2 = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url) {
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}

//Función que borra al usuario del Local Storage
function borrarUsuario() {
    localStorage.removeItem("datos_user")
}

//Función para loguearse
function iniciarSesion() {

    window.location = 'index.html';
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function(e) {

    //Primero verifico si hay algo guardado con ese nombre
    if (localStorage.getItem("datos_user")) {

        datos_u_json = localStorage.getItem("datos_user");

        datos_u = JSON.parse(datos_u_json);



        //Muestro el objeto en pantalla con DOM:
        document.getElementById("usuarioInfo").innerHTML = `<div class="dropdown">
  <button class="btn btn-outline-success" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img id="imagenUsuario" src="img/usuario.png" width="50">
  ` + datos_u.email + ` 
  </button>
  <div class="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item text-light" href="cart.html">Ver mi carrito</a>
    <a class="dropdown-item text-light" href="my-profile.html">Mi perfil</a>
    <a class="dropdown-item text-light" href="index.html" onclick = borrarUsuario()>Cerrar sesión</a>
  </div>
</div>`;

    } else {
        document.getElementById("usuarioInfo").innerHTML = `<button class="btn btn-outline-success" type="button" onclick = iniciarSesion() >Iniciar sesión</a>`;
    }

})