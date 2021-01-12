'use-strict';
//Objeto Carro
class Carro {
    constructor() {
        this.moviendo = false;
        this.clos = false;
        this.frenando = false;
        this.frenoMano = Math.floor(Math.random() * 2) == 0 ? false : true;
        this.tope = 0;
        this.velocidad = 0;
        this.aceleracion = 0;
        this.distancia = 0;
        this.marcha = (Math.floor(Math.random() * 3) - 1);
        this.palanca = this.marcha == 1 ? 1 : this.marcha == -1 ? 9 : Math.floor(Math.random() * 3) + 4;
        this.cambiarMarcha(this.palanca);
        this.desaceleracion = -Math.random() * 0.2;
        this.encendido = false;
        this.historial = [];
        this.tiempo = 0;
        this.timer = setInterval(this.mover, 500);
        this.pausa = false;
        this.map = NaN;
        this.route = [];
        this.ubicacion = 0;
    }
    acelerar = async () => {
        if (!this.frenoMano) {
            if (!this.moviendo) {
                pintar("Se piso el acelerador");
            }
            this.moviendo = true;
        } else {
            pintar("Quita el Freno de Mano")
        }
    }
    dejarAcelerar = async () => {
        if (!this.frenando && this.moviendo) {
            pintar("Se solto el acelerador");
            this.moviendo = false;
        }
    }
    mover = async () => {
        let compro = this.velocidad == 0;
        let compro2;
        try {
            compro2 = this.route[this.ubicacion].distance < this.distancia;
        } catch (error) {

        }
        if (this.marcha > 0 && this.moviendo) {
            this.distancia = this.distancia + (this.velocidad * 0.5 + 0.5 * 0.5 * 0.5 * (this.aceleracion + this.desaceleracion));
            this.velocidad = this.velocidad + (this.frenando ? 4 * this.aceleracion - 1 : this.aceleracion + this.desaceleracion) * 0.5;
            if (this.velocidad > this.tope) {
                this.velocidad = this.tope;
            }
            if (this.velocidad < 0) {
                this.velocidad = 0;
            }
        } else if (this.marcha > 0) {
            this.distancia = this.distancia + (this.velocidad * 0.5 + 0.5 * 0.5 * 0.5 * (this.desaceleracion));
            this.velocidad = this.velocidad + (this.desaceleracion) * 0.5;
            if (this.velocidad < 0) {
                this.velocidad = 0;
            }
        } else if (this.marcha == 0 && !this.moviendo) {
            if (this.velocidad != 0) {
                this.distancia = this.distancia + (this.velocidad * 0.5 + 0.5 * 0.5 * 0.5 * (this.aceleracion + this.desaceleracion));
            }
            if (this.aceleracion >= 0) {
                this.velocidad = this.velocidad + (this.frenando ? 4 * this.desaceleracion - 1 : this.desaceleracion) * 0.5;
                if (this.velocidad < 0) {
                    this.velocidad = 0;
                }
            }
            if (this.aceleracion < 0) {
                this.velocidad = this.velocidad - (this.frenando ? 4 * this.desaceleracion + 1 : this.desaceleracion) * 0.5;
                if (this.velocidad > 0) {
                    this.velocidad = 0;
                }
            }
        } else if (this.marcha == 0 && this.moviendo) {
            this.distancia = this.distancia + this.velocidad * 0.5;
            if (this.frenando) {
                if (this.aceleracion > 0) {
                    this.velocidad = this.velocidad + (this.frenando ? 4 * this.desaceleracion - 1 : this.desaceleracion + this.aceleracion) * 0.5;
                    if (this.velocidad < 0) {
                        this.velocidad = 0;
                    }
                } else if (this.aceleracion > 0) {
                    this.velocidad = this.velocidad + (this.frenando ? 4 * this.aceleracion + 1 : this.aceleracion + this.desaceleracion) * 0.5;
                    if (this.velocidad > 0) {
                        this.velocidad = 0;
                    }
                }
            }
        } else if (this.marcha < 0 && this.moviendo) {
            this.distancia = this.distancia + (this.velocidad * 0.5 + 0.5 * 0.5 * 0.5 * (this.aceleracion));
            this.velocidad = this.velocidad + (this.frenando ? 4 * this.aceleracion + 1 : this.aceleracion) * 0.5;
            if (this.velocidad < this.tope) {
                this.velocidad = this.tope;
            }
            if (this.velocidad > 0) {
                this.velocidad = 0;
            }
        } else {
            this.distancia = this.distancia + (this.velocidad * 0.5 - 0.5 * 0.5 * 0.5 * (this.desaceleracion));
            this.velocidad = this.velocidad - (this.frenando ? 4 * this.desaceleracion + 0.5 : this.desaceleracion) * 0.5;
            if (this.velocidad > 0) {
                this.velocidad = 0;
            }
        }
        if (this.velocidad == 0) {
            document.getElementById("ruta").src = "./Images/carreteraimg.jpg";
        } else if (compro) {
            document.getElementById("ruta").src = "./Images/carretera.gif";
        }
        try {
            if ((this.route[this.ubicacion].distance <= this.distancia && !compro2) || this.ubicacion == 0) {
                pintar(this.route[this.ubicacion].action);
                if (this.route[this.ubicacion].action == "Parada") {
                    this.distance=this.route[this.ubicacion].distance;
                    this.parada(this.route[this.ubicacion].duration);
                    this.ubicacion++;
                    pintar(this.route[this.ubicacion].action);
                }
                this.ubicacion++;
            }
        } catch (err) { }
        if (this.moviendo || this.velocidad != 0) {
            this.tiempo += 0.5;
        }
        document.getElementById('Velocidad').textContent = (Math.round(this.velocidad * (180 / 5))) / 10 + " km/h";
        document.getElementById('Distancia').textContent = (Math.round(this.distancia / (100))) / 10 + " km";
        document.getElementById('Tiempo').textContent = "Tiempo en movimiento: \n" + Math.floor(this.tiempo / 3600) + ":" + (Math.floor((this.tiempo / 3600 - Math.floor(this.tiempo / 3600)) * 60) + '').padStart(2, '0') + ":" + (Math.floor(((this.tiempo / 60) - Math.floor(this.tiempo / 60)) * 60) + '').padStart(2, '0');
        document.getElementById('VPromedio').textContent = "Velocidad Promedio: \n" + (this.tiempo != 0 ? (Math.round((this.distancia / this.tiempo) * (180 / 5))) / 10 : 0) + " km/h";
        document.getElementById('VelocidadA').textContent = (Math.round(this.velocidad * (180 / 5))) / 10 + " km/h";
        document.getElementById('DistanciaA').textContent = (Math.round(this.distancia / (100))) / 10 + " km";
    }
    parada = (time) => {
        let t = time;
        clearInterval(this.timer);
        document.getElementById("Parada").style.display = "flex";
        document.getElementById("stopTime").innerHTML = time;
        let tiempo2 = setInterval(() => {
            t--;
            document.getElementById("stopTime").innerHTML = t;
        }, 1000);
        let tiempo = setTimeout(() => {
            document.getElementById("Parada").style.display = "none"; 
            clearInterval(tiempo2);
            this.timer=setInterval(this.mover, 500);
        }, time*1000);
    }
    encender = async () => {
        if (!this.frenoMano) {
            return pintar("Pon el freno de mano antes");
        } else if (this.marcha != 0) {
            return pintar("Coloca el carro en neutro");
        } else if (this.encendido) {
            if (this.velocidad != 0) {
                return pintar("Para apagar el carro primero tiene que estar detenido");
            } else {
                this.encendido = false;
                document.getElementById("Enter").style.backgroundColor = "white";
                return pintar("Se apago el carro");
            }
        } else {
            this.encendido = true;
            document.getElementById("Enter").style.backgroundColor = "red";
            return pintar("Se encendio el carro");
        }
    }
    cambiarMarcha = async (aux) => {
        if (this.palanca == 1) {
            if (this.velocidad <= 25 / 3 && this.velocidad >= 0) {
                this.tope = 25 / 3;
                this.marcha = 1;
                this.aceleracion = 0.3;
            } else {
                this.palanca = aux;
                pintar("Para poner Primera debe tener una velocidad de entre 30 y  0 km/h");
            }
        } else if (this.palanca == 2) {
            if (this.velocidad <= 25 && this.velocidad > 125 / 9) {
                this.tope = 25;
                this.marcha = 3;
                this.aceleracion = 1.2;
            } else {
                this.palanca = aux;
                pintar("Para poner Tercera debe tener una velocidad de entre 90 y  50 km/h");
            }
        } else if (this.palanca == 3) {
            if (this.velocidad <= 125 / 3 && this.velocidad > 275 / 9) {
                this.marcha = 5;
                this.tope = 125 / 3;
                this.aceleracion = 2;
            } else {
                this.palanca = aux;
                pintar("Para poner Quinta debe tener una velocidad de entre 150 y  110 km/h");
            }
        } else if (this.palanca == 7) {
            if (this.velocidad <= 50 / 3 && this.velocidad > 50 / 9) {
                this.tope = 50 / 3;
                this.marcha = 2;
                this.aceleracion = 0.7;
            } else {
                this.palanca = aux;
                pintar("Para poner Segunda debe tener una velocidad de entre 60 y  20 km/h");
            }
        } else if (this.palanca == 8) {
            if (this.velocidad <= 100 / 3 && this.velocidad > 200 / 9) {
                this.tope = 100 / 3;
                this.marcha = 4;
                this.aceleracion = 1.6;
            } else {
                this.palanca = aux;
                pintar("Para poner Cuarta debe tener una velocidad de entre 120 y  80 km/h");
            }
        } else if (this.palanca == 9) {
            this.marcha = -1;
            this.tope = -25 / 9;
            this.aceleracion = -0.2;

        } else {
            this.marcha = 0;
        }
    }
    subirPalanca = async () => {
        let aux = this.palanca;
        if (this.palanca > 3) {
            this.palanca -= 3;
        }
        this.cambiarMarcha(aux);
        for (let i = 1; i <= 9; i++) {
            if (this.palanca == i) {
                document.getElementById("Bo" + i).style.backgroundColor = "red";
            } else {
                document.getElementById("Bo" + i).style.backgroundColor = "black";
            }
        }
        if (this.palanca != aux) {
            return pintar("Se movio la palanca de cambios a la posicion: " + this.palanca + " y se puso la marcha: " + this.marcha);
        }
    }
    bajarPalanca = async () => {
        let aux = this.palanca;
        if (this.palanca < 7) {
            if (this.palanca == 6) {
                if (this.velocidad == 0) {
                    this.palanca += 3;
                } else {
                    return pintar("Para poner la reversa se debe detener el vehiculo");
                }
            } else {
                this.palanca += 3;
            }
        }
        this.cambiarMarcha(aux);
        for (let i = 1; i <= 9; i++) {
            if (this.palanca == i) {
                document.getElementById("Bo" + i).style.backgroundColor = "red";
            } else {
                document.getElementById("Bo" + i).style.backgroundColor = "black";
            }
        } if (this.palanca != aux) {
            return pintar("Se movio la palanca de cambios a la posicion: " + this.palanca + " y se puso la marcha: " + this.marcha);
        }
    }
    derechaPalanca = async () => {
        let aux = this.palanca;
        if (this.palanca < 6 && this.palanca > 3) {
            this.palanca += 1;
        }
        this.cambiarMarcha(aux);
        for (let i = 1; i <= 9; i++) {
            if (this.palanca == i) {
                document.getElementById("Bo" + i).style.backgroundColor = "red";
            } else {
                document.getElementById("Bo" + i).style.backgroundColor = "black";
            }
        }
        return pintar("Se movio la palanca de cambios a la posicion: " + this.palanca + " y se puso la marcha: " + this.marcha);
    }
    izquierdaPalanca = async () => {
        let aux = this.palanca;
        if (this.palanca < 7 && this.palanca > 4) {
            this.palanca -= 1;
        }
        this.cambiarMarcha(aux);
        for (let i = 1; i <= 9; i++) {
            if (this.palanca == i) {
                document.getElementById("Bo" + i).style.backgroundColor = "red";
            } else {
                document.getElementById("Bo" + i).style.backgroundColor = "black";
            }
        }
        return pintar("Se movio la palanca de cambios a la posicion: " + this.palanca + " y se puso la marcha: " + this.marcha);
    }
    pisarClos = async () => {
        if (!this.clos) {
            pintar("Se piso el Clos");
        }
        this.clos = true;
    }
    dejarClos = async () => {
        if (this.clos) {
            pintar("Se solto el Clos");
        }
        this.clos = false;
    }
    ponerFreno = async () => {
        this.frenoMano = !this.frenoMano;
        if (this.velocidad == 0) {
            if (this.frenoMano) {
                document.getElementById("KeyM").style.backgroundColor = "red";
                return pintar("Se puso el freno de mano");
            } else {
                document.getElementById("KeyM").style.backgroundColor = "white";
                return pintar("Se quito el freno de mano");
            }
        } else {
            return pintar("Detenga primero el coche");
        }
    }
    frenar = async () => {
        if (this.velocidad >= 0 && this.marcha > 0) {
            if (this.aceleracion > 0) {
                this.aceleracion = (-this.aceleracion);
            }
            this.moviendo = true;
        }
        if (this.velocidad <= 0 && this.marcha > 0) {
            this.velocidad = 0;
            if (this.aceleracion < 0) {
                this.aceleracion = -this.aceleracion;
            }
            this.moviendo = false;
        }
        if (this.velocidad <= 0 && this.marcha == -1) {
            if (this.aceleracion < 0) {
                this.aceleracion = -this.aceleracion;
            }
            this.moviendo = true;
        }
        if (this.velocidad >= 0 && this.marcha == -1) {
            this.velocidad = 0;
            if (this.aceleracion > 0) {
                this.aceleracion = -this.aceleracion;
            }
            this.moviendo = false;
        }
        if (this.marcha == 0) {
            this.moviendo = false;
        }
        this.frenando = true;
        if (!this.frenando) {
            pintar("Se piso el Freno");
            console.log(this);
        }
    }
    dejarFreno = async () => {
        if (this.frenando) {
            if (this.velocidad >= 0 && this.marcha > 0) {
                this.cambiarMarcha(this.palanca);
                this.moviendo = false;
                if (this.aceleracion < 0) {
                    this.aceleracion = -this.aceleracion;
                }
            }
            if (this.velocidad >= 0 && this.marcha == -1) {
                this.cambiarMarcha(this.palanca);
                this.moviendo = false;
                if (this.aceleracion < 0) {
                    this.aceleracion = -this.aceleracion;
                }
            }
            pintar("Se solto el Freno");
        } this.frenando = false;
    }
    pausar = async () => {
        this.pausa = !this.pausa;
        if (this.pausa) {
            clearInterval(this.timer);
            document.getElementById("pant1").style.display = "none";
            document.getElementById("pant2").style.display = "block";
            if (document.getElementById("KeyS").style.backgroundColor == "red") {
                this.dejarFreno();
            } if (document.getElementById("KeyW").style.backgroundColor == "red") {
                this.dejarAcelerar();
            } if (document.getElementById("KeyE").style.backgroundColor == "red") {
                this.dejarClos();
            }
            navigator.geolocation.getCurrentPosition(this.mostrar, this.gestionarErrores);
        } else {
            this.timer = setInterval(this.mover, 500);
            document.getElementById("pant1").style.display = "block";
            document.getElementById("pant2").style.display = "none";
        }
    }
    mostrar = async (posicion) => {
        document.getElementById("presicion").innerHTML = "Precisión: " + posicion.coords.accuracy + " m";
        const myLatlng = { lat: posicion.coords.latitude, lng: posicion.coords.longitude };
        let mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude)
        };
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        const directionsService = new google.maps.DirectionsService();
        let centro = this.map.getCenter();
        const directionsRenderer = new google.maps.DirectionsRenderer({
            map: this.map,
            panel: document.getElementById("PanelR"),
        });
        let marker = new google.maps.Marker({
            position: myLatlng,
            map: this.map,
            title: "Destino",
        });
        this.map.addListener("center_changed", async () => {
            marker.setPosition(this.map.getCenter());
        });
        document.getElementById("OK").addEventListener("click", async () => { this.calculateAndDisplayRoute(directionsService, directionsRenderer, centro, this.map.getCenter()); });
    }

    gestionarErrores = async (error) => {
        window.alert('Error: ' + error.code + ' ' + error.message + '\n\nPor favor compruebe que está conectado a internet y habilite la opción permitir compartir ubicación física');
    }
    calculateAndDisplayRoute = async (directionsService, directionsRenderer, origin, destino) => {
        document.getElementById("volver").addEventListener('click', async () => {
            document.getElementById("P1").style.display = "flex";
            document.getElementById("P2").style.display = "none";
            document.getElementById("PanelR").innerHTML = "";
            this.map.setZoom(15);
        });
        document.getElementById("Ok2").addEventListener('click', () => {
            pintar('Se selecciono la ruta');
            let response = directionsRenderer.getDirections();
            document.getElementById("P2").style.display = "none";
            document.getElementById("P3").style.display = "flex";
            let aux = 0;
            for (let i = 0; i < response.routes[0].legs[0].steps.length + 1; i++) {
                if (i == response.routes[0].legs[0].steps.length) {
                    this.route.push({
                        distance: aux,
                        action: 'Llegaste a tu destino'
                    });
                } else {
                    this.route.push({
                        duration: response.routes[0].legs[0].steps[i].duration.value,
                        distance: aux,
                        action: response.routes[0].legs[0].steps[i].instructions
                    });
                    aux += response.routes[0].legs[0].steps[i].distance.value;
                }
            }
            let paradas = this.route.length == 1 ? 0 : this.route.length == 2 ? 1 : this.route.length == 3 ? 2 : Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < paradas; i++) {
                let temp = Math.floor(Math.random() * (this.route.length -1)) + 1;
                if (this.route[temp].action == "Parada") {
                    i--;
                } else {
                    this.route.splice(temp, 0, {
                        duration: Math.floor(Math.random() * 3) + 1,
                        distance: this.route[temp].distance,
                        action: "Parada"
                    });
                }
            }
            console.log(this.route);
            document.getElementById("Automatico").addEventListener('click', async () => {

            });
            document.getElementById("Manual").addEventListener('click', async () => {
                document.getElementById("P3").style.display = "none";
                document.getElementById("P4").style.display = "flex";
                document.getElementById("volver2").addEventListener('click', async () => {
                    this.pausar();
                });
                this.pausar();
            })
        });
        directionsService.route(
            {
                origin: origin,
                destination: destino,
                travelMode: google.maps.TravelMode.DRIVING,
            }, (response, status) => {
                if (status === "OK") {
                    directionsRenderer.setDirections(response);

                    document.getElementById("P1").style.display = "none";
                    document.getElementById("P2").style.display = "flex";
                } else {
                    window.alert("Directions request failed due to " + status);
                }
            }
        );
    }
}
let x;
let history = '';
//pintar mensaje
let pintar = (mensaje) => {
    x.historial.push(mensaje);
    document.getElementById('Panel').innerHTML = mensaje;
    history += '<div class="historialDiv">' + mensaje + '</div>';
    document.getElementById('Historial').innerHTML = history;
}
//Inicio
window.addEventListener('load', async () => {
    x = new Carro();
    document.getElementById('Velocidad').textContent = (Math.round(x.velocidad * (180 / 5))) / 10 + " km/h";
    document.getElementById('Distancia').textContent = (Math.round(x.distancia / (100))) / 10 + " km";
    document.getElementById("Bo" + x.palanca).style.backgroundColor = "red";
    if (x.frenoMano) {
        document.getElementById("KeyM").style.backgroundColor = "red";
    }
    return pintar("Enciende el carro");
});

//Undir tecla
window.addEventListener('keydown', async (event) => {
    console.log(event.keyCode);
    try {
        if (event.code != "KeyC" && event.code != "KeyZ" && event.code != "KeyM" && event.code != "Enter") {
            document.getElementById(event.code).style.backgroundColor = "red";
        }
    } catch (err) { }
    if (!this.pausa) {
        if (event.keyCode == 13) {
            return x.encender();
        }
        if (event.keyCode == 77) {
            return x.ponerFreno();
        }
        //eventos que necesitan que el carro este encendido
        if (x.encendido) {
            if (event.keyCode == 80) {
                x.pausar();
            }
            if (x.route.length > 0) {
                if (event.keyCode == 87) {
                    if (document.getElementById("KeyS").style.backgroundColor != "red") {
                        return x.acelerar();
                    } else {
                        document.getElementById("KeyW").style.backgroundColor = "white"
                        return pintar("Suelte primero el Freno");
                    }
                }
                if (event.keyCode == 69) {
                    return x.pisarClos();
                }
                if (event.keyCode == 83) {
                    if (document.getElementById("KeyW").style.backgroundColor != "red") {
                        return x.frenar();
                    } else {
                        document.getElementById("KeyS").style.backgroundColor = "white"
                        return pintar("Suelte primero el acelerador");
                    }
                }
            } else {
                pintar('Selecciona primero un destino en el tablero de control "P"');
            }
        } else {
            if (!(event.keyCode == 13 || event.keyCode == 77 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40 || event.keyCode == 37)) {
                return pintar("Debes encender el carro antes");
            }
        }
        //Cambios
        if (x.clos || !x.encendido) {
            if (event.keyCode == 38) {
                return x.subirPalanca();
            }

            if (event.keyCode == 40) {
                return x.bajarPalanca();
            }

            if (event.keyCode == 39) {
                return x.derechaPalanca();
            }

            if (event.keyCode == 37) {
                return x.izquierdaPalanca();
            }
        } else {
            if (event.keyCode == 38) {
                return pintar("Para hacer un cambio el carro debe estar apagado o con el clos activado");
            }

            if (event.keyCode == 40) {
                return pintar("Para hacer un cambio el carro debe estar apagado o con el clos activado");
            }

            if (event.keyCode == 39) {
                return pintar("Para hacer un cambio el carro debe estar apagado o con el clos activado");
            }

            if (event.keyCode == 37) {
                return pintar("Para hacer un cambio el carro debe estar apagado o con el clos activado");
            }
        }
    }
})
//Soltar tecla

window.addEventListener('keyup', async (event) => {
    try {
        if (event.code != "KeyC" && event.code != "KeyZ" && event.code != "KeyM" && event.code != "Enter") {
            document.getElementById(event.code).style.backgroundColor = "white";
        }
    } catch (err) { }
    if (!this.pausa) {
        if (event.keyCode == 87) {
            x.dejarAcelerar();
        }
        if (event.keyCode == 69) {
            x.dejarClos();
        }
        if (event.keyCode == 83) {
            x.dejarFreno();
        }
    }
})