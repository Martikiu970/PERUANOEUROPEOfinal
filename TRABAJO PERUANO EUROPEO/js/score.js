"use strict";

/*=========================================================
                    SCORE
=========================================================*/

const SCORE_POR_ACIERTO = 10;

/*=========================================================
                SUMAR PUNTOS
=========================================================*/

function sumarPuntos(){

    App.score += SCORE_POR_ACIERTO;

    actualizarScore();

    guardarPartida();

}

/*=========================================================
                RESTAR PUNTOS
=========================================================*/

function restarPuntos(valor = 0){

    App.score -= valor;

    if(App.score < 0){

        App.score = 0;

    }

    actualizarScore();

}

/*=========================================================
            ACTUALIZAR SCORE
=========================================================*/

function actualizarScore(){

    document.getElementById("score").textContent = App.score;

}

/*=========================================================
            AUMENTAR PROGRESO
=========================================================*/

function aumentarProgreso(){

    guardarPartida();

    App.progreso++;

    document.getElementById("progress").textContent =

        App.progreso +

        "/" +

        App.lugares.length;

}

/*=========================================================
            REINICIAR SCORE
=========================================================*/

function reiniciarScore(){

    App.score = 0;

    App.progreso = 0;

    actualizarScore();

    document.getElementById("progress").textContent =

        "0/" +

        App.lugares.length;

}

/*=========================================================
            PORCENTAJE
=========================================================*/

function obtenerPorcentaje(){

    if(App.lugares.length===0){

        return 0;

    }

    return Math.round(

        (App.progreso/App.lugares.length)*100

    );

}

/*=========================================================
        TEXTO FINAL
=========================================================*/

function obtenerMensajeFinal(){

    const porcentaje = obtenerPorcentaje();

    if(porcentaje===100){

        return "¡Excelente! Has completado todo el recorrido.";

    }

    if(porcentaje>=80){

        return "Muy buen trabajo.";

    }

    if(porcentaje>=60){

        return "Buen esfuerzo.";

    }

    return "Sigue explorando Tarma.";

}