"use strict";

/*=========================================================*
* QUIZ
*=========================================================*/


let preguntasLugar = [];

let indicePregunta = 0;

let lugarQuiz = null;


/*=========================================================*
* INICIAR PREGUNTA
*=========================================================*/

function iniciarPregunta(lugar) {

    if (!lugar) {

        return;

    }


    preguntasLugar =
        App.preguntas.filter(

            p =>

                Number(p.lugar) ===
                Number(lugar.id)

        );


    if (
        preguntasLugar.length === 0
    ) {

        Swal.fire({

            icon: "info",

            title: "Sin preguntas",

            text:
                "Este lugar aún no tiene preguntas."

        });

        return;

    }


    lugarQuiz =
        lugar;


    indicePregunta =
        0;


    mostrarPregunta();

}


/*=========================================================*
* MOSTRAR PREGUNTA
*=========================================================*/

function mostrarPregunta() {

    const pregunta =
        preguntasLugar[
            indicePregunta
        ];


    if (!pregunta) {

        return;

    }


    const quiz =
        document.getElementById(
            "quiz"
        );


    if (quiz) {

        quiz.classList.add(
            "active"
        );

    }


    const question =
        document.getElementById(
            "question"
        );


    if (question) {

        question.textContent =

            "Pregunta " +

            (
                indicePregunta + 1
            ) +

            " de " +

            preguntasLugar.length +

            ": " +

            pregunta.pregunta;

    }


    const answers =
        document.getElementById(
            "answers"
        );


    if (!answers) {

        return;

    }


    answers.innerHTML = "";


    pregunta.opciones.forEach(

        (texto, indice) => {


            const boton =
                document.createElement(
                    "button"
                );


            boton.className =
                "answer";


            boton.textContent =
                texto;


            boton.onclick = () => {

                responderPregunta(
                    indice
                );

            };


            answers.appendChild(
                boton
            );

        }

    );

}


/*=========================================================*
* RESPONDER
*=========================================================*/

function responderPregunta(
    respuesta
) {

    const quiz =
        document.getElementById(
            "quiz"
        );


    if (quiz) {

        quiz.classList.remove(
            "active"
        );

    }


    const pregunta =
        preguntasLugar[
            indicePregunta
        ];


    if (!pregunta) {

        return;

    }


    const correcta =

        Number(respuesta) ===
        Number(pregunta.correcta);


    if (correcta) {

        respuestaCorrecta();

    }

    else {

        respuestaIncorrecta();

    }

}


/*=========================================================*
* RESPUESTA CORRECTA
*=========================================================*/

function respuestaCorrecta() {

    reproducirCorrecto();

    lanzarConfeti();

    efectoCorrecto();

    sumarPuntos();


    Swal.fire({

        icon: "success",

        title: "¡Correcto!",

        text:
            "Excelente respuesta."

    }).then(

        () => {

            siguientePregunta();

        }

    );

}


/*=========================================================*
* RESPUESTA INCORRECTA
*=========================================================*/

function respuestaIncorrecta() {

    reproducirIncorrecto();

    efectoError();


    Swal.fire({

        icon: "error",

        title:
            "Respuesta incorrecta",

        text:
            "Lee nuevamente la información e inténtalo otra vez."

    }).then(

        () => {

            siguientePregunta();

        }

    );

}


/*=========================================================*
* SIGUIENTE PREGUNTA
*=========================================================*/

function siguientePregunta() {

    indicePregunta++;


    if (

        indicePregunta <
        preguntasLugar.length

    ) {

        mostrarPregunta();

        return;

    }


    finalizarCalle();

}


/*=========================================================*
* FINALIZAR CALLE
*=========================================================*/

function finalizarCalle() {

    if (!lugarQuiz) {

        return;

    }


    /*
     * SOLO AQUÍ se marca como visitada.
     */

    if (!lugarQuiz.visitado) {


        /*===============================================
          AUMENTAR PROGRESO
        ===============================================*/

        aumentarProgreso();


        /*===============================================
          COMPLETAR LUGAR
        ===============================================*/

        completarLugar(
            lugarQuiz.id
        );


        /*===============================================
          GUARDAR
        ===============================================*/

        guardarPartida();


        /*===============================================
          ACTUALIZAR HUD
        ===============================================*/

        actualizarHUD();


        /*===============================================
          COMPROBAR FINAL
        ===============================================*/

        verificarFinal();

    }


    lugarQuiz = null;

}


/*=========================================================*
* CERRAR QUIZ
*=========================================================*/

function cerrarQuiz() {

    const quiz =
        document.getElementById(
            "quiz"
        );


    if (quiz) {

        quiz.classList.remove(
            "active"
        );

    }

}