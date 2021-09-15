var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var buscar = undefined;



function verIndice(id) {
    //Primero verifico si hay algo guardado con ese nombre
    if (localStorage.getItem("producto")) {

        p_json = localStorage.getItem("producto");

        p = JSON.parse(p_json);

        //Muestro el objeto en pantalla con DOM:
        document.getElementById("usuarioInfo").innerHTML = p.idProducto;

    } else {
        document.getElementById("usuarioInfo").innerHTML = "Ingresar usuario";
    }
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let producto = currentProductsArray[i];



        if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount))) {

            if (buscar == undefined || producto.name.toLowerCase().indexOf(buscar) != -1 || producto.description.toLowerCase().indexOf(buscar) != -1) {

                htmlContentToAppend += `

                <a href="#" class="list-group-item list-group-item-action" onclick = verProducto(` + producto.id + `)>
            
                <div class="row">
                    <div class="col-3">
                    
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