var producto;

function mostrarProducto(producto, comentarios) {
    let info = "";
    let imgs = "";
    let comments = "<hr>";

    info += `   <h2>${producto.name} </h2>;
                <p>${producto.description}</p>`;

    document.getElementById("claudio"), innerHTML = info;
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL2).then(function(result) {
        if (result.status === "ok") {

            result.data.forEach(product => {
                if (product.id == JSON.parse(localStorage.getItem('producto')).idProducto) {
                    producto = product;
                    mostrarProducto(producto);
                }

            });
        }
    });
});