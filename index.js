'use-strict';
//Objeto Carro
class Carro {
    constructor() {
        this.moviendo = false;
        this.clos = false;
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
        if (this.moviendo) {
            pintar("Se solto el acelerador");
        }
        this.moviendo = false;
    }
    mover = async () => {
        let compro = this.velocidad == 0;
        if (this.moviendo || this.velocidad != 0) {
            this.tiempo += 0.5;
        }
        if (this.marcha > 0 && this.moviendo) {
            this.distancia = this.distancia + (this.velocidad * 0.5 + 0.5 * 0.5 * 0.5 * (this.aceleracion + this.desaceleracion));
            this.velocidad = this.velocidad + (this.aceleracion + this.desaceleracion) * 0.5;
            if (this.velocidad > this.tope) {
                this.velocidad = this.tope;
            }
        } else if (this.marcha > 0) {
            this.distancia = this.distancia + (this.velocidad * 0.5 + 0.5 * 0.5 * 0.5 * (this.desaceleracion));
            this.velocidad = this.velocidad + (this.desaceleracion) * 0.5;
            if (this.velocidad < 0) {
                this.velocidad = 0;
            }
        } else if (this.marcha == 0 && !this.moviendo) {
            this.distancia = this.distancia + (this.velocidad * 0.5 + 0.5 * 0.5 * 0.5 * (this.aceleracion + this.desaceleracion));
            this.velocidad = this.velocidad + (this.aceleracion + this.desaceleracion) * 0.5;
            if (this.velocidad < 0) {
                this.velocidad = 0;
            }
        } else if (this.marcha == 0 && this.moviendo) {
            this.distancia = this.distancia + this.velocidad * 0.5;
        } else if (this.marcha < 0 && this.moviendo) {
            this.distancia = this.distancia + (this.velocidad * 0.5 + 0.5 * 0.5 * 0.5 * (this.aceleracion));
            this.velocidad = this.velocidad + (this.aceleracion) * 0.5;
            if (this.velocidad < this.tope) {
                this.velocidad = this.tope;
            }
        } else {
            this.distancia = this.distancia + (this.velocidad * 0.5 - 0.5 * 0.5 * 0.5 * (this.desaceleracion));
            this.velocidad = this.velocidad - (this.desaceleracion) * 0.5;
            if (this.velocidad > 0) {
                this.velocidad = 0;
            }
        }
        if (this.velocidad == 0) {
            document.getElementById("ruta").src = "./Images/carreteraimg.jpg";
        } else if (compro) {
            document.getElementById("ruta").src = "./Images/carretera.gif";
        }
        document.getElementById('Velocidad').textContent = (Math.round(x.velocidad * (180 / 5))) / 10 + " km/h";
        document.getElementById('Distancia').textContent = (Math.round(x.distancia / (100))) / 10 + " km";
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
            this.aceleracion = 0;
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
        if (this.frenoMano) {
            if (this.velocidad == 0) {
                document.getElementById("KeyM").style.backgroundColor = "red";
                return pintar("Se puso el freno de mano");
            } else {
                return pintar("Detenga primero el coche");
            }
        } else {
            document.getElementById("KeyM").style.backgroundColor = "white";
            return pintar("Se quito el freno de mano");
        }
    }
    frenar = async () => {
        if (this.velocidad > 0 && this.marcha > 0) {
            if (this.aceleracion > 0) {
                this.aceleracion = -this.aceleracion - 1;
            }
            this.moviendo = true;
        }
        if (this.velocidad < 0 && this.marcha > 0) {
            this.velocidad = 0;
            if (this.aceleracion < 0) {
                this.aceleracion = -this.aceleracion + 1;
            }
            this.moviendo = false;
        }
        if (this.velocidad < 0 && this.marcha == -1) {
            if (this.aceleracion < 0) {
                this.aceleracion = -this.aceleracion + 1;
            }
            this.moviendo = true;
        }
        if (this.velocidad > 0 && this.marcha == -1) {
            this.velocidad = 0;
            if (this.aceleracion > 0) {
                this.aceleracion = -this.aceleracion - 1;
            }
            this.moviendo = false;
        }
        if (this.marcha == 0 && this.aceleracion > 0 && this.velocidad > 0) {
            if (this.desaceleracion < 0.5) {
                this.desaceleracion = this.desaceleracion - 0.5;
            }
        }
        if (this.marcha == 0 && this.aceleracion > 0 && this.velocidad < 0) {
            if (this.desaceleracion > 0.5) {                
                this.velocidad=0;
                this.desaceleracion = this.desaceleracion + 0.5;
            }
        }
        if (this.marcha == 0 && this.aceleracion < 0 && this.velocidad < 0) {
            if (this.desaceleracion < -0.5) {
                this.desaceleracion = this.desaceleracion - 0.5;
            }
        }
        if (this.marcha == 0 && this.aceleracion < 0 && this.velocidad > 0) {
            if (this.desaceleracion > -0.5) {
                this.velocidad=0;
                this.desaceleracion = this.desaceleracion + 0.5;
            }
        }
    }
}
let x;
let ruta = [];
//pintar mensaje
let pintar = (mensaje) => {
    x.historial.push(mensaje);
    document.getElementById('Panel').textContent = mensaje;
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
})

//Undir tecla
window.addEventListener('keydown', async (event) => {
    console.log(event.keyCode);
    try {
        if (event.code != "KeyC" && event.code != "KeyZ" && event.code != "KeyM" && event.code != "Enter") {
            document.getElementById(event.code).style.backgroundColor = "red";
        }
    } catch (err) { }
    if (event.keyCode == 13) {
        return x.encender();
    }
    if (event.keyCode == 77) {
        return x.ponerFreno();
    }
    //eventos que necesitan que el carro este encendido
    if (x.encendido) {
        if (event.keyCode == 87) {
            return x.acelerar();
        }
        if (event.keyCode == 69) {
            return x.pisarClos();
        }
        if (event.keyCode == 83) {
            if (document.getElementById("KeyW").style.backgroundColor != "red") {
                return x.frenar();
            } else {
                return pintar("Suelte primero el acelerador");
            }
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
})
//Soltar tecla

window.addEventListener('keyup', async (event) => {
    try {
        if (event.code != "KeyC" && event.code != "KeyZ" && event.code != "KeyM" && event.code != "Enter") {
            document.getElementById(event.code).style.backgroundColor = "white";
        }
    } catch (err) { }
    if (event.keyCode == 87) {
        x.dejarAcelerar();
    }
    if (event.keyCode == 69) {
        x.dejarClos();
    }
})