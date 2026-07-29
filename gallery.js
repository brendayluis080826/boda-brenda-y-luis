const API =
"https://script.google.com/macros/s/AKfycbw7CXpUeWtrjdlrQmTPVo9ix_f7HVKVyJHYjOIptO-qsoRF7D8lDeXeBoCNflhXRG9dkQ/exec?action=photos";

const gallery = document.getElementById("gallery");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const close = document.getElementById("close");


async function loadGallery(){

    try{

        const response = await fetch(API);

        const photos = await response.json();

        gallery.innerHTML = "";

        if(photos.length === 0){

            gallery.innerHTML =
            "<p>No hay fotografías todavía.</p>";

            return;

        }

        photos.forEach(photo=>{

            const img = document.createElement("img");

            img.src = photo.thumbnail;

            img.alt = photo.name;

            img.loading = "lazy";

            img.className = "gallery-photo";

            img.onclick = function(){

                lightbox.style.display = "flex";

                lightboxImage.src = photo.thumbnail.replace("w800","w2000");

            };

            gallery.appendChild(img);

        });

    }

    catch(error){

        gallery.innerHTML =
        "<p>Error al cargar las fotografías.</p>";

        console.error(error);

    }

}


close.onclick=function(){

    lightbox.style.display="none";

};


lightbox.onclick=function(e){

    if(e.target===lightbox){

        lightbox.style.display="none";

    }

};


loadGallery();

setInterval(loadGallery,30000);
