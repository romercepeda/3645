function GeteCatgorias() {
    /*var xmlHt = new XMLHttpRequest()
    xmlHt.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //Recibo la respueta e interpreto..
            var respuesta = this.response;
        }
    };
    xmlHt.open("get", "http://www.etnassoft.com/api/v1/get/?get_categories=all&callback=?", true);
    xmlHt.send();*/

    //$.getJSON('http://www.etnassoft.com/api/v1/get/?get_categories=all&callback=?',Resultado);

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        async: false,
        url: "http://www.etnassoft.com/api/v1/get/?get_categories=all",//?CountryName=Argentina
        success: Resultado,
        error: function (a, b, c) {
          // alert("Error..")
        }
    });
}

function Resultado(res) {
    debugger;
    var categorias = "";
    res.forEach(function (item, k) {
        categorias += "<li id='" + item.name + "' data-id='" + item.category_id +
            "' data-name='" + item.name +
            "' data-nicename='" + item.nicename +
            "' onclick='ObtenerLibroPorCategoria(\"" + item.name + "\")'>" +
            item.name + "<ol id='" + item.name + "'></ol></li>"
        $("#Categorias").html(categorias);
        //$("#Categorias").selectable();
    })
}
GeteCatgorias();
function ObtenerLibroPorCategoria(nameLi) {
    debugger
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        async: false,
        miVariable: nameLi,
        url: "http://www.etnassoft.com/api/v1/get/?category=" + nameLi,
        success: ResultadoLibros,
        error: function (a, b, c) {
            // alert("Error..")
        }
});

//Ò
    //$.getJSON("http://www.etnassoft.com/api/v1/get/?category=" + nameLi + "&callback=?", ResultadoLibros);
}
function ResultadoLibros(result) {
    //Mostrar Libros
    $("[data-id=" + this.miVariable + "]")[0].....
}
//Obtener Libros por categoria.