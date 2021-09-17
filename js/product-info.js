var productsArray = [];
var comentariosArray = [];

//Obtengo la puntuación que puso el usuario
function getRating() {
    var elements = document.getElementsByName("opcion");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return parseInt(elements[i].value);
        }
    }
}
//Guardo los datos del comentario ingresado
function verComentario(id, comentario, rating) {
    localStorage.setItem('comentario', JSON.stringify({ idUsuario: id, comentario: comentario, rating: rating }));
    window.location = 'product-info.html';
}

//Funcionalidad del botón. Primero verifica que esté todo bien y luego guarda los datos para mostrarlos
function enviarComentario() {
    document.getElementById("boton").addEventListener("click", function() {

        let inputComentario = document.getElementById("cuadro");
        let puntuacion = getRating();
        let datos_c_json = localStorage.getItem("datos_user");
        let datos_c = JSON.parse(datos_c_json);
        let usuarioC = datos_c.email;
        let opcionesCompletas = true;

        if (inputComentario.value === "") {
            inputComentario.classList.add("invalid");
            opcionesCompletas = false;
        } else {
            inputComentario.classList.remove("invalid");
        }

        if (datos_c.email != "") {

            if (opcionesCompletas) {
                verComentario(usuarioC, inputComentario.value, puntuacion)

                alert("Gracias por enviar su comentario");
            } else {
                alert("Debe ingresar un comentario");
            }
        } else {
            alert("Debe registrarse para comentar");
            inputComentario.classList.remove("invalid");
        }

    });

}

//Función que muestra el producto
function showProducto(array) {
    let contenido = "";
    p_json = localStorage.getItem("producto");
    p = JSON.parse(p_json);
    indice = p.idProducto;
    let producto = array[indice];

    contenido +=
        `
        <div class="text-center p-4">
                <h1 class="display-3"><strong>` + producto.name + `</strong></h1>

                <br><hr>
         
            </div>
            <p class="lead">` + producto.description + `</p>
        <h1 class="mb-1"></h1>
                
            </div>
            <br>
            <h3 style= "color: black">Llevalo por ` + producto.currency + producto.cost + `</h3> <hr><br>
            <h2>Galería</h2>
            <hr>        
                           
            <img src="` + producto.images[0] + `" alt="` + producto.description + `" width="269" height="164">
            <img src="` + producto.images[1] + `" alt="` + producto.description + `" width="269" height="164">             
            <img src="` + producto.images[2] + `" alt="` + producto.description + `" width="269" height="164">
            <img src="` + producto.images[3] + `" alt="` + producto.description + `" width="269" height="164">
                     
                
        `
    document.getElementById("listado").innerHTML = contenido;
}

//Función que muestra los comentarios

function showComentarios(array) {

    let comenta = "<h2>Opiniones</h2>";
    let enviar = "";
    for (let i = 0; i < array.length; i++) {
        let comentario = array[i];
        comenta +=
            `            
    <tr>
      <th scope="row">@` + comentario.user + `</th>
      <td>` + comentario.description + `</td>
      <td><span class="fa fa-star checked"></span>`

        for (let i = 2; i <= 5; i++) {

            if (i <= comentario.score) {
                comenta +=
                    `<span class="fa fa-star checked"></span>`
            } else if (i >= comentario.score) {
                comenta +=
                    `<span class ="fa fa-star"></span>`
            }
        }
    }
    //Si hay otro comentario ingresado, lo agrega
    if (localStorage.getItem("comentario")) {

        let datos_comentario_json = localStorage.getItem("comentario");

        let datos_comentario = JSON.parse(datos_comentario_json);


        comenta +=
            `            
    <tr>
      <th scope="row">@` + datos_comentario.idUsuario + `</th>
      <td>` + datos_comentario.comentario + `</td>
      <td><span class="fa fa-star checked"></span>`

        for (let i = 2; i <= 5; i++) {

            if (i <= datos_comentario.rating) {
                comenta +=
                    `<span class="fa fa-star checked"></span>`
            } else if (i >= datos_comentario.rating) {
                comenta +=
                    `<span class = "fa fa-star"></span>`

            } else {
                comenta +=
                    `</tr>`
            }
        }
    }

    comenta +=


        document.getElementById("comentarios").innerHTML = comenta;

    //Agrega el formulario para envíar

    enviar +=
        `
        <hr><br><br>
        <h2>Deja tu comentario</h2> 
        <hr>   
    <div>

    
    <textarea name="texto" id="cuadro" cols="60" rows="5" placeholder="Escriba un comentario.."></textarea> <br>
                    
                    Puntuación: 
                    <div class="star-rating">
                    <input id="star-5" type="radio" name="opcion" value="5"  />
                    <label for="star-5" title="5 stars">
                      <i class="active fa fa-star"></i>
                    </label>
              
                    <input id="star-4" type="radio" name="opcion" value="4"/>
                    <label for="star-4" title="4 stars">
                      <i class="active fa fa-star"></i>
                    </label>
              
                    <input id="star-3" type="radio" name="opcion" value="3"/>
                    <label for="star-3" title="3 stars">
                      <i class="active fa fa-star"></i>
                    </label>
              
                    <input id="star-2" type="radio" name="opcion" value="2" />
                    <label for="star-2" title="2 stars">
                      <i class="active fa fa-star"></i>
                    </label>
              
                    <input id="star-1" type="radio" name="opcion" value="1" checked/>
                    <label for="star-1" title="1 star">
                      <i class="active fa fa-star"></i>
                    </label>
                    
                  </div>
                        <button type="submit" id="boton" class="btn btn-primary btn-lg">Enviar</button>
                    
                    
                    `
    document.getElementById("enviar").innerHTML = enviar;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    getJSONData(PRODUCT_INFO_URL2).then(function(resultado) {
        if (resultado.status === "ok") {
            productsArray = resultado.data;

            showProducto(productsArray);
        }
        //Se usa .then para que espere a que se complete la función anterior
    }).then(function(e) {

        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultado) {
            if (resultado.status === "ok") {
                comentariosArray = resultado.data;

                showComentarios(comentariosArray);
                enviarComentario();
            }

        });

    });
});