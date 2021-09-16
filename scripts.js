let formViewer = document.querySelector("#form-view");
let cardViewer = document.querySelector("#card-view");
let cardContainer = document.querySelector(".card-container");
let cardContent = document.querySelector(".card-content");
let bottomContainer = document.querySelector(".bottom-container");


// formViewer.addEventListener("click", showForm);
cardViewer.addEventListener("click", () => fetchItems());

function fetchItems() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //TODO: filter here

      loadItems(data);
    });
}


function loadItems(data) {
    for (let i = 0; i < 10; i++) {
        let card = document.createElement("div");
        card.className = "card";
        
        let image = document.createElement("div");
        image.className = "image";
        
        let img = document.createElement("img");
        img.src = "./images/ciceksepeti.png"
        
        let titleContainer = document.createElement("div");
        titleContainer.className = "title-container";
        
        let pTitle = document.createElement("p");
        pTitle.innerHTML = data[i].title;
        
        let descContainer = document.createElement("div");
        descContainer.className = "desc";

        let pDescription = document.createElement("p");
        pDescription.innerHTML = data[i].body;

        descContainer.appendChild(pDescription);
        titleContainer.appendChild(pTitle);
        image.appendChild(img);
        card.appendChild(image);
        card.appendChild(titleContainer);
        card.appendChild(descContainer);
        cardContent.appendChild(card);
        cardContainer.appendChild(cardContent);
        bottomContainer.appendChild(cardContainer);
    }
}