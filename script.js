// this URL we made on the unsplash.com/documentation site
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArrays = [];

const count = 30;
const apiKey = 'kTlxwy2VORmlusLbb-tJUfZUsfV-qK3nlhOoU32_GCU';
const api = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// we are only call api when ready == true, it will true when acutal return images and loaded images are equal.
let ready = false;
let imageLoaded = 0;
let totalPhotos = 0;


// we are creating new function to add attributes dynamically without repeating the same code.
function setAttributes (element, attributes) {
    // loop through the all the attributes
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);   
    }
}

function loadImage() {
    imageLoaded++;

    if(imageLoaded === totalPhotos) {
        ready = true;
        // loader will be false when images are not loaded
        // loader.hidden = true;
    }

}

function displayPhotos () {
    imageLoaded = 0;
    totalPhotos = photoArrays.length;
    photoArrays.forEach((photo) => {
        // this will create the a element dynamically
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item,{
            href : photo.links.html,
            target : '_blank',
        });
        //  _black target means it will open in the new tab

        const imag = document.createElement('img');
        // imag.setAttribute('src',photo.urls.regular);
        // imag.setAttribute('alt', photo.alt_description);
        // imag.setAttribute('title', photo.alt_description);

        // we will call the function when images are loaded
        imag.addEventListener('load', ()=> {
            loadImage();
        })

        setAttributes(imag,  {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        });

        // put imag inside the a and a inside the container

        item.appendChild(imag);
        imageContainer.appendChild(item);

    })
}

//  to get the photos we will use the asynchronous function
async function getPhotos() {
    try {
        const response = await fetch(api);
        photoArrays = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('scroll', ()=> {
    // window.innerHeight = height of the browser window
    // window.scrollY = how much we have scroll from the top of the page.
    // document.body.offset = actual height of the html includes all the items
     if(window.innerHeight +  window.scrollY >= document.body.offsetHeight - 1000 && ready) {
         ready = false;
        getPhotos();
     }
})

getPhotos();