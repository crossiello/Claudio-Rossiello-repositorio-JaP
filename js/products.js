const MENOR_PRECIO = "Menor Precio";
const MAYOR_PRECIO = "Mayor Precio";
const MAS_VENDIDOS = "Más vendidos";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var buscar = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === MENOR_PRECIO) {
        result = array.sort(function(a, b) {
            if (parseInt(a.cost) < (parseInt(b.cost))) { return -1; }
            if (parseInt(a.cost) > (parseInt(b.cost))) { return 1; }
            return 0;
        });
    } else if (criteria === MAYOR_PRECIO) {
        result = array.sort(function(a, b) {
            if (parseInt(a.cost) > (parseInt(b.cost))) { return -1; }
            if (parseInt(a.cost) < (parseInt(b.cost))) { return 1; }
            return 0;
        });
    } else if (criteria === MAS_VENDIDOS) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}
//Guarda el id que paso por parámetro en Local Storage y redirige 
function verProducto(id) {
    localStorage.setItem('producto', JSON.stringify({ idProducto: id }));
    window.location = 'product-info.html';
}

//En el showProductsList agrego la etiqueta a, que al ser clickeada, apicla la función verProducto

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let producto = currentProductsArray[i];



        if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount))) {

            if (buscar == undefined || producto.name.toLowerCase().indexOf(buscar) != -1 || producto.description.toLowerCase().indexOf(buscar) != -1) {

                htmlContentToAppend += `<div class="col-lg-6 my-2">

                <a href="#" class="list-group-item list-group-item-action" onclick = verProducto(` + producto.id + `)>
            
                <div class="row">
                    <div class="col-5">
                    
                        <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                        <h3 style= "color: green">` + producto.currency + producto.cost + `</h3> 
                    </div>
                    
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
    
                                            
                            <h4 class="mb-1">` + producto.name + `</h4>
                            <small class="text-muted">` + producto.soldCount + ` unidades vendidas</small>
                        </div>
                        <p class="mb-1">` + producto.description + `</p>

                        
                        
                    </div>
                </div>

                </a>
                </div>
            `
            }

        }

        document.getElementById("listado").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL2).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(MENOR_PRECIO, resultObj.data);
        }
    });


    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(MENOR_PRECIO);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(MAYOR_PRECIO);
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowProducts(MAS_VENDIDOS);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        //de productos 
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showProductsList();
    });

    document.getElementById("buscador").addEventListener('input', function() {
        buscar = document.getElementById("buscador").value.toLowerCase();
        showProductsList();


    });







});