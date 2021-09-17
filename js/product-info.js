uctsArray = [];
var comentariosArray = [];

function getRating() {
    var elements = document.getElementsByName("opcion");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return parseInt(elements[i].value);
        }
    }
}

function verComentario(id, comentario, rating) {
    localStorage.setItem('comentario', JSON.stringify({ idUsuario: id, comentario: comentario, rating: rating }));
    window.location = 'product-info.html';
}

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
        } else
            alert("Debe registrarse para comentar");

    });

}

function showProductos(array) {
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

    if (localStorage.getItem("comentario")) {

        let datos_comentario_json = localStorage.getItem("comentario");

        let datos_comentario = JSON.parse(datos_comentario_json);

        //Agrego a los otros comentarios:
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

    enviar +=
        `
        <hr><br><br>
        <h2>Deja tu comentario</h2> 
        <hr>   
    <div>

    
    <textarea name="texto" id="cuadro" cols="60" rows="5" placeholder="Escriba un comentario.."></textarea> <br>
                    
                    Puntuación: 
                        <input type="radio" id="huey" name="opcion" value="1" >
                        <label for="huey">1</label>
                        <input type="radio" id="dewey" name="opcion" value="2">
                        <label for="dewey">2</label>
                        <input type="radio" id="louie" name="opcion" value="3">
                        <label for="louie">3</label>
                        <input type="radio" id="louie" name="opcion" value="4">
                        <label for="louie">4</label>
                        <input type="radio" id="louie" name="opcion" value="5"checked>
                        <label for="louie">5</label><br>
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

            showProductos(productsArray);
        }

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