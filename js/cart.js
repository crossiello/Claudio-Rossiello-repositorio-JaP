var carritoArray = [];

function showCarritoList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let articulo = array[i];

        htmlContentToAppend += articulo.name + `<br>` + `<input type="number" value="` + articulo.count + `" min="0" max="100" step="1"/>` + `<br>` + articulo.unitCost + `<br>` + articulo.currency + `<br>` + `subtotal: ` + (articulo.unitCost * articulo.count) + `<img src="` + articulo.src + `" alt="` + articulo.name + `" width="256px" height="156px"> <hr><br><br>`

    }
    document.getElementById("carrito").innerHTML = htmlContentToAppend;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL2).then(function(resultado) {
        if (resultado.status === "ok") {
            carritoArray = resultado.data;

            showCarritoList(carritoArray.articles);

        }

    });
});