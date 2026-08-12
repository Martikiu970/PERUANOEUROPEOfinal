"use strict";

/*=========================================================
                    EFECTOS
=========================================================*/

/*=========================================================
                CONFETI
=========================================================*/

function lanzarConfeti(){

    confetti({

        particleCount:150,

        spread:90,

        origin:{
            y:0.6
        }

    });

}

/*=========================================================
        CONFETI LATERAL
=========================================================*/

function lanzarConfetiLateral(){

    confetti({

        particleCount:80,

        angle:60,

        spread:55,

        origin:{
            x:0
        }

    });

    confetti({

        particleCount:80,

        angle:120,

        spread:55,

        origin:{
            x:1
        }

    });

}

/*=========================================================
        CELEBRACIÓN FINAL
=========================================================*/

function celebrarFinal(){

    const duracion = 5000;

    const fin = Date.now() + duracion;

    (function frame(){

        confetti({

            particleCount:4,

            angle:60,

            spread:60,

            origin:{
                x:0
            }

        });

        confetti({

            particleCount:4,

            angle:120,

            spread:60,

            origin:{
                x:1
            }

        });

        if(Date.now() < fin){

            requestAnimationFrame(frame);

        }

    })();

}

/*=========================================================
        EFECTO BOTÓN
=========================================================*/

function efectoBoton(elemento){

    elemento.animate(

        [

            {

                transform:"scale(1)"

            },

            {

                transform:"scale(1.08)"

            },

            {

                transform:"scale(1)"

            }

        ],

        {

            duration:250

        }

    );

}

/*=========================================================
        EFECTO TARJETA
=========================================================*/

function efectoPanel(){

    const panel = document.getElementById("panel");

    panel.animate(

        [

            {

                transform:"translateX(100%)"

            },

            {

                transform:"translateX(0)"

            }

        ],

        {

            duration:350,

            easing:"ease-out"

        }

    );

}

/*=========================================================
        EFECTO CORRECTO
=========================================================*/

function efectoCorrecto(){

    document.body.animate(

        [

            {

                background:"#ffffff"

            },

            {

                background:"#C8E6C9"

            },

            {

                background:"#ffffff"

            }

        ],

        {

            duration:450

        }

    );

}

/*=========================================================
        EFECTO ERROR
=========================================================*/

function efectoError(){

    document.body.animate(

        [

            {

                transform:"translateX(0)"

            },

            {

                transform:"translateX(-8px)"

            },

            {

                transform:"translateX(8px)"

            },

            {

                transform:"translateX(0)"

            }

        ],

        {

            duration:250

        }

    );

}