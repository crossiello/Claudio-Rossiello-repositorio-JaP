var productsArray = [];

function showProductos(array) {
    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let producto = array[i];

        contenido +=
            `
        <a href="category-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                
                    <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                    <h3 style="color : green">` + producto.currency + " " + producto.cost `</h3>
                    
                </div>
                
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">

                                        
                        <h4 class="mb-1">` + producto.name + `</h4>
                        <small class="text-muted">` + producto.soldCount + ` artículos</small>
                    </div>
                    <p class="mb-1">` + producto.description + `</p>
                    
                </div>
            </div>
        </a>
        `

    }
    document.getElementById("listado").innerHTML = contenido;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    getJSONData(PRODUCTS_URL).then(function(resultado) {
        if (resultado.status === "ok") {
            productsArray = resultado.data;

            showProductos(productsArray);
        }

    });

});