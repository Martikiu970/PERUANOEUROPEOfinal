"use strict";

/*=========================================================*
* MAPA
*=========================================================*/


/*=========================================================*
* ICONO ROJO
*=========================================================*/

const iconoRojo = new L.Icon({

    iconUrl:
        "img/iconos/marker-red.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [
        25,
        41
    ],

    iconAnchor: [
        12,
        41
    ],

    popupAnchor: [
        1,
        -34
    ],

    shadowSize: [
        41,
        41
    ]

});


/*=========================================================*
* ICONO AMARILLO
*=========================================================*/

const iconoAmarillo = new L.Icon({

    iconUrl:
        "img/iconos/marker-yellow.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [
        25,
        41
    ],

    iconAnchor: [
        12,
        41
    ],

    popupAnchor: [
        1,
        -34
    ],

    shadowSize: [
        41,
        41
    ]

});


/*=========================================================*
* ICONO VERDE
*=========================================================*/

const iconoVerde = new L.Icon({

    iconUrl:
        "img/iconos/marker-green.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [
        25,
        41
    ],

    iconAnchor: [
        12,
        41
    ],

    popupAnchor: [
        1,
        -34
    ],

    shadowSize: [
        41,
        41
    ]

});


/*=========================================================*
* INICIALIZAR MAPA
*=========================================================*/

function inicializarMapa() {

    App.map = L.map(

        "map",

        {

            zoomControl: true,

            minZoom: 16,

            maxZoom: 20

        }

    );


    App.map.setView(

        [
            -11.4189,
            -75.6897
        ],

        17

    );


    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            attribution:
                "© OpenStreetMap"

        }

    ).addTo(

        App.map

    );

}


/*=========================================================*
* CREAR MARCADORES
*=========================================================*/

function crearMarcadores() {

    App.lugares.forEach(

        lugar => {


            const marker =

                L.marker(

                    [
                        Number(lugar.lat),
                        Number(lugar.lng)
                    ],

                    {

                        icon:
                            lugar.visitado
                                ? iconoVerde
                                : iconoRojo

                    }

                ).addTo(

                    App.map

                );


            marker.bindTooltip(

                lugar.nombre,

                {

                    direction: "top",

                    offset: [
                        0,
                        -20
                    ]

                }

            );


            marker.on(

                "click",

                () => {


                    /* =====================================
                       RESTAURAR MARCADOR ANTERIOR
                    ===================================== */

                    if (

                        App.marcadorActual &&
                        App.marcadorActual !== marker

                    ) {

                        const anterior =
                            App.lugarActual;


                        if (
                            anterior &&
                            anterior.visitado
                        ) {

                            App.marcadorActual.setIcon(
                                iconoVerde
                            );

                        }

                        else {

                            App.marcadorActual.setIcon(
                                iconoRojo
                            );

                        }

                    }


                    /* =====================================
                       GUARDAR ACTUAL
                    ===================================== */

                    App.lugarActual =
                        lugar;

                    App.marcadorActual =
                        marker;


                    /* =====================================
                       AMARILLO MIENTRAS SE EXPLORA
                    ===================================== */

                    if (!lugar.visitado) {

                        marker.setIcon(
                            iconoAmarillo
                        );

                    }


                    /* =====================================
                       ABRIR PANEL
                    ===================================== */

                    abrirPanel(
                        lugar
                    );

                }

            );


            lugar.marker =
                marker;

        }

    );

}


/*=========================================================*
* COMPLETAR LUGAR
*=========================================================*/

function completarLugar(id) {

    const lugar =
        App.lugares.find(

            l =>
                Number(l.id) ===
                Number(id)

        );


    if (!lugar) {

        return;

    }


    lugar.visitado = true;


    if (lugar.marker) {

        lugar.marker.setIcon(
            iconoVerde
        );

    }


    guardarPartida();

}


/*=========================================================*
* CENTRAR LUGAR
*=========================================================*/

function irLugar(id) {

    const lugar =
        App.lugares.find(

            l =>
                Number(l.id) ===
                Number(id)

        );


    if (!lugar) {

        return;

    }


    App.map.flyTo(

        [
            Number(lugar.lat),
            Number(lugar.lng)
        ],

        18,

        {

            duration: 1.4

        }

    );

}


/*=========================================================*
* DESBLOQUEAR MAPA
*=========================================================*/

function desbloquearMapa() {

    if (!App.map) {

        return;

    }


    App.map.dragging.enable();

    App.map.scrollWheelZoom.enable();

    App.map.doubleClickZoom.enable();

}


/*=========================================================*
* BLOQUEAR MAPA
*=========================================================*/

function bloquearMapa() {

    if (!App.map) {

        return;

    }


    App.map.dragging.disable();

    App.map.scrollWheelZoom.disable();

    App.map.doubleClickZoom.disable();

}