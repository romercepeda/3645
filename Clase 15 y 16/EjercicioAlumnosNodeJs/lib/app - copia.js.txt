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
var studen01 = {id: 01, name: "Maria Jose", LastName: "Berreto;)", age:18}; //Creo el alumno 
var studen02 = {id: 01, name: "Rafaelito", LastName: "Berreto;)", age:12}; //Creo otro  alumno 
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

var datos = [
{ Song: "1958", Writters: "A Day to Remember", Albun: "And Their Name Was Treason", Producer: "Andrew Wade", Year: "2005", Img: "https://upload.wikimedia.org/wikipedia/en/b/b8/And_Their_Name_Was_Treason_%28IND1024%29.jpg", Id: 1 },
{ Song: "2nd Sucks", Writters: "Tom Denney, Jeremy McKinnon, Kevin Skaff, Chad Gilbert and A Day to Remember", Albun: "What Separates Me from You", Producer: "Chad Gilbert, Andrew Wade, Jeremy McKinnon", Year: "2010", Img: "https://upload.wikimedia.org/wikipedia/en/a/a1/ADTR_WSMFY.jpg", Id: 2 },
{ Song: "A 2nd Glance", Writters: "A Day to Remember", Albun: "Old Record", Producer: "Andrew Wade", Year: "2008", Img: "https://adtrmexico.files.wordpress.com/2011/07/oldrecord.jpg?w=574&h=574", Id: 3 },
{ Song: "A Second Glance", Writters: "A Day to Remember", Albun: "And Their Name Was Treason", Producer: "Andrew Wade", Year: "2005", Img: "https://cps-static.rovicorp.com/3/JPG_500/MI0002/412/MI0002412018.jpg?partner=allrovi.com", Id: 4 },
{ Song: "A Shot in the Dark", Writters: "–", Albun: "For Those Who Have Heart", Producer: "Eric Arena, A Day to Remember", Year: "2007", Img: "http://en.metalship.org/archives/albums/album23139.jpg", Id: 5 },
{ Song: "All I Want (Acoustic)", Writters: "Jeremy McKinnon, Kevin Skaff and A Day to Remember", Albun: "–", Producer: "Andrew Wade", Year: "2011", Img: "http://www.villacedeira.com/wp-content/uploads/2017/02/sin_imagen.jpg", Id: 6 },
{ Song: "All I Want", Writters: "Jeremy McKinnon, Kevin Skaff and A Day to Remember", Albun: "What Separates Me from You", Producer: "Chad Gilbert, Andrew Wade, Jeremy McKinnon", Year: "2010", Img: "https://upload.wikimedia.org/wikipedia/en/a/a1/ADTR_WSMFY.jpg", Id: 7 },
{ Song: "All Signs Point to Lauderdale", Writters: "Tom Denney, Jeremy McKinnon, Kevin Skaff, Chad Gilbert and A Day to Remember", Albun: "What Separates Me from You", Producer: "Chad Gilbert, Andrew Wade, Jeremy McKinnon", Year: "2010", Img: "https://upload.wikimedia.org/wikipedia/en/a/a1/ADTR_WSMFY.jpg", Id: 8 },
{ Song: "Another Song About the Weekend (Acoustic)", Writters: "A Day to Remember", Albun: "Homesick: Special Edition", Producer: "Chad Gilbert, A Day to Remember", Year: "2009", Img: "https://is1-ssl.mzstatic.com/image/thumb/Music/d2/31/9f/mzi.msudexhx.jpg/268x0w.jpg", Id: 9 },
{ Song: "Another Song About the Weekend", Writters: "A Day to Remember", Albun: "Homesick", Producer: "Chad Gilbert, A Day to Remember", Year: "2009", Img: "https://s-media-cache-ak0.pinimg.com/originals/9a/20/11/9a2011d5e236d439f4b455e86f9dc339.jpg", Id: 10 },
{ Song: "Best of Me", Writters: "Tom Denney, Neil Westfall, Kevin Skaff, Andrew Wade and Chad Gilbert", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 11 },
{ Song: "Better Off This Way", Writters: "Jeremy McKinnon, Kevin Skaff and A Day to Remember", Albun: "What Separates Me from You", Producer: "Chad Gilbert, Andrew Wade, Jeremy McKinnon", Year: "2010", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 12 },
{ Song: "Breathe Hope in Me", Writters: "–", Albun: "Halos for Heros, Dirt for the Dead (EP)", Producer: "Andrew Wade", Year: "2004", Img: "https://upload.wikimedia.org/wikipedia/en/d/de/Halos_for_Angels%2C_Dirt_for_the_Dead.jpg", Id: 13 },
{ Song: "Camo", Writters: "–", Albun: "Unreleased", Producer: "Andrew Wade", Year: "", Img: "http://www.villacedeira.com/wp-content/uploads/2017/02/sin_imagen.jpg", Id: 14 },
{ Song: "Casablanca Sucked Anyways", Writters: "A Day to Remember", Albun: "And Their Name Was Treason", Producer: "Andrew Wade", Year: "2005", Img: "https://cps-static.rovicorp.com/3/JPG_500/MI0002/412/MI0002412018.jpg?partner=allrovi.com", Id: 15 },
{ Song: "Casablanca Sucked Anyways.", Writters: "A Day to Remember", Albun: "Old Record", Producer: "Andrew Wade", Year: "2008", Img: "https://adtrmexico.files.wordpress.com/2011/07/oldrecord.jpg?w=574&h=574", Id: 16 },
{ Song: "City of Ocala", Writters: "Jeremy McKinnon, Tom Denney and Chad Gilbert", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 17 },
{ Song: "Colder Than My Heart, If You Can Imagine", Writters: "–", Albun: "For Those Who Have Heart", Producer: "Eric Arena, A Day to Remember", Year: "2007", Img: "https://upload.wikimedia.org/wikipedia/en/9/9f/A_Day_to_Remember_%E2%89%A4%E2%80%93%E2%89%A5_FTWHH_reissue.jpg", Id: 18 },
{ Song: "Dead & Buried", Writters: "Jeremy McKinnon, Tom Denney and Chad Gilbert", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 19 },
{ Song: "End of Me", Writters: "Jeremy McKinnon, Andrew Wade and Chad Gilbert", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 20 },
{ Song: "Fast Forward to 2012", Writters: "–", Albun: "For Those Who Have Heart", Producer: "Eric Arena, A Day to Remember", Year: "2007", Img: "https://upload.wikimedia.org/wikipedia/en/9/9f/A_Day_to_Remember_%E2%89%A4%E2%80%93%E2%89%A5_FTWHH_reissue.jpg", Id: 21 },
{ Song: "Good Things", Writters: "Jeremy McKinnon, Chad Gilbert and Andrew Wade", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 22 },
{ Song: "Have Faith in Me", Writters: "A Day to Remember, Jeremy McKinnon, Jaison Lancaster", Albun: "Homesick", Producer: "Chad Gilbert, A Day to Remember", Year: "2009", Img: "https://s-media-cache-ak0.pinimg.com/originals/9a/20/11/9a2011d5e236d439f4b455e86f9dc339.jpg", Id: 23 },
{ Song: "Heart Less", Writters: "A Day to Remember", Albun: "Old Record", Producer: "Andrew Wade", Year: "2008", Img: "https://adtrmexico.files.wordpress.com/2011/07/oldrecord.jpg?w=574&h=574", Id: 24 },
{ Song: "Heartless", Writters: "A Day to Remember", Albun: "And Their Name Was Treason", Producer: "Andrew Wade", Year: "2005", Img: "https://cps-static.rovicorp.com/3/JPG_500/MI0002/412/MI0002412018.jpg?partner=allrovi.com", Id: 25 },
{ Song: "Heartless", Writters: "–", Albun: "For Those Who Have Heart (reissue)", Producer: "Andrew Wade", Year: "2008", Img: "https://images-na.ssl-images-amazon.com/images/I/71IN6ghlziL._SX355_.jpg", Id: 26 },
{ Song: "Here's to the Past", Writters: "–", Albun: "For Those Who Have Heart", Producer: "Eric Arena, A Day to Remember", Year: "2007", Img: "https://upload.wikimedia.org/wikipedia/en/9/9f/A_Day_to_Remember_%E2%89%A4%E2%80%93%E2%89%A5_FTWHH_reissue.jpg", Id: 27 },
{ Song: "Holdin' It Down for the Underground", Writters: "A Day to Remember", Albun: "Homesick", Producer: "Chad Gilbert, A Day to Remember", Year: "2009", Img: "https://s-media-cache-ak0.pinimg.com/originals/9a/20/11/9a2011d5e236d439f4b455e86f9dc339.jpg", Id: 28 },
{ Song: "Homesick (Acoustic)", Writters: "A Day to Remember", Albun: "Homesick: Special Edition", Producer: "Chad Gilbert, A Day to Remember", Year: "2009", Img: "https://is1-ssl.mzstatic.com/image/thumb/Music/d2/31/9f/mzi.msudexhx.jpg/268x0w.jpg", Id: 29 },
{ Song: "Homesick", Writters: "A Day to Remember", Albun: "Homesick", Producer: "Chad Gilbert, A Day to Remember", Year: "2009", Img: "https://s-media-cache-ak0.pinimg.com/originals/9a/20/11/9a2011d5e236d439f4b455e86f9dc339.jpg", Id: 30 },
{ Song: "I Heard It's the Softest Thing Ever", Writters: "–", Albun: "For Those Who Have Heart", Producer: "Eric Arena, A Day to Remember", Year: "2007", Img: "https://upload.wikimedia.org/wikipedia/en/9/9f/A_Day_to_Remember_%E2%89%A4%E2%80%93%E2%89%A5_FTWHH_reissue.jpg", Id: 31 },
{ Song: "I Remember", Writters: "Jeremy Mckinnon, Tom Denney and Andrew Wade", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 32 },
{ Song: "I Surrender", Writters: "Jeremy McKinnon, Chad Gilbert and Andrew Wade", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 33 },
{ Song: "I'm Already Gone", Writters: "Jeremy McKinnon, Kevin Skaff and Andrew Wade", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 34 },
{ Song: "I'm Made of Wax, Larry, What Are You Made Of?", Writters: "A Day to Remember", Albun: "Homesick", Producer: "Chad Gilbert, A Day to Remember", Year: "2009", Img: "https://s-media-cache-ak0.pinimg.com/originals/9a/20/11/9a2011d5e236d439f4b455e86f9dc339.jpg", Id: 35 },
{ Song: "If I Leave", Writters: "Kevin Skaff, Jeremy McKinnon, Chad Gilbert and A Day to Remember", Albun: "What Separates Me from You", Producer: "Chad Gilbert, Andrew Wade, Jeremy McKinnon", Year: "2010", Img: "https://upload.wikimedia.org/wikipedia/en/a/a1/ADTR_WSMFY.jpg", Id: 36 },
{ Song: "If It Means a Lot to You", Writters: "A Day to Remember", Albun: "Homesick", Producer: "Chad Gilbert, A Day to Remember", Year: "2009", Img: "https://s-media-cache-ak0.pinimg.com/originals/9a/20/11/9a2011d5e236d439f4b455e86f9dc339.jpg", Id: 37 },
{ Song: "If Looks Could Kill", Writters: "A Day to Remember", Albun: "And Their Name Was Treason", Producer: "Andrew Wade", Year: "2005", Img: "https://cps-static.rovicorp.com/3/JPG_500/MI0002/412/MI0002412018.jpg?partner=allrovi.com", Id: 38 },
{ Song: "If Looks Could Kill... You'd Be Dead", Writters: "A Day to Remember", Albun: "Halos for Heros, Dirt for the Dead (EP)", Producer: "Andrew Wade", Year: "2004", Img: "https://upload.wikimedia.org/wikipedia/en/d/de/Halos_for_Angels%2C_Dirt_for_the_Dead.jpg", Id: 39 },
{ Song: "If Looks Could Kill...", Writters: "A Day to Remember", Albun: "Old Record", Producer: "Andrew Wade", Year: "2008", Img: "https://adtrmexico.files.wordpress.com/2011/07/oldrecord.jpg?w=574&h=574", Id: 40 },
{ Song: "Intro '05", Writters: "A Day to Remember", Albun: "Old Record", Producer: "Andrew Wade", Year: "2008", Img: "https://adtrmexico.files.wordpress.com/2011/07/oldrecord.jpg?w=574&h=574", Id: 41 },
{ Song: "Intro", Writters: "A Day to Remember", Albun: "And Their Name Was Treason", Producer: "Andrew Wade", Year: "2005", Img: "https://cps-static.rovicorp.com/3/JPG_500/MI0002/412/MI0002412018.jpg?partner=allrovi.com", Id: 42 },
{ Song: "It's Complicated", Writters: "Jeremy McKinnon, Kevin Skaff, Neil Westfall and A Day to Remember", Albun: "What Separates Me from You", Producer: "Chad Gilbert, Andrew Wade, Jeremy McKinnon", Year: "2010", Img: "https://upload.wikimedia.org/wikipedia/en/a/a1/ADTR_WSMFY.jpg", Id: 43 },
{ Song: "Last Request", Writters: "–", Albun: "Halos for Heros, Dirt for the Dead (EP)", Producer: "Andrew Wade", Year: "2004", Img: "https://upload.wikimedia.org/wikipedia/en/d/de/Halos_for_Angels%2C_Dirt_for_the_Dead.jpg", Id: 44 },
{ Song: "Leave All the Lights On", Writters: "Jeremy McKinnon and Andrew Wade", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 45 },
{ Song: "Life @ 11", Writters: "Jeremy McKinnon, Tom Denney, Chad Gilbert and Andrew Wade", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 46 },
{ Song: "Life Lessons Learned the Hard Way", Writters: "Jeremy McKinnon, Tom Denney and Neil Westfall", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 47 },
{ Song: "Money Maker", Writters: "A Day to Remember", Albun: "Unreleased", Producer: "Chad Gilbert", Year: "", Img: "http://www.villacedeira.com/wp-content/uploads/2017/02/sin_imagen.jpg", Id: 48 },
{ Song: "Monument", Writters: "–", Albun: "For Those Who Have Heart", Producer: "Eric Arena, A Day to Remember", Year: "2007", Img: "https://upload.wikimedia.org/wikipedia/en/9/9f/A_Day_to_Remember_%E2%89%A4%E2%80%93%E2%89%A5_FTWHH_reissue.jpg", Id: 49 },
{ Song: "Mr. Highway's Thinking About the End", Writters: "A Day to Remember", Albun: "Homesick", Producer: "Chad Gilbert, A Day to Remember", Year: "2009", Img: "https://s-media-cache-ak0.pinimg.com/originals/9a/20/11/9a2011d5e236d439f4b455e86f9dc339.jpg", Id: 50 },
{ Song: "My Life for Hire", Writters: "A Day to Remember", Albun: "Homesick", Producer: "Chad Gilbert, A Day to Remember", Year: "2009", Img: "https://s-media-cache-ak0.pinimg.com/originals/9a/20/11/9a2011d5e236d439f4b455e86f9dc339.jpg", Id: 51 },
{ Song: "Nineteen Fifty Eight", Writters: "A Day to Remember", Albun: "Old Record", Producer: "Andrew Wade", Year: "2008", Img: "https://adtrmexico.files.wordpress.com/2011/07/oldrecord.jpg?w=574&h=574", Id: 52 },
{ Song: "NJ Legion Iced Tea", Writters: "A Day to Remember", Albun: "Homesick", Producer: "Chad Gilbert, A Day to Remember", Year: "2009", Img: "https://s-media-cache-ak0.pinimg.com/originals/9a/20/11/9a2011d5e236d439f4b455e86f9dc339.jpg", Id: 53 },
{ Song: "No Cigar", Writters: "Millencolin", Albun: "–", Producer: "–", Year: "2011", Img: "http://www.villacedeira.com/wp-content/uploads/2017/02/sin_imagen.jpg", Id: 54 },
{ Song: "Out of Time", Writters: "Jeremy McKinnon, Kevin Skaff and A Day to Remember", Albun: "What Separates Me from You", Producer: "Chad Gilbert, Andrew Wade, Jeremy McKinnon", Year: "2010", Img: "https://upload.wikimedia.org/wikipedia/en/a/a1/ADTR_WSMFY.jpg", Id: 55 },
{ Song: "Over My Head (Cable Car)", Writters: "Joe King, Isaac Slade", Albun: "Punk Goes Pop 2", Producer: "Andrew Wade", Year: "2009", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Punkgoespop2.jpg/220px-Punkgoespop2.jpg", Id: 56 },
{ Song: "Paranoia", Writters: "–", Albun: "Bad Vibrations", Producer: "Bill Stevenson", Year: "2016", Img: "https://upload.wikimedia.org/wikipedia/en/b/b0/Bad_Vibrations.jpg", Id: 57 },
{ Song: "Right Back at It Again", Writters: "Jeremy McKinnon, Tom Denney, Neil Westfall and Andrew Wade", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 58 },
{ Song: "Right Where You Want Me to Be", Writters: "A Day to Remember", Albun: "Non-album track", Producer: "Andrew Wade", Year: "2009", Img: "http://www.villacedeira.com/wp-content/uploads/2017/02/sin_imagen.jpg", Id: 59 },
{ Song: "Same Book But Never the Same Page", Writters: "Jeremy McKinnon, Chad Gilbert, Kevin Skaff, Neil Westfall and Andrew Wade", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 60 },
{ Song: "Second Guess", Writters: "–", Albun: "Unreleased", Producer: "Andrew Wade", Year: "", Img: "http://www.villacedeira.com/wp-content/uploads/2017/02/sin_imagen.jpg", Id: 61 },
{ Song: "Show 'Em the Ropes", Writters: "–", Albun: "For Those Who Have Heart", Producer: "Eric Arena, A Day to Remember", Year: "2007", Img: "https://upload.wikimedia.org/wikipedia/en/9/9f/A_Day_to_Remember_%E2%89%A4%E2%80%93%E2%89%A5_FTWHH_reissue.jpg", Id: 62 },
{ Song: "Since U Been Gone", Writters: "Lukasz Gottwald, Martin Sandberg", Albun: "For Those Who Have Heart (reissue)", Producer: "Andrew Wade", Year: "2008", Img: "https://images-na.ssl-images-amazon.com/images/I/71IN6ghlziL._SX355_.jpg", Id: 63 },
{ Song: "Sometimes You're the Hammer, Sometimes You're the Nail", Writters: "Jeremy McKinnon, Tom Denney, Neil Westfall, Cody Quistad and Andrew Wade", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 64 },
{ Song: "Sound the Alarm V.2.0", Writters: "A Day to Remember", Albun: "Old Record", Producer: "Andrew Wade", Year: "2008", Img: "https://adtrmexico.files.wordpress.com/2011/07/oldrecord.jpg?w=574&h=574", Id: 65 },
{ Song: "Sound the Alarm", Writters: "A Day to Remember", Albun: "And Their Name Was Treason", Producer: "Andrew Wade", Year: "2005", Img: "https://cps-static.rovicorp.com/3/JPG_500/MI0002/412/MI0002412018.jpg?partner=allrovi.com", Id: 66 },
{ Song: "Speak of the Devil", Writters: "–", Albun: "For Those Who Have Heart", Producer: "Eric Arena, A Day to Remember", Year: "2007", Img: "https://upload.wikimedia.org/wikipedia/en/9/9f/A_Day_to_Remember_%E2%89%A4%E2%80%93%E2%89%A5_FTWHH_reissue.jpg", Id: 67 },
{ Song: "Start the Shooting", Writters: "–", Albun: "For Those Who Have Heart", Producer: "Eric Arena, A Day to Remember", Year: "2007", Img: "https://upload.wikimedia.org/wikipedia/en/9/9f/A_Day_to_Remember_%E2%89%A4%E2%80%93%E2%89%A5_FTWHH_reissue.jpg", Id: 68 },
{ Song: "Sticks & Bricks", Writters: "Jeremy McKinnon, Kevin Skaff, Neil Westfall and A Day to Remember", Albun: "What Separates Me from You", Producer: "Chad Gilbert, Andrew Wade, Jeremy McKinnon", Year: "2010", Img: "https://upload.wikimedia.org/wikipedia/en/a/a1/ADTR_WSMFY.jpg", Id: 69 },
{ Song: "The Danger in Starting a Fire", Writters: "–", Albun: "For Those Who Have Heart", Producer: "Eric Arena, A Day to Remember", Year: "2007", Img: "https://upload.wikimedia.org/wikipedia/en/9/9f/A_Day_to_Remember_%E2%89%A4%E2%80%93%E2%89%A5_FTWHH_reissue.jpg", Id: 70 },
{ Song: "The Document Speaks for Itself", Writters: "Jeremy McKinnon, Kevin Skaff, Neil Westfall and Andrew Wade", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 71 },
{ Song: "The Downfall of Us All", Writters: "A Day to Remember", Albun: "Homesick", Producer: "Chad Gilbert, A Day to Remember", Year: "2009", Img: "https://s-media-cache-ak0.pinimg.com/originals/9a/20/11/9a2011d5e236d439f4b455e86f9dc339.jpg", Id: 72 },
{ Song: "The Plot to Bomb the Panhandle", Writters: "–", Albun: "For Those Who Have Heart", Producer: "Eric Arena, A Day to Remember", Year: "2007", Img: "https://upload.wikimedia.org/wikipedia/en/9/9f/A_Day_to_Remember_%E2%89%A4%E2%80%93%E2%89%A5_FTWHH_reissue.jpg", Id: 73 },
{ Song: "The Price We Pay", Writters: "–", Albun: "For Those Who Have Heart", Producer: "Eric Arena, A Day to Remember", Year: "2007", Img: "https://upload.wikimedia.org/wikipedia/en/9/9f/A_Day_to_Remember_%E2%89%A4%E2%80%93%E2%89%A5_FTWHH_reissue.jpg", Id: 74 },
{ Song: "This Is the House That Doubt Built", Writters: "Jeremy McKinnon, Kevin Skaff, Chad Gilbert and A Day to Remember", Albun: "What Separates Me from You", Producer: "Chad Gilbert, Andrew Wade, Jeremy McKinnon", Year: "2010", Img: "https://upload.wikimedia.org/wikipedia/en/a/a1/ADTR_WSMFY.jpg", Id: 75 },
{ Song: "This Sun Has Set", Writters: "–", Albun: "Halos for Heros, Dirt for the Dead (EP)", Producer: "Andrew Wade", Year: "2004", Img: "https://upload.wikimedia.org/wikipedia/en/d/de/Halos_for_Angels%2C_Dirt_for_the_Dead.jpg", Id: 76 },
{ Song: "U Had Me @ Hello", Writters: "A Day to Remember", Albun: "Old Record", Producer: "Andrew Wade", Year: "2008", Img: "https://adtrmexico.files.wordpress.com/2011/07/oldrecord.jpg?w=574&h=574", Id: 77 },
{ Song: "U Should of Killed Me When U Had the Chance", Writters: "A Day to Remember", Albun: "Old Record", Producer: "Andrew Wade", Year: "2008", Img: "https://adtrmexico.files.wordpress.com/2011/07/oldrecord.jpg?w=574&h=574", Id: 78 },
{ Song: "Violence (Enough Is Enough)", Writters: "Jeremy McKinnon, Neil Westfall, Tom Denney, Kevin Skaff and Andrew Wade", Albun: "Common Courtesy", Producer: "Jeremy McKinnon, Andrew Wade, Chad Gilbert", Year: "2013", Img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/A_Day_to_Remember%2C_Common_Courtesy_2013_album.png/220px-A_Day_to_Remember%2C_Common_Courtesy_2013_album.png", Id: 79 },
{ Song: "Welcome to the Family", Writters: "A Day to Remember", Albun: "Homesick", Producer: "Chad Gilbert, A Day to Remember", Year: "2009", Img: "https://s-media-cache-ak0.pinimg.com/originals/9a/20/11/9a2011d5e236d439f4b455e86f9dc339.jpg", Id: 80 },
{ Song: "Westfall", Writters: "–", Albun: "Halos for Heros, Dirt for the Dead (EP)", Producer: "Andrew Wade", Year: "2004", Img: "https://upload.wikimedia.org/wikipedia/en/d/de/Halos_for_Angels%2C_Dirt_for_the_Dead.jpg", Id: 81 },
{ Song: "Why Walk on Water When We've Got Boats", Writters: "–", Albun: "For Those Who Have Heart (reissue)", Producer: "Andrew Wade", Year: "2008", Img: "https://upload.wikimedia.org/wikipedia/en/9/9f/A_Day_to_Remember_%E2%89%A4%E2%80%93%E2%89%A5_FTWHH_reissue.jpg", Id: 82 },
{ Song: "You Already Know What You Are", Writters: "A Day to Remember", Albun: "Homesick", Producer: "Chad Gilbert, A Day to Remember", Year: "2009", Img: "https://s-media-cache-ak0.pinimg.com/originals/9a/20/11/9a2011d5e236d439f4b455e86f9dc339.jpg", Id: 83 },
{ Song: "You Be Tails, I'll Be Sonic", Writters: "Tom Denney, Jeremy McKinnon, Kevin Skaff, Neil Westfall and A Day to Remember", Albun: "What Separates Me from You", Producer: "Chad Gilbert, Andrew Wade, Jeremy McKinnon", Year: "2010", Img: "https://upload.wikimedia.org/wikipedia/en/a/a1/ADTR_WSMFY.jpg", Id: 84 },
{ Song: "You Had Me at Hello", Writters: "A Day to Remember", Albun: "And Their Name Was Treason", Producer: "Andrew Wade", Year: "2005", Img: "https://cps-static.rovicorp.com/3/JPG_500/MI0002/412/MI0002412018.jpg?partner=allrovi.com", Id: 85 },
{ Song: "You Should Have Killed Me When You Had the Chance", Writters: "A Day to Remember", Albun: "And Their Name Was Treason", Producer: "Andrew Wade", Year: "2005", Img: "https://cps-static.rovicorp.com/3/JPG_500/MI0002/412/MI0002412018.jpg?partner=allrovi.com", Id: 86 },
{ Song: "You Should've Killed Me When You Had the Chance", Writters: "–", Albun: "For Those Who Have Heart (reissue)", Producer: "Andrew Wade", Year: "2008", Img: "https://upload.wikimedia.org/wikipedia/en/9/9f/A_Day_to_Remember_%E2%89%A4%E2%80%93%E2%89%A5_FTWHH_reissue.jpg", Id: 87 },
{ Song: "Your Way with Words Is Through Silence!", Writters: "A Day to Remember", Albun: "Old Record", Producer: "Andrew Wade", Year: "2008", Img: "https://adtrmexico.files.wordpress.com/2011/07/oldrecord.jpg?w=574&h=574", Id: 88 },
{ Song: "Your Way with Words Is Through Silence", Writters: "A Day to Remember", Albun: "And Their Name Was Treason", Producer: "Andrew Wade", Year: "2005", Img: "https://cps-static.rovicorp.com/3/JPG_500/MI0002/412/MI0002412018.jpg?partner=allrovi.com", Id: 89 },

]
