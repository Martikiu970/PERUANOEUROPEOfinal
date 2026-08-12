"use strict";

/*=========================================================
                    SONIDOS
=========================================================*/

const sonidoCorrecto =
    document.getElementById("correctSound");

const sonidoIncorrecto =
    document.getElementById("wrongSound");

const sonidoVictoria =
    document.getElementById("victorySound");

const musicaFondo =
    document.getElementById("backgroundMusic");

/*=========================================================
                CONFIGURACIÓN
=========================================================*/

musicaFondo.volume = 0.25;

sonidoCorrecto.volume = 0.9;

sonidoIncorrecto.volume = 0.9;

sonidoVictoria.volume = 1;

/*=========================================================
                MÚSICA
=========================================================*/

function iniciarMusica(){

    musicaFondo.play().catch(()=>{

        console.log(
            "La música iniciará cuando el usuario interactúe."
        );

    });

}

function detenerMusica(){

    musicaFondo.pause();

}

/*=========================================================
            RESPUESTA CORRECTA
=========================================================*/

function reproducirCorrecto(){

    sonidoCorrecto.currentTime = 0;

    sonidoCorrecto.play();

}

/*=========================================================
            RESPUESTA INCORRECTA
=========================================================*/

function reproducirIncorrecto(){

    sonidoIncorrecto.currentTime = 0;

    sonidoIncorrecto.play();

}

/*=========================================================
                VICTORIA
=========================================================*/

function reproducirVictoria(){

    sonidoVictoria.currentTime = 0;

    sonidoVictoria.play();

}

/*=========================================================
            SILENCIAR
=========================================================*/

function silenciarTodo(){

    musicaFondo.muted = true;

    sonidoCorrecto.muted = true;

    sonidoIncorrecto.muted = true;

    sonidoVictoria.muted = true;

}

/*=========================================================
            ACTIVAR SONIDO
=========================================================*/

function activarTodo(){

    musicaFondo.muted = false;

    sonidoCorrecto.muted = false;

    sonidoIncorrecto.muted = false;

    sonidoVictoria.muted = false;

}

/*=========================================================
        INICIAR AL PRIMER CLICK
=========================================================*/

document.addEventListener(

    "click",

    function iniciar(){

        iniciarMusica();

        document.removeEventListener(

            "click",

            iniciar

        );

    },

    {

        once:true

    }

);