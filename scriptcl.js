// =========================================
// REPRODUCTOR DINÁMICO DE YOUTUBE
// =========================================
function reproducirVideo(idTarjeta, idVideo) {
    var tarjeta = document.getElementById(idTarjeta);
    if (!tarjeta) return;

    var boton = tarjeta.querySelector('.boton-reproducir');
    
    var contenedorVideo = document.createElement('div');
    contenedorVideo.className = 'contenedor-video-embed';
    contenedorVideo.innerHTML = '<iframe src="https://www.youtube.com/embed/' + idVideo + '?autoplay=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width:100%; height:315px; border-radius:10px; border:none;"></iframe>';
    
    if (boton) {
        tarjeta.replaceChild(contenedorVideo, boton);
    } else {
        tarjeta.appendChild(contenedorVideo);
    }
}

// =========================================
// REPRODUCTOR DINÁMICO DE TIKTOK (IFRAME DIRECTO)
// =========================================
function reproducirTikTok(idContenedor, idVideo, urlTikTok, titulo) {
    var contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    contenedor.innerHTML = `
        <div class="contenedor-tiktok-embed" style="width: 100%; max-width: 340px; margin: 0 auto;">
            <iframe 
                src="https://www.tiktok.com/embed/v3/${idVideo}" 
                width="100%" 
                height="580" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen 
                style="border-radius: 12px; border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
            </iframe>
        </div>
    `;
}

// =========================================
// GALERÍA DE FOTOS / MODAL LIGHTBOX
// =========================================
function abrirFoto(rutaImagen, textoDescripcion) {
    var modal = document.getElementById('modal-foto');
    var imgAmpliada = document.getElementById('img-ampliada');
    var caption = document.getElementById('caption-foto');

    if (modal && imgAmpliada) {
        modal.style.display = 'flex';
        imgAmpliada.src = rutaImagen;
        if (caption) {
            caption.innerHTML = textoDescripcion || '';
        }
        document.body.style.overflow = 'hidden';
    }
}

function cerrarFoto() {
    var modal = document.getElementById('modal-foto');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// =========================================
// CAMBIO ALEATORIO DE LOGO CADA MINUTO
// =========================================
// Lista con URLs válidas y activas de Emoji Kitchen
var listaLogos = [
    "https://www.gstatic.com/android/keyboard/emojikitchen/20230418/u1f52e/u1f52e_u1f4bb.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20231113/u1f5bc-ufe0f/u1f5bc-ufe0f_u1f4bb.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20240530/u1f962/u1f962_u1f4bb.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20231113/u1f9ca/u1f9ca_u1f4bb.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20240206/u1f4bb/u1f4bb_u1f34c.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20240530/u2604-ufe0f/u2604-ufe0f_u1f4bb.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20241021/u1f329-ufe0f/u1f329-ufe0f_u1f4bb.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20240206/u1f32a-ufe0f/u1f32a-ufe0f_u1f4bb.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20230418/u1f493/u1f493_u1f4bb.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20231113/u1f4a5/u1f4a5_u1f4bb.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20240206/u1f4bb/u1f4bb_u1fae5.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20240206/u1f4bb/u1f4bb_u1fae4.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20240206/u1f4bb/u1f4bb_u1f606.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20241021/u1f440/u1f440_u1f4bb.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20240530/u1f4bb/u1f4bb_u1f39e-ufe0f.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20240530/u1f4bb/u1f4bb_u1f3ac.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20240530/u1f3ac/u1f3ac_u1f4fd.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20240530/u1f4bb/u1f4bb_u1f4fd.png"
];

var ultimoIndice = -1;

function cambiarLogoAleatorio() {
    var logoImg = document.getElementById('logo-dinamico');
    if (!logoImg) return;

    var nuevoIndice;
    // Forzar a elegir una imagen distinta a la actual
    do {
        nuevoIndice = Math.floor(Math.random() * listaLogos.length);
    } while (nuevoIndice === ultimoIndice && listaLogos.length > 1);

    ultimoIndice = nuevoIndice;
    logoImg.src = listaLogos[nuevoIndice];
}

// =========================================
// EVENTOS AL CARGAR LA PÁGINA
// =========================================
document.addEventListener('DOMContentLoaded', function() {
    // Configuración del modal lightbox
    var modal = document.getElementById('modal-foto');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                cerrarFoto();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarFoto();
        }
    });

    // Control del Logo Dinámico
    var logoImg = document.getElementById('logo-dinamico');
    if (logoImg) {
        // Manejo de errores: si una imagen falla al cargar, fuerza el cambio a otra inmediatamente
        logoImg.addEventListener('error', function() {
            cambiarLogoAleatorio();
        });

        // 1. Cambia inmediatamente al cargar la página
        cambiarLogoAleatorio();

        // 2. Cambia automáticamente cada minuto (60,000 ms)
        setInterval(cambiarLogoAleatorio, 60000);

        // 3. Permite cambiar manualmente al hacer clic sobre el logo
        logoImg.style.cursor = 'pointer';
        logoImg.addEventListener('click', cambiarLogoAleatorio);
    }
});
