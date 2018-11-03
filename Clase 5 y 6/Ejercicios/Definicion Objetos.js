// JavaScript source code

var variableSimple = "valor de mi variable";

var vehiculo = {
    //Propiedades
    //marca: "Chevrolet",
    modelo: "cruze",
    nroPuertas: 4,
    color: "azul",
    anio: 2016,

    asignarMarca: function(nuevaMarca){
        this.marca = nuevaMarca;
    },

    encender: function () {
        console.log("vehiculo encendido..");
    },
    frenar: function () {
        console.log("vehiculo detenido....");
    },
   
};

var vehiculoCargaPesada = {
    maximoPeso: 0,
    tipo: "",

}
var vehiculoCarrera = {

    tamaniioAleron:0,
}

//Constructor de objetos
function ConstruirVehciulo(_marca, _modelo, _anio) {
    console.log(this);
    this.marca = _marca;
    this.modelo = _modelo;
}

function ConstruirVehciulo2(_marca, _modelo, _anio) {
    var marca = _marca.trim();
    var modelo = _modelo;


    return {
        marca: marca,
        modelo: modelo,
        nombre: marca + " " + modelo
    }
}