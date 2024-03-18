

const accessKey = "qdwjMkTh8ONfGL7zqtuwy5pFParkvIxi-ygpF8962nQ";

const formEI = document.querySelector("form");
const inputEI = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEI.value;
    const encodedInputData = encodeURIComponent(inputData); // Encode input data
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodedInputData}&client_id=${accessKey}`; // Use backticks for template literals
   
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    const results = data.results;

    results.map((result) => {
        const imagewrapper = document.createElement("div");
        imagewrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description; 
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imagewrapper.appendChild(image);
        imagewrapper.appendChild(imageLink);
        searchResults.appendChild(imagewrapper);
    });

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

formEI.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});
