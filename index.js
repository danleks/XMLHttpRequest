// https://api.punkapi.com/v2/beers
const API_URL = 'https://api.punkapi.com/v2/beers';
const container = document.querySelector('.container');

const render = (data) => {
    if (!data.length) return;
    const fragment = document.createDocumentFragment();
    data.forEach(({ name, tagline, description, image_url: imageURL }) => {
        const div = document.createElement('div');
        div.classList.add('beer');
        div.innerHTML = `
            <div class="beer--content">
                <h1 class="beer--title">${name}</h1>
                <p class="beer--tagline">${tagline}</p>
                <p class="beer--description">${description}</p>
            </div>
            <img class="beer--image" src="${imageURL}"></img>
        `;
        fragment.appendChild(div);
        // using fragment allows to optimize DOM operations, as it creates vitual copies until all div's are created
    });

    container.appendChild(fragment);
    // in the end only 1 DOM operation is made
};

const handleSuccess = (data) => {
   const beers = JSON.parse(data.target.responseText);
   render(beers);
};

const handleError = (error) => {
    console.log(error);
};

const req = new XMLHttpRequest();
// 1. First option
req.onload = handleSuccess;
req.onerror = handleError;
//2. Second option
// req.addEventListener('onload', handleSuccess);
// req.addEventListener('onerror', handleError );
req.open('GET', API_URL);
req.send();