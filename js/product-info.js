var productsArray = [];
var comentariosArray = [];

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
                
                
            </div>
            <p class="lead">` + producto.description + `</p>


        <h1 class="mb-1"></h1>
                <small class="text-muted">` + producto.soldCount + ` unidades vendidas</small>
            </div>
            <h3 style= "color: green">` + producto.currency + producto.cost + `</h3> 
            

                     
        
                           
                           
            <img src="` + producto.images[0] + `" alt="` + producto.description + `" width="269" height="164">
            <img src="` + producto.images[1] + `" alt="` + producto.description + `" width="269" height="164">             
            

                          
                           
            <img src="` + producto.images[2] + `" alt="` + producto.description + `" width="269" height="164">
            <img src="` + producto.images[3] + `" alt="` + producto.description + `" width="269" height="164">
                    
            

            
        
  
                        
                
        `


    document.getElementById("listado").innerHTML = contenido;
}

function showComentarios(array) {




    let comenta = "";
    let enviar = "";
    for (let i = 0; i < array.length; i++) {
        let comentario = array[i];

        comenta +=
            `
            
    <tr>
      <th scope="row">@` + comentario.user + `</th>
      <td>` + comentario.dateTime + `</td>
      <td>` + comentario.description + `</td>
      <td>` + comentario.score + `/5</td>
    </tr>
    



       
                  
                
        `
        document.getElementById("comentarios").innerHTML = comenta;


    }
    enviar +=
        `
        


    <div>

    <textarea name="texto" id="cuadro" cols="60" rows="5" placeholder="Escriba un comentario.."></textarea> <br>

                    <div></div>
                    <p>Puntuación:</p>
                        <input type="radio" id="huey" name="drone" value="huey" checked>
                        <label for="huey">1</label>

                        <input type="radio" id="dewey" name="drone" value="dewey">
                        <label for="dewey">2</label>

                        <input type="radio" id="louie" name="drone" value="louie">
                        <label for="louie">3</label>

                        <input type="radio" id="louie" name="drone" value="louie">
                        <label for="louie">4</label>

                        <input type="radio" id="louie" name="drone" value="louie">
                        <label for="louie">5</label>

                        <button type="submit">Enviar</button>
                    </div>


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
            }

        });
    });
});