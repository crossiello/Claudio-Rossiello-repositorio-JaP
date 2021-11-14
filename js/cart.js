var carritoArray = [];

//Obtengo el envío que eligió el usuario
function getEnvio() {
    var elements = document.getElementsByName("options");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return parseInt(elements[i].value);
        }
    }
}

// Función que realiza la suma final y la refleja en pantalla

function calcTotal() {
    let total = 0;
    let lista = "<br>";
    let subs = document.getElementsByClassName("subtotal");
    let names = document.getElementsByClassName("nombreArticulo");
    let cantidades = document.getElementsByClassName("cantidad");
    let monedas = document.getElementsByClassName("moneda");
    for (let i = 0; i < subs.length; i++) {
        if (cantidades[i].value != 0) {
            if (monedas[i].innerHTML == "USD") {
                lista += `-` + names[i].innerHTML + ` x` + cantidades[i].value + `<br> USD` + subs[i].innerHTML + `<br><br>`;

                total += parseInt(subs[i].innerHTML);
            } else {
                lista += `-` + names[i].innerHTML + ` x` + cantidades[i].value + `<br> UYU` + subs[i].innerHTML + `<br><br>`;

                total += parseInt(subs[i].innerHTML) / 40;
            }

        }
    }
    lista += `<strong>-Costo envío</strong> <br> USD ` + (total / 100) * getEnvio() + ` (` + getEnvio() + `% )<hr class="raya">`;
    total = total + ((total / 100) * getEnvio());
    document.getElementById("listaCompras").innerHTML = lista;
    document.getElementById("listaCompras").innerHTML += `<h3>USD ` + total + `</h3>`;

}

// Función que calcula cada sub total

function calcSubTotal(precio, i) {
    let cantidad = parseInt(document.getElementById(`cantidadArticulo` + i).value);
    subtotal = precio * cantidad;
    document.getElementById(`subtotalArticulo` + i).innerHTML = subtotal;
    calcTotal();


}



// Función que muestra los productos seleccionados en el carrito

function showCarritoList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let articulo = array[i];

        htmlContentToAppend += `
        <div class="card text-center" style="background-color: #E5E4E2;">
  <div class="row p-2">
    <div class="col-md-4">
    
    <img src="` + articulo.src + `" alt="` + articulo.name + `" width="256px" height="156px">
    </div>
    
    <div class="col ml-5">
    <div class="row">
        <div class="col-2></div>
        <div class="col>
      <div class="card-body">
        <h3 class="nombreArticulo"> <strong>` + articulo.name + `</strong></h3>
        <p class="card-text"> Precio unitario ` + articulo.currency + articulo.unitCost + `<br>` + ` Cantidad <input type="number" onchange="calcSubTotal(` + articulo.unitCost + `,` + i + `)" id="cantidadArticulo` + i + `" class="cantidad" value="` + articulo.count + `" min="0" max="100" step="1"/></p>
        <h5 > Subtotal: <span class="moneda">` + articulo.currency + `</span><span class="subtotal" id="subtotalArticulo` + i + `">` + (articulo.unitCost * articulo.count) + `</span> </h5>
      </div>
    </div>
  </div>
  </div>
  </div>

<div class="row m-3">
<div class="col-xs-6 col-md-10"></div>
<div class="col-xs-4 col-md-2"><button onclick="eliminar(` + i + `)">  <img id="papelera" src="img/papelera.png" width="40"> </button> </div> 
</div>
</div>
</div>
</div>
</div>
</div>

<br>
 `

    }
    document.getElementById("carrito").innerHTML = htmlContentToAppend;
    calcTotal();
}

//Obtengo el array de productos

getJSONData(CART_INFO_URL2).then(function(resultado) {
    if (resultado.status === "ok") {
        carritoPrimario = resultado.data.articles;
    }

});

//Función que elimina al artículo seleccionado
function eliminar(index) {
    if (carritoPrimario.length > 1) {
        let eliminado = carritoPrimario.splice((index - 1), 1);
        showCarritoList(eliminado);

    } else {
        document.getElementById("carrito").innerHTML = `<h2 class="text-center"> No ha seleccionado ningún producto 
        <br><br> <a class="text-light bg-dark" href="products.html">¡Quiero comprar!</a></h2><br><br>`;
        document.getElementById("listaCompras").innerHTML = "";
    }





}


// Obtengo la forma de pago
function getPago() {
    var elements = document.getElementsByName("pago");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return elements[i].id;
        }
    }
}

//VALIDACIÓN

let form = document.getElementById('needs-validation');
let numeroCredito = document.getElementById("numeroCredito");
let codigo = document.getElementById("codigo");
let fechaV = document.getElementById("fechaV");
let cuentaNumero = document.getElementById("cuentaNumero");



form.addEventListener('submit', function(e) {
    if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        if (getPago() == "credito" && numeroCredito.value != "" && codigo.value != "" && fechaV.value != "") {
            e.preventDefault();
            alert("Gracias por su compra");
            window.location = "inicio.html";
        } else if (getPago() == "transferencia" && cuentaNumero.value != "") {
            e.preventDefault();
            alert("Gracias por su compra");
            window.location = "inicio.html";
        } else {
            e.preventDefault();
            e.stopPropagation();
            alert("Debe seleccionar un método de pago correcto");
        }


    }
    form.classList.add('was-validated');
})


function radioCredito() {
    document.getElementById("numeroCredito").disabled = false;
    document.getElementById("codigo").disabled = false;
    document.getElementById("fechaV").disabled = false;
    document.getElementById("cuentaNumero").disabled = true;
}

function radioTransferencia() {
    document.getElementById("cuentaNumero").disabled = false;
    document.getElementById("numeroCredito").disabled = true;
    document.getElementById("codigo").disabled = true;
    document.getElementById("fechaV").disabled = true;
}








//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL2).then(function(resultado) {
        if (resultado.status === "ok") {
            carritoArray = resultado.data.articles;

            showCarritoList(carritoArray);


        }

    });
});