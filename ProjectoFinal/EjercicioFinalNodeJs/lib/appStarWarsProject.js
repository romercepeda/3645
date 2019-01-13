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

app.get("/peoples", function (req, resp) {

    resp.setHeader("content-type", "application/json");
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.json(request());
});



function request(url) {

    url = "https://swapi.co/api/people/?format=json";
    console.log("entro 1");

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
            return oReq.responseText;
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

app.listen(8080, function () { console.log("El api esta corriendo"); });