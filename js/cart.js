var carritoArray = [];

function showCarritoList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let articulo = array[i];

        htmlContentToAppend += `
        <div class="card" style="background-color: #E5E4E2;">
  <div class="row p-2">
    <div class="col-md-4">
    
    <img src="` + articulo.src + `" alt="` + articulo.name + `" width="256px" height="156px">
    </div>
    
    <div class="col ml-5">
    <div class="row">
        <div class="col-2></div>
        <div class="col>
      <div class="card-body">
        <h3 class="card-title"> <strong>` + articulo.name + `</strong></h3>
        <p class="card-text"> Precio unitario ` + articulo.currency + articulo.unitCost + `<br>` + ` Cantidad <input type="number" id="cantidadArticulo` + i + `" value="` + articulo.count + `" min="0" max="100" step="1"/></p>
        <p class="card-text"><small class="text-muted"> subtotal: ` + (articulo.unitCost * articulo.count) + `</small></p>
      </div>
    </div>
  </div>
</div>
</div>
</div><br>`

    }
    document.getElementById("carrito").innerHTML = htmlContentToAppend;
}


function showListaCarrito(array) {

    let lista = "<br>";
    for (let i = 0; i < array.length; i++) {
        let articulo = array[i];

        lista += `-` + articulo.name + ` ` + articulo.unitCost * document.getElementById("cantidadArticulo" + i).value + `<br><br>`

    }

    lista += `<hr class="raya">`

    document.getElementById("listaCompras").innerHTML = lista;
}

function sumaCarrito(array) {


    var total = 0;
    for (let i = 0; i < array.length; i++) {
        let articulo = array[i];
        if (articulo.currency == "UYU") {

            total += (articulo.unitCost * document.getElementById("cantidadArticulo" + i).value) / 40;

        } else
            total += (articulo.unitCost * document.getElementById("cantidadArticulo" + i).value)







    }

    document.getElementById("listaCompras").innerHTML += `Total: ` + total;
}

//Obtengo la puntuación que puso el usuario
function getEnvio() {
    var elements = document.getElementsByName("options");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return parseInt(elements[i].value);
        }
    }
}

function mostrarEnvios() {
    let tipoEnvio = getEnvio();
    document.getElementById("mostrarEnvio").innerHTML = tipoEnvio;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL2).then(function(resultado) {
        if (resultado.status === "ok") {
            carritoArray = resultado.data;

            showCarritoList(carritoArray.articles);
            showListaCarrito(carritoArray.articles);
            sumaCarrito(carritoArray.articles);

        }

    });
});