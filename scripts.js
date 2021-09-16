let formViewer = document.querySelector("#form-view");
let cardViewer = document.querySelector("#card-view");
let cardContainer = document.querySelector(".card-container");
let cardContent = document.querySelector(".card-content");
let bottomContainer = document.querySelector(".bottom-container");
let filterInput = document.querySelector(".text-filter");

// formViewer.addEventListener("click", showForm);
cardViewer.addEventListener("click", () => fetchItems());
filterInput.addEventListener("input", updateItems);

let dataArr = [];

function fetchItems() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => {
      dataArr = data;
      loadItems(data);
    });
}

function loadItems(data) {
  let cardCount = 0;

  for (let i = 0; i < data.length; i++) {
    let card = document.createElement("div");
    card.className = "card";

    let image = document.createElement("div");
    image.className = "image";

    let img = document.createElement("img");
    img.src = "./images/ciceksepeti.png";

    let titleContainer = document.createElement("div");
    titleContainer.className = "title-container";

    let pTitle = document.createElement("p");
    pTitle.innerHTML = data[i].title;

    let descContainer = document.createElement("div");
    descContainer.className = "desc-container";

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

    cardCount++;
    if (cardCount === 10) {
      break;
    }
  }
}

function updateItems() {
  let inputQuery = filterInput.value.toLowerCase();

  let updatedItems = dataArr.filter(
    (data) =>
      data.title.toLowerCase().includes(inputQuery) ||
      data.body.toLowerCase().includes(inputQuery)
  );

  cardContainer.innerHTML = "";
  cardContent.innerHTML = "";
  loadItems(updatedItems);
}
