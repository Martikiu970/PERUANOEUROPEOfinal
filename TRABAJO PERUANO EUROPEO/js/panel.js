"use strict";

/* =========================================================
   CONOCIENDO TARMA
   PANEL PRINCIPAL
   ========================================================= */


/* =========================================================
   ABRIR PANEL
   ========================================================= */

function abrirPanel(lugar) {

    console.log("=================================");
    console.log("ABRIENDO PANEL");
    console.log("Lugar:", lugar.nombre);
    console.log("Video:", lugar.video);
    console.log("=================================");


    const panel =
        document.getElementById("panel");


    if (!panel) {

        console.error(
            "ERROR: No existe el elemento #panel"
        );

        return;

    }


    /* =====================================================
       INFORMACIÓN DE LA CALLE
    ===================================================== */

    colocarTexto(
        "streetName",
        lugar.nombre
    );


    colocarTexto(
        "streetLocation",
        lugar.ubicacion
    );


    colocarTexto(
        "streetHistory",
        lugar.historia
    );


    colocarTexto(
        "streetRepresents",
        lugar.representa
    );


    colocarTexto(
        "streetWhy",
        lugar.porque
    );


    colocarTexto(
        "streetMessage",
        lugar.mensaje
    );


    /* =====================================================
       IMAGEN DE LA CALLE
    ===================================================== */

    const imagen =
        document.getElementById(
            "streetImage"
        );


    if (imagen) {

        imagen.src =
            lugar.imagen || "";

        imagen.alt =
            lugar.nombre || "";

    }


    /* =====================================================
       AUDIO
    ===================================================== */

    prepararAudio(
        lugar.audio
    );


    /* =====================================================
       VIDEO GOOGLE DRIVE
    ===================================================== */

    prepararVideoDrive(
        lugar.video
    );


    /* =====================================================
       PERSONAJE
    ===================================================== */

    cargarPersonaje(
        lugar.personaje
    );


    /* =====================================================
       FECHAS
    ===================================================== */

    cargarFechas(
        lugar.id
    );


    /* =====================================================
       CURIOSIDAD
    ===================================================== */

    cargarCuriosidad(
        lugar.id
    );


    /* =====================================================
       MOSTRAR PANEL
    ===================================================== */

    panel.classList.add(
        "active"
    );


    /* =====================================================
       BOTÓN QUIZ
    ===================================================== */

    configurarBotonQuiz(
        lugar
    );

}


/* =========================================================
   COLOCAR TEXTO
   ========================================================= */

function colocarTexto(
    id,
    texto
) {

    const elemento =
        document.getElementById(id);


    if (!elemento) {

        console.warn(
            "Elemento no encontrado:",
            id
        );

        return;

    }


    elemento.textContent =
        texto || "";

}


/* =========================================================
   AUDIO
   ========================================================= */

function prepararAudio(
    ruta
) {

    const audio =
        document.getElementById(
            "audioPlayer"
        );


    if (!audio) {

        console.warn(
            "No existe #audioPlayer"
        );

        return;

    }


    /* Detener audio anterior */

    audio.pause();


    audio.currentTime = 0;


    /* Eliminar fuente anterior */

    audio.removeAttribute(
        "src"
    );


    audio.load();


    /* Si no existe audio */

    if (
        !ruta ||
        ruta.trim() === ""
    ) {

        console.warn(
            "Esta calle no tiene audio."
        );

        return;

    }


    console.log(
        "Cargando audio:",
        ruta
    );


    /* Colocar nuevo audio */

    audio.src = ruta;


    audio.load();


    /* Detectar error */

    audio.onerror = function () {

        console.error(
            "ERROR cargando audio:",
            ruta
        );

    };


    audio.oncanplay = function () {

        console.log(
            "Audio listo:",
            ruta
        );

    };

}


/* =========================================================
   VIDEO GOOGLE DRIVE
   ========================================================= */

function prepararVideoDrive(
    ruta
) {

    const boton =
        document.getElementById(
            "videoButton"
        );


    if (!boton) {

        console.warn(
            "No existe #videoButton"
        );

        return;

    }


    /* Limpiar enlace anterior */

    boton.removeAttribute(
        "href"
    );


    /* Si no hay video */

    if (
        !ruta ||
        ruta.trim() === ""
    ) {

        boton.style.display =
            "none";

        return;

    }


    console.log(
        "Configurando video:",
        ruta
    );


    /* =====================================================
       COLOCAR ENLACE DE GOOGLE DRIVE
    ===================================================== */

    boton.href =
        ruta;


    /* Abrir en otra pestaña */

    boton.target =
        "_blank";


    boton.rel =
        "noopener noreferrer";


    /* Mostrar botón */

    boton.style.display =
        "block";


    /* Texto */

    boton.textContent =
        "▶ VER VIDEO";


}


/* =========================================================
   CONFIGURAR BOTÓN QUIZ
   ========================================================= */

function configurarBotonQuiz(
    lugar
) {

    const boton =
        document.getElementById(
            "startQuiz"
        );


    if (!boton) {

        console.error(
            "ERROR: No existe #startQuiz"
        );

        return;

    }


    /*
     * Usamos onclick en lugar de
     * addEventListener para evitar
     * duplicar eventos.
     */

    boton.onclick =
        function () {

            console.log(
                "Iniciando quiz:",
                lugar.nombre
            );


            if (
                typeof iniciarPregunta ===
                "function"
            ) {

                iniciarPregunta(
                    lugar
                );

            }
            else {

                console.error(
                    "ERROR: No existe iniciarPregunta()"
                );

                if (
                    typeof Swal !==
                    "undefined"
                ) {

                    Swal.fire({

                        icon: "error",

                        title: "Error",

                        text:
                            "No se pudo iniciar el cuestionario."

                    });

                }

            }

        };

}


/* =========================================================
   CARGAR PERSONAJE
   ========================================================= */

async function cargarPersonaje(
    idPersonaje
) {

    try {

        const respuesta =
            await fetch(
                "data/personajes.json?v=" +
                Date.now()
            );


        if (!respuesta.ok) {

            console.warn(
                "No se pudo cargar personajes.json"
            );

            return;

        }


        const personajes =
            await respuesta.json();


        if (
            !Array.isArray(
                personajes
            )
        ) {

            return;

        }


        const personaje =
            personajes.find(
                function (item) {

                    return (
                        Number(item.id) ===
                        Number(idPersonaje)
                    );

                }
            );


        /* =================================================
           SI NO EXISTE
        ================================================= */

        if (!personaje) {

            colocarTexto(
                "characterName",
                ""
            );


            colocarTexto(
                "characterBio",
                ""
            );


            const imagen =
                document.getElementById(
                    "characterImage"
                );


            if (imagen) {

                imagen.removeAttribute(
                    "src"
                );

            }


            return;

        }


        /* =================================================
           IMAGEN
        ================================================= */

        const imagen =
            document.getElementById(
                "characterImage"
            );


        if (imagen) {

            imagen.src =
                personaje.imagen || "";


            imagen.alt =
                personaje.nombre || "";

        }


        /* =================================================
           NOMBRE
        ================================================= */

        colocarTexto(
            "characterName",
            personaje.nombre
        );


        /* =================================================
           BIOGRAFÍA
        ================================================= */

        colocarTexto(

            "characterBio",

            personaje.biografia ||

            personaje.bio ||

            personaje.descripcion ||

            ""

        );

    }

    catch (error) {

        console.error(
            "Error cargando personaje:",
            error
        );

    }

}


/* =========================================================
   CARGAR FECHAS
   ========================================================= */

async function cargarFechas(
    idLugar
) {

    const lista =
        document.getElementById(
            "importantDates"
        );


    if (!lista) {

        return;

    }


    /* Limpiar */

    lista.innerHTML = "";


    try {

        const respuesta =
            await fetch(
                "data/fechas.json?v=" +
                Date.now()
            );


        if (!respuesta.ok) {

            console.warn(
                "No se pudo cargar fechas.json"
            );

            return;

        }


        const fechas =
            await respuesta.json();


        if (
            !Array.isArray(
                fechas
            )
        ) {

            return;

        }


        fechas.forEach(
            function (fecha) {

                const id =

                    fecha.lugarId ??

                    fecha.idLugar ??

                    fecha.lugar;


                if (
                    Number(id) !==
                    Number(idLugar)
                ) {

                    return;

                }


                const li =
                    document.createElement(
                        "li"
                    );


                li.textContent =

                    fecha.fecha ||

                    fecha.texto ||

                    fecha.descripcion ||

                    "";


                lista.appendChild(
                    li
                );

            }
        );

    }

    catch (error) {

        console.error(
            "Error cargando fechas:",
            error
        );

    }

}


/* =========================================================
   CARGAR CURIOSIDAD
   ========================================================= */

async function cargarCuriosidad(
    idLugar
) {

    const elemento =
        document.getElementById(
            "curiosity"
        );


    if (!elemento) {

        return;

    }


    elemento.textContent =
        "";


    try {

        const respuesta =
            await fetch(
                "data/curiosidades.json?v=" +
                Date.now()
            );


        if (!respuesta.ok) {

            console.warn(
                "No se pudo cargar curiosidades.json"
            );

            return;

        }


        const curiosidades =
            await respuesta.json();


        if (
            !Array.isArray(
                curiosidades
            )
        ) {

            return;

        }


        const curiosidad =
            curiosidades.find(
                function (item) {

                    const id =

                        item.lugarId ??

                        item.idLugar ??

                        item.lugar;


                    return (
                        Number(id) ===
                        Number(idLugar)
                    );

                }
            );


        if (!curiosidad) {

            return;

        }


        elemento.textContent =

            curiosidad.texto ||

            curiosidad.descripcion ||

            curiosidad.curiosidad ||

            "";

    }

    catch (error) {

        console.error(
            "Error cargando curiosidad:",
            error
        );

    }

}


/* =========================================================
   CERRAR PANEL
   ========================================================= */

function cerrarPanel() {

    const panel =
        document.getElementById(
            "panel"
        );


    if (!panel) {

        return;

    }


    /* Detener audio */

    const audio =
        document.getElementById(
            "audioPlayer"
        );


    if (audio) {

        audio.pause();

    }


    /* Detener video HTML si existiera */

    const video =
        document.getElementById(
            "videoPlayer"
        );


    if (video) {

        video.pause();

    }


    /* Cerrar */

    panel.classList.remove(
        "active"
    );

}


/* =========================================================
   BOTÓN CERRAR PANEL
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const boton =
            document.getElementById(
                "closePanel"
            );


        if (!boton) {

            console.warn(
                "No existe #closePanel"
            );

            return;

        }


        boton.addEventListener(
            "click",
            cerrarPanel
        );

    }
);
