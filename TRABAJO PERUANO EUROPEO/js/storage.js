"use strict";

/*=========================================================
                    STORAGE
=========================================================*/

const STORAGE_KEY = "conociendo_tarma";

/*=========================================================
                GUARDAR
=========================================================*/

function guardarPartida(){

    const datos = {

        score: App.score,

        progreso: App.progreso,

        tiempo: App.tiempo,

        visitados: App.lugares.map(lugar => ({

            id: lugar.id,

            visitado: lugar.visitado === true

        }))

    };

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(datos)

    );

}

/*=========================================================
                CARGAR
=========================================================*/

function cargarPartida(){

    const datos = localStorage.getItem(

        STORAGE_KEY

    );

    if(!datos){

        return;

    }

    const partida = JSON.parse(datos);

    App.score = partida.score || 0;

    App.progreso = partida.progreso || 0;

    App.tiempo = partida.tiempo || 0;

    if(Array.isArray(partida.visitados)){

        partida.visitados.forEach(item=>{

            const lugar = App.lugares.find(

                l => l.id === item.id

            );

            if(lugar){

                lugar.visitado = item.visitado;

            }

        });

    }

    actualizarHUD();

}
/*=========================================================
        RESTAURAR MARCADORES
=========================================================*/

function restaurarMarcadores(){

    App.lugares.forEach(lugar=>{

        if(

            lugar.visitado &&

            lugar.marker

        ){

            lugar.marker.setIcon(

                iconoVerde

            );

        }

    });

}
/*=========================================================
            BORRAR PARTIDA
=========================================================*/

function borrarPartida(){

    localStorage.removeItem(

        STORAGE_KEY

    );

}
/*=========================================================
            REINICIAR TODO
=========================================================*/

function reiniciarJuego(){

    borrarPartida();

    location.reload();

}
