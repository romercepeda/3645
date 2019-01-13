var express = require("express");
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


/*
Estos son las rutas, notas q / es la raiz se ejecuta cuando llames por ejemplo "http:\\localhost:8080" 

Y por /obtenerTodos es cuando llames "http:\\localhost:8080\obtenerTodos".

Ejemplo cuando se hace una llamado a la ruta anterior mente mencionada, 
se va a procesar el codigo que enmarca el bloque entre las llaves {}.
Para detallar "app.get("/obtenerTodos", function (req, resp) {":
app => es la instancia del servidor express en nodeJs. Para este ejemplo debes instalar express como componente adicional en nodeJs.
.get => get es el protocolo a recibir. Si no conocen busquen documentacion sobre los verbos del protocolo http.
function (req, resp) => es la funcion a ejecutar cuando la peticion (request) sea "get" y hacia el destino "/obtenertodos".
dicha funcion recibe dos parametros (siempre) el request y el response

Ahora bien en el response es donde vas a almacenar la respuesta que 
deseas retornar.
Si es un vector de objetos (por ejemplo una lista de estudiantes. 
Deberias crearlo algo asi:
var students = []; //Creas el vector.
var studen01 = {id: 01, name: "Maria Jose", LastName: "Barreto;)", age:18}; //Creo el alumno 
var studen02 = {id: 01, name: "Rafaelito", LastName: "Barreto;)", age:12}; //Creo otro  alumno 
students.push(studen01,studen02); //Agrego los alumnos al vector;

var respuesta = JSON.stringify(students); //Esto es importante convierte el vector y su contenido en un JSON (leer que es un json)
//por ultimo almacenas la respuesta en el "response" que es el 2º parametro que recibe la funcion.
resp.json(respuesta);
*/

//Retorna toda la musica del sistema.
app.get("/obtenerTodos", function (req, resp) {
    var json = JSON.stringify(datos)
    resp.setHeader("content-type", "application/json");
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.json(json);
});

app.post("/enviarNotas", function (req, resp) {
    console.log(req.body);
    //Recibe {dni:222, notas:[]}
    /*var notas = JSON.parse(req.body);
    console.log("Notas recibidas", notas);
    //var json = JSON.stringify(datos)
    resp.setHeader("content-type", "application/json");
    resp.setHeader("Access-Control-Allow-Origin", "*");
    */
    resp.json("");
});

//Retorna toda la musica segun el año recibido.
app.get("/obtenerPorAnio", function (req, resp) {
    var json = datos.filter(function (item) {
        return (item.Year == req.body.Year);
    });
    resp.setHeader("content-type", "application/json");
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.json(json);
});

app.get("/obtenerPorPrametro", function (req, resp) {

    resp.setHeader("content-type", "application/json");
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.json(obtenerPorParametro(req.body.miParametro));
});

app.get("/peoples", function (req, resp) {

    resp.setHeader("content-type", "application/json");
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.json(request2());
});



function request2(url, cb) {

    url = "https://swapi.co/api/people/?format=json";
    console.log("entro 1");
    //var oReq;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var oReq = new XMLHttpRequest();
    function listener(e) {
        console.log("entro 4");
        if (oReq.readyState != 4 && e.type !== 'load') return;
        if (oReq.status && oReq.status != 200) {
            //this will be the error handler
            console.log("entro 5 error");
            console.log("entro 5.1 oReq.status:", oReq.status);
        } else {
            console.log("entro 6" + oReq.responseText);
            //cb(JSON.parse(oReq.responseText));
        }
    }
    // Use XDomainRequest if it's available (to support IE<10)

    console.log("entro 2");

        oReq = new XMLHttpRequest();
        oReq.open('get', url, false);
        oReq.setRequestHeader('User-Agent', 'swapi-javascript');
        oReq.setRequestHeader('Accept', 'application/json');
    
    oReq.onload = listener;

    // Wrap in a 0 millisecond timeout.
    // XDomainRequests appear to randomly fail unless kicked into a new scope.
    setTimeout(function () {
        oReq.send();
        console.log("entro 3 termino");
    }, 0);
}


//Recibi un id de musica con la calificiacion 1/-1
//Retorna la musica editada
app.post("/enviarCalificacion", function (req, resp) {
    //console.log('body: ' + req.body);//Validar..
    console.log('body: ' + JSON.stringify(req.body));
    var musica = req.body;
    var musicaCalificada = CalificarMusica(musica.id, parseInt(musica.calificacion));
    resp.setHeader("content-type", "application/json");
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.json(musicaCalificada);
});


app.listen(8080, function () { console.log("El api esta corriendo"); });

var CalificarMusica = function (id, calificacion) {
    var item_editado = datos.filter(function (item) {
        if (item.Id == id) {
            item.calificacion = (item.calificacion == undefined) ? calificacion : item.calificacion + calificacion;
            return item;
        }
    });
    return item_editado;
}
var calificaciones = [];//Array de objetos con {dni: entero, calificacion: decimal};
var datos = [{ "Id": 1, "nombre": "Alfredo", "apellido": "Castro", "TipoDocumento": "DNI", "dni": "33456456", "email": "AlfredoCastro@gemail.com", "Edad": 34 }, { "Id": 2, "nombre": "Alejandra", "apellido": "Cepeda", "TipoDocumento": "CUIL", "dni": "20334564344", "email": "AlejandraCepeda@gemail.com", "Edad": 54 }, { "Id": 3, "nombre": "Carolina", "apellido": "Duarte", "TipoDocumento": "CUIL", "dni": "20345234534", "email": "CarolinaDuarte@gemail.com", "Edad": 23 }, { "Id": 4, "nombre": "Pedro", "apellido": "Rincon", "TipoDocumento": "DNI", "dni": "87654345", "email": "PedroRincon@gemail.com", "Edad": 67 }, { "Id": 5, "nombre": "Juan", "apellido": "Gonzalez", "TipoDocumento": "DNI", "dni": "98678543", "email": "JuanGonzalez@gemail.com", "Edad": 45 }, { "Id": 6, "nombre": "Pablo", "apellido": "Urdaneta", "TipoDocumento": "DNI", "dni": "13543565", "email": "PabloUrdaneta@gemail.com", "Edad": 85 }, { "Id": 7, "nombre": "Esthefany", "apellido": "Carozella", "TipoDocumento": "DNI", "dni": "98354689", "email": "EsthefanyCarozella@gemail.com", "Edad": 23 }, { "Id": 8, "nombre": "Diego", "apellido": "Garciollo", "TipoDocumento": "DNI", "dni": "23435678", "email": "DiegoGarciollo@gemail.com", "Edad": 56 }, { "Id": 9, "nombre": "Christian", "apellido": "Delgado", "TipoDocumento": "DNI", "dni": "34567985", "email": "ChristianDelgado@gemail.com", "Edad": 44 }, { "Id": 10, "nombre": "Silvina", "apellido": "Merchot", "TipoDocumento": "DNI", "dni": "98765432", "email": "SilvinaMerchot@gemail.com", "Edad": 33 }, { "Id": 11, "nombre": "Silvia", "apellido": "Urdaneta", "TipoDocumento": "DNI", "dni": "77654234", "email": "SilviaUrdaneta@gemail.com", "Edad": 87 }, { "Id": 12, "nombre": "Eucaris", "apellido": "Carozella", "TipoDocumento": "DNI", "dni": "77456345", "email": "EucarisCarozella@gemail.com", "Edad": 98 }, { "Id": 13, "nombre": "Nelso", "apellido": "Garciollo", "TipoDocumento": "CUIL", "dni": "11345345", "email": "NelsoGarciollo@gemail.com", "Edad": 67 }, { "Id": 14, "nombre": "Cristina", "apellido": "Delgado", "TipoDocumento": "CUIL", "dni": "20786574533", "email": "CristinaDelgado@gemail.com", "Edad": 56 }, { "Id": 15, "nombre": "Diego", "apellido": "Garciollo", "TipoDocumento": "PASAPORTE", "dni": "8756273", "email": "DiegoGarciollo@gemail.com", "Edad": 43 }, { "Id": 16, "nombre": "Christian", "apellido": "Delgado", "TipoDocumento": "CUIT", "dni": "2058674673", "email": "ChristianDelgado@gemail.com", "Edad": 25 }, { "Id": 17, "nombre": "Silvina", "apellido": "Merchot", "TipoDocumento": "LC", "dni": "984663", "email": "SilvinaMerchot@gemail.com", "Edad": 74 }, { "Id": 18, "nombre": "Carolina", "apellido": "Urdaneta", "TipoDocumento": "CUIL", "dni": "20567456569", "email": "CarolinaUrdaneta@gemail.com", "Edad": 45 }, { "Id": 19, "nombre": "Pedro", "apellido": "Carozella", "TipoDocumento": "PASAPORTE", "dni": "24547489", "email": "PedroCarozella@gemail.com", "Edad": 12 }, { "Id": 20, "nombre": "Juan", "apellido": "Castro", "TipoDocumento": "CUIT", "dni": "2045648746", "email": "JuanCastro@gemail.com", "Edad": 45 }, { "Id": 21, "nombre": "Diego", "apellido": "Cepeda", "TipoDocumento": "LC", "dni": "673783489", "email": "DiegoCepeda@gemail.com", "Edad": 67 }, { "Id": 22, "nombre": "Christian", "apellido": "Duarte", "TipoDocumento": "CUIL", "dni": "345678902", "email": "ChristianDuarte@gemail.com", "Edad": 45 }, { "Id": 23, "nombre": "Silvina", "apellido": "Rincon", "TipoDocumento": "PASAPORTE", "dni": "23456784", "email": "SilvinaRincon@gemail.com", "Edad": 32 }, { "Id": 24, "nombre": "Carolina", "apellido": "Gonzalez", "TipoDocumento": "CUIT", "dni": "8765433223", "email": "CarolinaGonzalez@gemail.com", "Edad": 78 }, { "Id": 25, "nombre": "Pedro", "apellido": "Carozella", "TipoDocumento": "LC", "dni": "2345678", "email": "PedroCarozella@gemail.com", "Edad": 45 }];
