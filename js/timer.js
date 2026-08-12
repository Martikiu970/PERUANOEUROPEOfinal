"use strict";

/*=========================================================
                    CRONÓMETRO
=========================================================*/

let segundos = 0;

/*=========================================================
                INICIAR
=========================================================*/

function iniciarCronometro(){

    detenerCronometro();

    App.intervalo = setInterval(() => {

        segundos++;

        guardarPartida();

        App.tiempo = segundos;

        actualizarCronometro();

    },1000);

}

/*=========================================================
                DETENER
=========================================================*/

function detenerCronometro(){

    if(App.intervalo){

        clearInterval(App.intervalo);

        App.intervalo = null;

    }

}

/*=========================================================
                REINICIAR
=========================================================*/

function reiniciarCronometro(){

    detenerCronometro();

    segundos = 0;

    App.tiempo = 0;

    actualizarCronometro();

}

/*=========================================================
            ACTUALIZAR PANTALLA
=========================================================*/

function actualizarCronometro(){

    const minutos = Math.floor(segundos / 60);

    const restoSegundos = segundos % 60;

    const texto =

        String(minutos).padStart(2,"0")

        + ":"

        + String(restoSegundos).padStart(2,"0");

    document.getElementById("timer").textContent = texto;

}

/*=========================================================
            TIEMPO FORMATEADO
=========================================================*/

function obtenerTiempo(){

    const minutos = Math.floor(segundos / 60);

    const restoSegundos = segundos % 60;

    return (

        String(minutos).padStart(2,"0")

        + ":"

        + String(restoSegundos).padStart(2,"0")

    );

}

/*=========================================================
            MOSTRAR TIEMPO FINAL
=========================================================*/

function mostrarTiempoFinal(){

    const elemento = document.getElementById("finalTime");

    if(elemento){

        elemento.textContent = obtenerTiempo();

    }

}