// JavaScript source code
var http = require("http");
var fs = require("fs");


http.createServer(function (req, resp) {
    fs.readFile("./index.html", function (err, html) {

        console.log("get request");
        resp.writeHead(200, { "Content-Type": "application/json" });
        //resp.writeHead(200, { 'Content-Type': 'text/plain' });
        //resp.write(html);
        resp.write(JSON.stringify({ nombre: "Romer", apellido: "Cepeda" }));
        resp.end();

    });
}).listen(8080);
