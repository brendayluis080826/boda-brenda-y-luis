// ========= CONFIGURACIÓN =========

const API =
"https://script.google.com/macros/s/AKfycbw7CXpUeWtrjdlrQmTPVo9ix_f7HVKVyJHYjOIptO-qsoRF7D8lDeXeBoCNflhXRG9dkQ/exec?action=photos";

const gallery = document.getElementById("gallery");
const counter = document.getElementById("photoCount");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("closeLightbox");
const prevBtn = document.getElementById("prevPhoto");
const nextBtn = document.getElementById("nextPhoto");

let photos = [];
let current = 0;


// =========================

async function loadGallery(){

    try{

        const response = await fetch(API);

        const data = await response.json();

        photos = data;

        counter.textContent = photos.length;

        gallery.innerHTML = "";

        if(photos.length===0){

            gallery.innerHTML=`
                <div class="loading">

                    Aún no hay fotografías.

                </div>
            `;

            return;

        }

        photos.forEach((photo,index)=>{

            console.log(photo);

            const img=document.createElement("img");

            img.src=photo.thumbnail;

            img.alt=photo.name;

            img.loading="lazy";

            img.className="gallery-photo";

            img.style.animationDelay =
(index * 0.05) + "s";

            img.onclick=function(){

                openPhoto(index);

            };

            gallery.appendChild(img);

        });

    }

    catch(error){

        console.error(error);

        gallery.innerHTML=`
            <div class="loading">

                Error al cargar la galería.

            </div>
        `;

    }

}


// =========================

function openPhoto(index){

    current = index;

    lightbox.style.display = "flex";

    lightboxImage.src = photos[current].full;

}


// =========================

function nextPhoto(){

    current++;

    if(current>=photos.length){

        current=0;

    }

    lightboxImage.src=photos[current].full;

}

function prevPhoto(){

    current--;

    if(current<0){

        current=photos.length-1;

    }

    lightboxImage.src=photos[current].full;

}


// =========================

nextBtn.onclick=nextPhoto;

prevBtn.onclick=prevPhoto;

closeBtn.onclick=function(){

    lightbox.style.display="none";

};

lightbox.onclick=function(e){

    if(e.target===lightbox){

        lightbox.style.display="none";

    }

};


// =========================

document.addEventListener("keydown",function(e){

    if(lightbox.style.display!=="flex") return;

    if(e.key==="Escape"){

        lightbox.style.display="none";

    }

    if(e.key==="ArrowRight"){

        nextPhoto();

    }

    if(e.key==="ArrowLeft"){

        prevPhoto();

    }

});

// =========================
// DESLIZAMIENTO EN CELULAR
// =========================

let touchStartX = 0;
let touchEndX = 0;


lightbox.addEventListener("touchstart", function(e){

    touchStartX = e.changedTouches[0].screenX;

});


lightbox.addEventListener("touchend", function(e){

    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe(){

    let diferencia = touchEndX - touchStartX;


    // deslizar hacia la izquierda
    if(diferencia < -50){

        nextPhoto();

    }


    // deslizar hacia la derecha
    if(diferencia > 50){

        prevPhoto();

    }

}


// =========================

loadGallery();

setInterval(loadGallery,30000);
