//---------------------------------------------------------------- ABB
class NodeB {
    constructor(dato) {
        this.dato = dato;
        this.izq = null;
        this.der = null;
    }
}
class TreeABB {
    constructor() {
        this.raiz = null;
    }

    insertar(dato) {
        var nuevo;
        nuevo = new NodeB(dato);

        if (this.raiz === null) {
            this.raiz = nuevo;
            this.raiz.izq = new TreeABB();
            this.raiz.der = new TreeABB();
        } else {
            if (dato.dni > this.raiz.dato.dni) {
                this.raiz.der.insertar(dato);
            } else {
                if (dato.dni < this.raiz.dato.dni) {
                    this.raiz.izq.insertar(dato);
                } else {
                    console.log("Ya existe");
                }
            }
        }
    }
}

class NodoAb {
    constructor(valor) {
        this.valor = valor;
        this.izquierda = null;
        this.derecha = null;
    }
}
class arABB {
    constructor() {
        this.raiz = null;
    }

    insertar(valor) {
        this.raiz = this.add(valor, this.raiz);
    }

    add(valor, nodo) {
        if (nodo == null) {
            return new NodoAb(valor);
        } else {
            if (valor.dni > nodo.valor.dni) {
                nodo.derecha = this.add(valor, nodo.derecha);
            } else {
                nodo.izquierda = this.add(valor, nodo.izquierda);
            }
        }
        return nodo;
    }

    //preorden
    preorden() {
        this.pre_orden(this.raiz);
    }
    pre_orden(nodo) {
        if (nodo != null) {
            //console.log("Valor:", nodo.valor.nombre_actor);

            let txt = "<div class=\"actorrrr\" id=\"actorrrr\">";
            txt += "<img src=\"img/actor.png\" alt=\"\" id=\"imgAcc\">";
            txt += "<h2 class=\"nombreAcc\" id=\"nombreAcc\">" + nodo.valor.nombre_actor + "</h2>";
            txt += "<p class=\"descripcAcc\" id=\"descripcAcc\">" + nodo.valor.descripcion + "</p>";
            document.getElementById("listaactores").innerHTML += txt;
            txt = "</div>";

            this.pre_orden(nodo.izquierda);
            this.pre_orden(nodo.derecha);
        }
    }
    //inorden
    inorden() {
        this.in_orden(this.raiz);
    }
    in_orden(nodo) {
        if (nodo != null) {
            //this.in_orden(nodo.derecha);
            this.in_orden(nodo.izquierda);
            //console.log("Valor:", nodo.valor.nombre_actor);

            let txt = "<div class=\"actorrrr\" id=\"actorrrr\">";
            txt += "<img src=\"img/actor.png\" alt=\"\" id=\"imgAcc\">";
            txt += "<h2 class=\"nombreAcc\" id=\"nombreAcc\">" + nodo.valor.nombre_actor + "</h2>";
            txt += "<p class=\"descripcAcc\" id=\"descripcAcc\">" + nodo.valor.descripcion + "</p>";
            document.getElementById("listaactores").innerHTML += txt;
            txt = "</div>";


            this.in_orden(nodo.derecha);
        }
    }
    //postorden
    postorden() {
        this.post_orden(this.raiz);
    }
    post_orden(nodo) {
        if (nodo != null) {
            this.post_orden(nodo.izquierda);
            this.post_orden(nodo.derecha);

            //console.log("Valor:", nodo.valor.nombre_actor);

            let txt = "<div class=\"actorrrr\" id=\"actorrrr\">";
            txt += "<img src=\"img/actor.png\" alt=\"\" id=\"imgAcc\">";
            txt += "<h2 class=\"nombreAcc\" id=\"nombreAcc\">" + nodo.valor.nombre_actor + "</h2>";
            txt += "<p class=\"descripcAcc\" id=\"descripcAcc\">" + nodo.valor.descripcion + "</p>";
            document.getElementById("listaactores").innerHTML += txt;
            txt = "</div>";
        }
    }
}


class GrafoABB {
    constructor() { }
    graficarArbol(raiz) {
        var acum, acumuladores, estructuras;
        estructuras = "digraph G{\nlabel=\"Actores\";node[fixedsize=true width=2 height=1];\n";
        acum = "";
        acumuladores = [estructuras, acum];

        if (raiz !== null) {
            this.recorrerArbol(raiz, acumuladores);
        }

        acumuladores[0] += acumuladores[1] + "\n}";
        console.log(acumuladores[0]);

        d3.select("#grafo").graphviz()
            .width(900)
            .height(450)
            .renderDot(acumuladores[0])
    }

    recorrerArbol(raiz, acum) {
        if (raiz) {
            acum[1] += raiz.dato.dni.toString() + "[label=\"" + raiz.dato.nombre_actor.toString() + "\",style=filled fillcolor=white];\n";
            if (raiz.izq.raiz !== null) {
                acum[1] += "{" + raiz.dato.dni.toString() + "} -> {" + raiz.izq.raiz.dato.dni.toString() + "}[color=black];\n";
            }
            if (raiz.der.raiz !== null) {
                acum[1] += "{" + raiz.dato.dni.toString() + "} -> {" + raiz.der.raiz.dato.dni.toString() + "}[color=black];\n";
            }
            this.recorrerArbol(raiz.izq.raiz, acum);
            this.recorrerArbol(raiz.der.raiz, acum);
        }
    }
}

//---------------------------------------------------------------- AVL
class Node {
    constructor(dato, nombre) {
        this.dato = dato;
        this.nombre = nombre;
        this.Previous = null;
        this.Next = null;
    }
}

class Avl {
    constructor() {
        this.raiz = null;
        this.altura = -1;
        this.equilibrio = 0;
    }

    insertar(dato) {
        var nuevo;
        nuevo = new Node(dato);

        if (this.raiz === null) {
            this.raiz = nuevo;
            this.raiz.Previous = new Avl();
            this.raiz.Next = new Avl();
        } else {
            if (dato.id_pelicula > this.raiz.dato.id_pelicula) {
                this.raiz.Next.insertar(dato);
            } else {
                if (dato.id_pelicula < this.raiz.dato.id_pelicula) {
                    this.raiz.Previous.insertar(dato);
                } else {
                    console.log("el valor ya existe");
                }
            }
        }

        this.balancear();
    }

    balancear() {
        this.actualizarAlturas({
            "recursivo": false
        });
        this.actualizarEquilibrio(false);

        while (this.equilibrio < -1 || this.equilibrio > 1) {
            if (this.equilibrio > 1) {
                if (this.raiz.Previous.equilibrio < 0) {
                    this.raiz.Previous.rotacionziquierda();
                    this.actualizarAlturas();
                    this.actualizarEquilibrio();
                }

                this.rotacionDerecha();
                this.actualizarAlturas();
                this.actualizarEquilibrio();
            }

            if (this.equilibrio < -1) {
                if (this.raiz.Next.equilibrio > 0) {
                    this.raiz.Next.rotacionDerecha();
                    this.actualizarAlturas();
                    this.actualizarEquilibrio();
                }

                this.rotacionziquierda();
                this.actualizarAlturas();
                this.actualizarEquilibrio();
            }
        }
    }

    actualizarAlturas(recursivo = true) {
        if (this.raiz === null) {
            this.altura = -1;
        } else {
            if (recursivo) {
                if (this.raiz.Previous !== null) {
                    this.raiz.Previous.actualizarAlturas();
                }

                if (this.raiz.Next !== null) {
                    this.raiz.Next.actualizarAlturas();
                }
            }
            this.altura = Math.max(this.raiz.Previous.altura, this.raiz.Next.altura) + 1;
        }
    }

    actualizarEquilibrio(recursivo = true) {
        if (this.raiz === null) {
            this.equilibrio = 0;
        } else {
            if (recursivo) {
                if (this.raiz.Previous !== null) {
                    this.raiz.Previous.actualizarEquilibrio();
                }

                if (this.raiz.Next !== null) {
                    this.raiz.Next.actualizarEquilibrio();
                }
            }

            this.equilibrio = this.raiz.Previous.altura - this.raiz.Next.altura;
        }
    }

    rotacionDerecha() {
        var raiz;
        raiz = this.raiz;
        this.raiz = raiz.Previous.raiz;
        raiz.Previous.raiz = this.raiz.Next.raiz;
        this.raiz.Next.raiz = raiz;
    }

    rotacionziquierda() {
        var raiz;
        raiz = this.raiz;
        this.raiz = raiz.Next.raiz;
        raiz.Next.raiz = this.raiz.Previous.raiz;
        this.raiz.Previous.raiz = raiz;
    }



}

class GrafoAVL {
    constructor() { }

    graficarArbol(raiz) {
        var acumuladores;
        acumuladores = ["digraph G{\nlabel=\"Peliculas\"\nnode [shape=rectangle];\n", ""];
        if (raiz !== null) {
            this.recorrerArbol(raiz, acumuladores);
        }
        acumuladores[0] += acumuladores[1] + "\n}";

        //console.log(acumuladores[0]);      
        d3.select("#grafo").graphviz()
            .renderDot(acumuladores[0])
    }

    recorrerArbol(raiz, acum) {
        if (raiz) {
            acum[1] += "\"" + (raiz.dato.nombre_pelicula) + "\"[label=\"" + raiz.dato.nombre_pelicula + "\"];\n";

            if (raiz.Previous.raiz !== null) {
                acum[1] += "\"" + (raiz.dato.nombre_pelicula) + "\" -> \"" + (raiz.Previous.raiz.dato.nombre_pelicula) + "\";\n";
            }

            if (raiz.Next.raiz !== null) {
                acum[1] += "\"" + (raiz.dato.nombre_pelicula) + "\" -> \"" + (raiz.Next.raiz.dato.nombre_pelicula) + "\";\n";
            }

            this.recorrerArbol(raiz.Previous.raiz, acum);
            this.recorrerArbol(raiz.Next.raiz, acum);
        }
    }
}

//---------------------------------------------------------------- LISTA ENLAZADA CLIENTES
class NodoS {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

class ListaEnlazada {
    constructor() {
        this.head = null;
    }

    agregar(dato) {
        let nuevo = new NodoS(dato);
        nuevo.siguiente = null;
        if (this.head != null) {
            let aux = this.head;
            while (aux.siguiente != null) {
                aux = aux.siguiente;
            }
            aux.siguiente = nuevo;
        } else {
            this.head = nuevo;
        }
    }

    ordenAsc() {
        if (this.head != null) {
            let aux = this.head;
            while (aux.siguiente != null) {
                let temp = aux.siguiente;
                while (temp != null) {
                    if (temp.dato.id_pelicula < aux.dato.id_pelicula) {
                        let cambio = aux.dato;
                        aux.dato = temp.dato;
                        temp.dato = cambio;
                    }
                    temp = temp.siguiente;
                }
                aux = aux.siguiente;
            }
        } else {
            alert("No Hay Nada");
        }
    }

    ordenDes() {
        if (this.head != null) {
            let aux = this.head;
            while (aux.siguiente != null) {
                let temp = aux.siguiente;
                while (temp != null) {
                    if (temp.dato.id_pelicula > aux.dato.id_pelicula) {
                        let cambio = aux.dato;
                        aux.dato = temp.dato;
                        temp.dato = cambio;
                    }
                    temp = temp.siguiente;
                }
                aux = aux.siguiente;
            }
        } else {
            alert("No Hay Nada");
        }
    }

    buscarUsuario(valor) {
        if (this.head != null) {
            let existe = false;
            let aux = this.head;
            while (aux != null && existe == false) {
                if (aux.dato.nombre_usuario === valor) {
                    existe = true;
                    //console.log(`Si se encontro el dato "${aux.dato.usuario}" en la lista`);
                    return aux.dato.nombre_usuario;
                }
                aux = aux.siguiente;
            }
            if (existe == false) {
                console.log(`No se encontro el dato "${valor}" en la lista`);
            }
        } else {
            console.log("Esta Vacia");
        }
    }

    buscarPass(valor) {
        if (this.head != null) {
            let existe = false;
            let aux = this.head;
            while (aux != null && existe == false) {
                if (aux.dato.contrasenia === valor) {
                    existe = true;
                    //console.log(`Si se encontro el dato "${aux.dato.usuario}" en la lista`);
                    return aux.dato.contrasenia;
                }
                aux = aux.siguiente;
            }
            if (existe == false) {
                console.log(`No se encontro el dato "${valor}" en la lista`)
            }
        } else {
            console.log("Esta Vacia");
        }
    }

    mostrarUsuario() {
        if (this.head != null) {
            let aux = this.head;
            while (aux != null) {
                console.log("----------------------------");
                console.log("Usuario: " + aux.dato.nombre_usuario);
                console.log("Contraseña: " + aux.dato.contrasenia);
                aux = aux.siguiente;
            }
        }
    }

    verLibro() {
        if (this.head != null) {
            let aux = this.head;
            let contador = 0;
            while (aux != null) {
                //console.log("----------------------------");
                let txt = "<div" + contador + "><article><br>";
                txt += "Titulo: " + aux.dato.nombrelibro + "<br>";
                txt += "Autor: " + aux.dato.nombreautor;
                document.getElementById('vstlibros').innerHTML += txt;
                txt = "<br></article></div" + contador + ">";
                contador++;
                aux = aux.siguiente;
            }
        }
    }

    verMosaicoCategorias() {
        if (this.head != null) {
            let aux = this.head;
            let contador = 0;
            while (aux != null) {
                //console.log("----------------------------");
                let txt = "<div class=\"categoriassss\" id=\"categoriassss\">";
                txt += "<img src=\"img/cate.png\" alt=\"\" id=\"img-cate\" class=\"img-cate\">";
                txt += "<h2 id=\"nombrecate\" class=\"nombrecate\">" + aux.dato.company + "</h2>";
                document.getElementById('listacategoriasss').innerHTML += txt;
                txt = "</div>";
                contador++;
                aux = aux.siguiente;
            }
        }
    }

    verAutoresBB(div) {
        if (this.head != null) {
            let aux = this.head;
            let contador = 0;
            while (aux != null) {
                //console.log("----------------------------");
                let txt = "<div class=\"cardAutores\"><div class=\"textos\">";
                txt += "<h3>Autor: " + aux.dato.nombreautor + "</h3>";
                txt += "<img src=\"img/autt.png\" alt=\"\">";
                txt += "<p>Biografia: " + aux.dato.biografia + "</p>";
                document.getElementById(div).innerHTML += txt;
                txt = "</div></div>";
                contador++;
                aux = aux.siguiente;
            }
        }
    }

    verPeliculasLIsta() {
        if (this.head != null) {
            let aux = this.head;
            let contador = 0;
            while (aux != null) {
                let txt = "<div class=\"peliculasss\" id=\"peliculasss\">";
                txt += "<img src=\"img/pelis.png\" alt=\"\" id=\"img-peli\">";
                txt += "<h4 id=\"titulo-peli\">" + aux.dato.nombre_pelicula + "</h4>";
                txt += "<p id=\"descripcion-peli\">" + aux.dato.descripcion + "</p>";
                txt += "<input onclick=\"info()\" type=\"button\" value=\"Info\" id=\"info-peli\" class=\"btnpeli\">";
                txt += "<input onclick=\"\" type=\"button\" value=\"Alquilar\" id=\"alquilar-peli\" class=\"btnpeli\">";
                txt += "<h4 id=\"precio-peli\">Q. " + aux.dato.precio_Q + "</h4>";
                document.getElementById("listapeliculas").innerHTML += txt;
                txt = "</div>";
                contador++;
                aux = aux.siguiente;
            }
        }
    }

    graphvizClientes() {
        var codigodot = "digraph G{\nlabel=\" Clientes \";\nnode [shape=box];\n";
        var temporal = this.head;
        var conexiones = "";
        var nodos = "";
        var numnodo = 0;
        while (temporal != null) {
            nodos += "N" + numnodo + "[label=\"" + temporal.dato.nombre_completo + "\" ];\n";
            if (temporal.siguiente != null) {
                var auxnum = numnodo + 1;
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n";
            }
            temporal = temporal.siguiente;
            numnodo++;
        }
        codigodot += "//agregando nodos\n";
        codigodot += nodos + "\n";
        codigodot += "//agregando conexiones o flechas\n";
        codigodot += "{rank=same;\n" + conexiones + "\n}\n}";
        console.log(codigodot);

        d3.select("#grafo").graphviz()
            .renderDot(codigodot)
    }
}

//--------------------------------------------------- TABLA HASH 
class Nodo {
    constructor(id) {
        this.id = id;
        this.siguiente = null;
        this.abajo = null;
    }
}

class Nodo2 {
    constructor(nombre) {
        this.nombre = nombre;
        this.siguiente = null;
    }
}

class ListadeListas {
    constructor() {
        this.cabecera = null;
    }

    //Metodos para insertar

    //Insertar Album
    insertarCabeza(id) {
        let nuevo = new Nodo(id);
        nuevo.siguiente = null;
        if (this.cabecera != null) {
            let aux = this.cabecera;
            while (aux.siguiente != null) {
                aux = aux.siguiente;
            }
            aux.siguiente = nuevo;
        } else {
            this.cabecera = nuevo;
        }
    }

    //Insertar Cancion
    insertar(id, nombre) {
        let temporalID = this.cabecera;
        //Recorrer toda la lista de albums
        while (temporalID != null) {
            if (temporalID.id == id) {
                //console.log("Si se encontro el album " + id);
                let nuevacancion = new Nodo2(nombre);
                var iniciocanciones = temporalID.abajo;
                temporalID.abajo = nuevacancion;
                nuevacancion.siguiente = iniciocanciones;
                break;
            }
            temporalID = temporalID.siguiente;
        }
        if (temporalID == null) {
            console.log("No se encontro el album en la lista");
        }
    }

    existeCabeza(dato) {
        let temporal = this.cabecera;
        while (temporal != null) {
            if (dato == temporal.id) {
                return true;
            }
            //console.log(temporal.dato);
            temporal = temporal.siguiente;
        }
        return false;
    }


    grafic(div) {
        var codigodot = "digraph G{\nbgcolor=\"transparent\"\nlabel=\" ListadeListas \";\nnode [shape=box width=2];\n";
        var temporal = this.cabecera;
        var conexiones = "";
        var conexiones2 = "";
        var nodos = "";
        var numnodo = 0;
        var numnodo2 = 1;
        while (temporal != null) {
            nodos += "N" + numnodo + "[label=\"" + temporal.id + "\" style=filled fillcolor=white ];\n";
            if (temporal.siguiente != null) {
                var auxnum = numnodo + 1;
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n";
            }
            if (this.existeCabeza(temporal.id)) {
                var temporalnodolistasimple = temporal.abajo;
                var cabeza = true;
                while (temporalnodolistasimple != null) {
                    nodos += "B" + numnodo2 + "[label=\"" + temporalnodolistasimple.nombre + "\" style=filled fillcolor=white];\n";
                    if (temporalnodolistasimple.siguiente != null) {
                        if (cabeza) {
                            conexiones2 += "{rank=same;\n";
                            conexiones2 += "N" + numnodo + " -> B" + numnodo2 + ";\n";
                        }
                        var auxnum2 = numnodo2 + 1;
                        conexiones2 += "B" + numnodo2 + " -> B" + auxnum2 + ";\n";
                    }

                    temporalnodolistasimple = temporalnodolistasimple.siguiente;
                    numnodo2++;
                    cabeza = false;
                }
                conexiones2 += "}";
            }
            temporal = temporal.siguiente;
            numnodo++;
        }
        codigodot += "//agregando nodos\n";
        codigodot += nodos + "\n";
        codigodot += "//agregando conexiones o flechas\n";
        codigodot += "{\n" + conexiones + "\n}\n";
        codigodot += "{\n" + conexiones2 + "\n}\n}";
        console.log(codigodot);

        d3.select("." + div).graphviz()
            .width(950)
            .height(500)
            .renderDot(codigodot)
    }

}



//---------------------------------------------------------------- OBJETOS

class cliente {
    constructor(dpi, nombre_completo, nombre_usuario, correo, contrasenia, telefono) {
        this.dpi = dpi;
        this.nombre_completo = nombre_completo;
        this.nombre_usuario = nombre_usuario;
        this.correo = correo;
        this.contrasenia = contrasenia;
        this.telefono = telefono;
    }
}

class pelicula {
    constructor(id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q) {
        this.id_pelicula = id_pelicula;
        this.nombre_pelicula = nombre_pelicula;
        this.descripcion = descripcion;
        this.puntuacion_star = puntuacion_star;
        this.precio_Q = precio_Q;
    }
}

class actor {
    constructor(dni, nombre_actor, correo, descripcion) {
        this.dni = dni;
        this.nombre_actor = nombre_actor;
        this.correo = correo;
        this.descripcion = descripcion;
    }
}

class categoria {
    constructor(id_categoria, company) {
        this.id_categoria = id_categoria;
        this.company = company;
    }
}

//---------------------------------------------------------------- ESTRUCTURAS
var listaClientes = new ListaEnlazada();
var listaPelis = new ListaEnlazada();
var listaCate = new ListaEnlazada();
var arbolAVL = new Avl();
var arbolABB = new TreeABB();
var abba = new arABB();
var grafoAVL = new GrafoAVL();
var grafoABB = new GrafoABB();



//---------------------------------------------------------------- FUNCION CARGAR PELICULAS
function cargaPeliculas(e) {
    var archivo = e.target.files[0];

    if (!archivo) {
        return;
    }

    let lector = new FileReader();
    lector.onload = function (e) {
        let contenido = e.target.result;

        const object = JSON.parse(contenido);

        for (const key in object) {
            let users = object[key];
            let id_pelicula = users.id_pelicula;
            let nombre_pelicula = users.nombre_pelicula;
            let descripcion = users.descripcion;
            let puntuacion_star = users.puntuacion_star;
            let precio_Q = users.precio_Q;

            //console.log(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q);

            arbolAVL.insertar(new pelicula(id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q));
            listaPelis.agregar(new pelicula(id_pelicula, nombre_pelicula, descripcion, puntuacion_star, precio_Q));
        }
    }
    lector.readAsText(archivo);
}
document.getElementById("formPeliculas").addEventListener("change", cargaPeliculas, false);

//---------------------------------------------------------------- FUNCION CARGAR USUARIOS
function cargaClientes(e) {
    var archivo = e.target.files[0];

    if (!archivo) {
        return;
    }

    let lector = new FileReader();
    lector.onload = function (e) {
        let contenido = e.target.result;

        const object = JSON.parse(contenido);

        for (const key in object) {
            let users = object[key];
            let dpi = users.dpi;
            let nombre = users.nombre_completo;
            let usuar = users.nombre_usuario;
            let correo = users.correo;
            let contrasenia = users.contrasenia;
            let telefono = users.telefono;
            listaClientes.agregar(new cliente(dpi, nombre, usuar, correo, contrasenia, telefono));
        }
    }
    lector.readAsText(archivo);
}
document.getElementById("formClientes").addEventListener("change", cargaClientes, false);

//---------------------------------------------------------------- FUNCION CARGAR ACTORES
function cargaActores(e) {
    var archivo = e.target.files[0];

    if (!archivo) {
        return;
    }

    let lector = new FileReader();
    lector.onload = function (e) {
        let contenido = e.target.result;

        const object = JSON.parse(contenido);

        for (const key in object) {
            let users = object[key];
            let dni = users.dni;
            let nombre_actor = users.nombre_actor;
            let correo = users.correo;
            let descripcion = users.descripcion;

            //console.log(dni,nombre_actor,correo,descripcion);
            arbolABB.insertar(new actor(dni, nombre_actor, correo, descripcion));
            abba.insertar(new actor(dni, nombre_actor, correo, descripcion));
        }
    }
    lector.readAsText(archivo);
}
document.getElementById("formActores").addEventListener("change", cargaActores, false);

//---------------------------------------------------------------- FUNCION CARGAR CATEGORIAS
var listalista = new ListadeListas();
function cargaCategorias(e) {
    for (let index = 0; index < 20; index++) {
        listalista.insertarCabeza(index);
    }
    var archivo = e.target.files[0];

    if (!archivo) {
        return;
    }

    let lector = new FileReader();
    lector.onload = function (e) {
        let contenido = e.target.result;
        let mod = 0;

        const object = JSON.parse(contenido);

        for (const key in object) {
            let users = object[key];
            let id_categoria = users.id_categoria;
            let company = users.company;

            //console.log("Categoria: " + id_categoria + " Compania: " + company);
            mod = id_categoria % 20;
            console.log(mod);

            listalista.insertar("5", company);
            listaCate.agregar(new categoria(id_categoria,company))
        }
    }
    lector.readAsText(archivo);
}
document.getElementById("formCategorias").addEventListener("change", cargaCategorias, false);


//---------------------------------------------------------------- LOGIN
var usu, pas, adm;
function entrar() {
    usu = document.login.usuario.value;
    pas = document.login.password.value;

    let existeUsuario = listaClientes.buscarUsuario(usu);
    let existePass = listaClientes.buscarPass(pas);

    if (usu == "admin" && pas == 123) {
        document.getElementById("login-general").style.display = "none";
        document.getElementById("administrador-total").style.display = "";
        document.getElementById("cerrarsesion").style.display = "";
    }
    if (usu == existeUsuario && pas == existePass) {
        document.getElementById("login-general").style.display = "none";
        document.getElementById("cerrarsesion").style.display = "";
        document.getElementById("usuario-total").style.display = "";
        listaPelis.verPeliculasLIsta();
    }
}


//---------------------------------------------------------------- FUNCIONES BOTONES
function salir() {
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
    document.getElementById("login-general").style.display = "";
    document.getElementById("administrador-total").style.display = "none";
    document.getElementById("cerrarsesion").style.display = "none";
    document.getElementById("usuario-total").style.display = "none";
    document.getElementById("cont-actores").style.display = "none";
}

function openBlockchain() {
    document.getElementById("blockchain-general").style.display = "";
}

function minimizar() {
    document.getElementById("blockchain-general").style.display = "none";
}

function mostrarAVL() {
    grafoAVL.graficarArbol(arbolAVL.raiz);
}

function mostrarClientesList() {
    listaClientes.graphvizClientes();
}

function mostrarABB() {
    grafoABB.graficarArbol(arbolABB.raiz);
}

function mostrarHash() {
    listalista.grafic("grafo")
}

function ascedente() {
    document.getElementById("listapeliculas").innerHTML = "";
    listaPelis.ordenAsc();
    listaPelis.verPeliculasLIsta();
    console.log("Ascedente");
}

function descendente() {
    document.getElementById("listapeliculas").innerHTML = "";
    listaPelis.ordenDes();
    listaPelis.verPeliculasLIsta();
    console.log("Descendente");
}

function verActoresABB(){
    document.getElementById("cont-actores").style.display = "";
}

function verCategoriasMosaico(){
    document.getElementById("cont-categorias").style.display = "";
    listaCate.verMosaicoCategorias();
}

function enordenn() {
    document.getElementById("listaactores").innerHTML = "";
    abba.inorden();
}
function preordenn() {
    document.getElementById("listaactores").innerHTML = "";
    abba.preorden();
}
function postordenn() {
    document.getElementById("listaactores").innerHTML = "";
    abba.postorden();
}

function info(){
    document.getElementById("contenedorvistaPelicula").style.display = "";
}

function cerrarinfo(){
    document.getElementById("contenedorvistaPelicula").style.display = "none";
}
