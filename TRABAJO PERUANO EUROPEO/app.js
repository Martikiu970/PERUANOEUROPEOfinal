"use strict";

/*=========================================================*
* CONOCIENDO TARMA
* APP PRINCIPAL
*=========================================================*/


/*=========================================================*
* ESTADO GLOBAL
*=========================================================*/

const App = {

    map: null,

    lugares: [],

    personajes: [],

    preguntas: [],

    fechas: [],

    curiosidades: [],

    marcadorActual: null,

    lugarActual: null,

    score: 0,

    progreso: 0,

    tiempo: 0,

    intervalo: null,

    juegoFinalizado: false

};


/*=========================================================*
* INICIO
*=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    iniciarAplicacion

);


async function iniciarAplicacion() {

    try {

        await cargarDatos();

        inicializarMapa();

        crearMarcadores();

        cargarPartida();

        restaurarMarcadores();

        actualizarHUD();

        iniciarCronometro();

    }

    catch (error) {

        console.error(
            "Error iniciando aplicación:",
            error
        );


        const loader =
            document.getElementById("loader");


        if (loader) {

            loader.innerHTML = `

                <div style="
                    text-align:center;
                    padding:30px;
                ">

                    <h2>
                        ⚠️ Error al cargar el juego
                    </h2>

                    <p>
                        ${error.message}
                    </p>

                </div>

            `;

        }

        return;

    }


    finally {

        ocultarLoader();

    }

}


/*=========================================================*
* CARGAR JSON
*=========================================================*/

async function cargarDatos() {

    const archivos = [

        "data/lugares.json",

        "data/personajes.json",

        "data/preguntas.json",

        "data/fechas.json",

        "data/curiosidades.json"

    ];


    const respuestas = await Promise.all(

        archivos.map(

            ruta =>

                fetch(
                    ruta + "?v=" + Date.now()
                )

        )

    );


    respuestas.forEach(

        (respuesta, indice) => {

            if (!respuesta.ok) {

                throw new Error(

                    "No se pudo cargar " +
                    archivos[indice]

                );

            }

        }

    );


    App.lugares =
        await respuestas[0].json();


    App.personajes =
        await respuestas[1].json();


    App.preguntas =
        await respuestas[2].json();


    App.fechas =
        await respuestas[3].json();


    App.curiosidades =
        await respuestas[4].json();


    if (!Array.isArray(App.lugares)) {

        throw new Error(
            "lugares.json no tiene un formato válido."
        );

    }

}


/*=========================================================*
* LOADER
*=========================================================*/

function ocultarLoader() {

    const loader =
        document.getElementById("loader");


    if (!loader) {

        return;

    }


    loader.style.opacity = "0";


    setTimeout(

        () => {

            loader.style.display = "none";

        },

        500

    );

}


/*=========================================================*
* HUD
*=========================================================*/

function actualizarHUD() {

    const score =
        document.getElementById("score");


    const progress =
        document.getElementById("progress");


    if (score) {

        score.textContent =
            App.score;

    }


    if (progress) {

        progress.textContent =

            App.progreso +
            "/" +
            App.lugares.length;

    }

}


/*=========================================================*
* FINALIZAR JUEGO
*=========================================================*/

function verificarFinal() {

    if (

        App.progreso <
        App.lugares.length

    ) {

        return;

    }


    if (App.juegoFinalizado) {

        return;

    }


    App.juegoFinalizado = true;


    detenerCronometro();

    mostrarTiempoFinal();

    reproducirVictoria();

    celebrarFinal();

    detenerMusica();


    const finish =
        document.getElementById("finish");


    if (finish) {

        finish.classList.add(
            "active"
        );

    }


    const finalScore =
        document.getElementById(
            "finalScore"
        );


    if (finalScore) {

        finalScore.textContent =
            App.score;

    }

}


/*=========================================================*
* REINICIAR
*=========================================================*/

const botonRestart =
    document.getElementById(
        "restart"
    );


if (botonRestart) {

    botonRestart.addEventListener(

        "click",

        () => {

            reiniciarJuego();

        }

    );

}