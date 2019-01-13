function GetCategorias() {
    $.getJSON("http://www.etnassoft.com/api/v1/get/?category=all&callback=?", GetCategoriasResultado);
}
function GetCategorias2() {
    $.ajax({
        type: "get",
        dataType: "jsonp",
        url: "http://www.etnassoft.com/api/v1/get/?get_categories=all",
        success: GetCategoriasResultado,
    });
}
function GetCategoriasResultado(resultado) {
    var categorias = "";
    resultado.forEach(function (item, k) {
        categorias += "<li data-id='" + item.category_id + "' data-name='" + item.name + "' data-nicename='" + item.nicename + "'>" + item.name + "</li>"
        $("#Categorias").html(categorias);
        $("#Categorias").selectable();
    })
    
}

$(document).ready(function () {
    GetCategorias2();
})
