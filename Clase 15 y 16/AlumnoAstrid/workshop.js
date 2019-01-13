
//Constructor de Alumnos

function CrearAlumno(nombre, apellido, dni, mail){
	this.nombre = nombre;
	this.apellido = apellido;
	this.dni = dni;
	this.mail = mail;
	this.nota = [];
}

// Función agregar nuevo alumno al localStorage

function AgregarClienteNuevo(nombre, apellido, dni, mail){
	var nuevoAlumno = new CrearAlumno(nombre, apellido, dni, mail);
	var l =  JSON.parse(localStorage.getItem('alumnosLocal'));
		if (l !== null) {
			l.push(nuevoAlumno);
			localStorage.setItem("alumnosLocal", JSON.stringify(l));
		} else {
			var r = new Array (nuevoAlumno);
			localStorage.setItem("alumnosLocal", JSON.stringify(r));
		}

}

//Andres

document.onreadystatechange = function () {
   if (document.readyState == "complete") {
       cargaInicial();
   }
}

// Carga inicial de los alumnos del local Storage en el html

function cargaInicial() {
	document.getElementById("listaPrincipal").innerHTML = "";
	var listaAlumnos = getLocalList("alumnosLocal");
	var listaPrincipal = document.getElementById("listaPrincipal");
	var alumno;
	for (var i = 0; i < listaAlumnos.length; i++) {
    	alumno = crearNodo(listaAlumnos[i]);
    	listaPrincipal.appendChild(alumno);
	}
}


function getLocalList(key) {
	if (typeof key === "string") {
    	//recupero la lista del local storage
    	var localList = localStorage.getItem(key);
    	//verifico que sea distinto de null o undefined
    	if (localList) {
        	//si existe, la transformo en Javascript y la devuelvo
        	var resultado = JSON.parse(localList);
        	return resultado;
		} else return [];
	}
}

function crearNodo(nuevoAlumno) {
	// Creo el nodo li
	var Nodo = document.createElement("li");
	// Le setteo el id al nodo
	Nodo.id = nuevoAlumno.dni;
	// Le setteo la clase al nodo
	Nodo.className = 'list-group-item';
	// Le agrego el contenido al nodo
	Nodo.innerHTML =
       '<h1>' +
       nuevoAlumno.nombre +
       ' ' +
       nuevoAlumno.apellido +
       '</h1>' +
       '<h3>DNI:' +
       nuevoAlumno.dni +
       '</h3><p class="pepe">E-mail:' +
       nuevoAlumno.mail +
       '</p>' +
       '<input type="button" class="btn btn-block btn-primary" value="Agregar Notas">';
	// Devuelvo solo el nodo con todos sus datos
	return Nodo;
}

// Función eliminar alumno

function eliminaAlumno() {
	var dni = document.getElementById('buscDni').value
	console.log(dni);
	dni = dni.toString();
	var obj = localStorage.getItem('alumnosLocal');
	var obj = JSON.parse(obj);
	console.log(obj)

   for (let i = 0; i < obj.length; i++) {
       dniAlumno = obj[i].dni;
       if (dni === dniAlumno) {
           Obj = obj.splice(i,1);
           obj = JSON.stringify(obj);
           localStorage.setItem('alumnosLocal',obj );
       }else {
           console.log("Alumno no encontrado");
       }
   }
   cargaInicial();
}

// funcion principal que esta linkeada al boton

function BuscarYModificarAlumno(){ 

   // obtengo el dni del html
   var dni = document.getElementById('buscDni').value;

   //    busco el array en el localStorage
   var alumnosLocal = JSON.parse(localStorage.getItem('alumnosLocal'));

   // busco el alumno por dni y me devuelve la posicion
   var pos = BuscarAlumnoEnLocalStorage(dni, alumnosLocal)
   if(pos !== -1){
       // cambio el boton agregar por el boton modificar
       document.getElementById("btnAgregar").classList.add('d-none')
       document.getElementById("btnModificar").classList.remove('d-none')

       MostrarAlumnoBuscadoEnInput(pos, alumnosLocal);

   }

}

// la funcion busca el alumno en el localStorage y devuelve la posicion del alumno en el vector o false si no lo encontro

function BuscarAlumnoEnLocalStorage(numDni, arrayAlumnos) {
       var pos = -1;
       // recorro el array de alumnos
       for(i=0 ; i<arrayAlumnos.length ; i++){
           // si el dni es igual al del alumno devuelve la posicion en el vector
           if(arrayAlumnos[i].dni == numDni){
               pos = i;
               return pos;
           }
       }
       // si no encontro el alumno devuelve false
       return pos;
}

// la funcion recibe la posicion y el array de alumnos y muestra en los input la informacion del alumno encontrado

function MostrarAlumnoBuscadoEnInput(x, arrayAlumnos){
    document.getElementById('nombre').value = arrayAlumnos[x].nombre
    document.getElementById('dni').value = arrayAlumnos[x].dni
    document.getElementById('apellido').value = arrayAlumnos[x].apellido
    document.getElementById('email').value = arrayAlumnos[x].mail
}

function ModificarAlumnoLocalStorage(){
   // obtengo el dni del html
   var dni = document.getElementById('buscDni').value;

   //    busco el array en el localStorage
   var alumnosLocal = JSON.parse(localStorage.getItem('alumnosLocal'));

   // busco el alumno por dni y me devuelve la posicion
   var pos = BuscarAlumnoEnLocalStorage(dni, alumnosLocal);

   alumnosLocal[pos].nombre = document.getElementById('nombre').value;
   alumnosLocal[pos].apellido = document.getElementById('apellido').value;
   alumnosLocal[pos].dni = document.getElementById('dni').value;
   alumnosLocal[pos].mail = document.getElementById('email').value;

   var string = JSON.stringify(alumnosLocal);
   localStorage.setItem('alumnosLocal', string);
    document.getElementById("btnAgregar").classList.remove('d-none')
    document.getElementById("btnModificar").classList.add('d-none')
   cargaInicial();
}

//Rosario

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        var inputNombre = document.getElementById("nombre");
        var inputDNI = document.getElementById("dni");
        var buscarDNI = document.getElementById("buscDni");
        var botonCrear = document.getElementById("btnAgregar");
        inputNombre.setAttribute("required", "");  //.attribute pide dos valores: nombre y valor
        inputDNI.setAttribute("required", "");
        buscarDNI.setAttribute("required", "");
        // seteamos una funcion al onblur de los objetos
        inputNombre.addEventListener("blur", ValidarNombre);
        inputDNI.addEventListener("blur", ValidarDNI);
        buscarDNI.addEventListener("blur", ValidarDNIbusc);
        botonCrear.addEventListener ("click", ClickAgregar);
    }
}

function ValidarDNI() {
    var dni = document.getElementById("dni");
    var str = dni.value.length
        if (str !== 8) {
            alert ("DNI inválido");
        return false;    
		}
		debugger;
   var alumnosLocal = JSON.parse(localStorage.getItem('alumnosLocal'));
		if(alumnosLocal !== null){
		for (i=0 ; i<alumnosLocal.length ; i++ ) {
    	if(alumnosLocal[i].dni == dni.value){
    		return false;
    	}

	}
	}
}

function ValidarNombre() {
    var nombre = document.getElementById("nombre");
    if (nombre.value == "") {  // antes solo tenia (nombre) entonces me pasaba solo el event hay que aclarar que queremos el .value
        alert ("Debe completar el nombre");
        return false;
    }
}

function ValidarDNIbusc() {
    var dni = document.getElementById ("buscDni");
    var str = dni.value.length
        if (str !== 8) {
           alert ("DNI inválido busc");
        return false;    
    }

}

function AgregarAlumno(){
    if (ValidarDNI() == false) return false;
    if (ValidarNombre() == false) return false;
//    if (ValidarDNIbusc() == false) return false;

    return true;
}

// ahora agregamos el alumno

function ClickAgregar() {
    var nombre = document.getElementById("nombre").value;
    var dni = document.getElementById ("dni").value;
    var apellido = document.getElementById("apellido").value;
    var mail = document.getElementById("email").value;
    if (AgregarAlumno() == false) return false;
    AgregarClienteNuevo(nombre, apellido, dni, mail);
    cargaInicial();
}