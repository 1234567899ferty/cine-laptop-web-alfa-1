// =========================================
// REPRODUCTOR DINÁMICO DE YOUTUBE
// =========================================
function reproducirVideo(idTarjeta, idVideo) {
    var tarjeta = document.getElementById(idTarjeta);
    if (!tarjeta) return;

    var boton = tarjeta.querySelector('.boton-reproducir');
    
    var contenedorVideo = document.createElement('div');
    contenedorVideo.className = 'contenedor-video-embed';
    contenedorVideo.innerHTML = '<iframe src="https://www.youtube.com/embed/' + idVideo + '?autoplay=1&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
    
    if (boton) {
        tarjeta.replaceChild(contenedorVideo, boton);
    } else {
        tarjeta.appendChild(contenedorVideo);
    }
}

// =========================================
// REPRODUCTOR DINÁMICO DE TIKTOK
// =========================================
function reproducirTikTok(idContenedor, idVideo, urlTikTok, titulo) {
    var contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;
    
    var textoTitulo = titulo || 'Ver tráiler en TikTok';

    contenedor.innerHTML = `
        <div class="contenedor-tiktok-embed">
            <blockquote class="tiktok-embed" cite="${urlTikTok}" data-video-id="${idVideo}" style="max-width: 605px; min-width: 325px;">
                <section>
                    <a target="_blank" rel="noopener noreferrer" href="${urlTikTok}">${textoTitulo}</a>
                </section>
            </blockquote>
        </div>
    `;
    
    // Recarga del script oficial de TikTok para inicializar el reproductor
    if (window.tiktokEmbed) {
        window.tiktokEmbed.load();
    } else {
        var scriptTikTok = document.querySelector('script[src*="tiktok.com/embed.js"]');
        if (!scriptTikTok) {
            scriptTikTok = document.createElement('script');
            scriptTikTok.src = "https://www.tiktok.com/embed.js";
            scriptTikTok.async = true;
            document.body.appendChild(scriptTikTok);
        }
    }
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
    }
}

function cerrarFoto() {
    var modal = document.getElementById('modal-foto');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Cerrar modal con clic fuera de la imagen o tecla Escape
document.addEventListener('DOMContentLoaded', function() {
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
});
