let formViewer = document.querySelector("#form-view");
let cardViewer = document.querySelector("#card-view");
let cardContainer = document.querySelector(".card-container");
let formContainer = document.querySelector(".form-container");
let cardContent = document.querySelector(".card-content");
let bottomContainer = document.querySelector(".bottom-container");
let filterInput = document.querySelector(".text-filter");
let searchBar = document.querySelector(".search-bar");
let formSubmitBtn = document.querySelector(".form-submitBtn");
let formElements = document.querySelector("#formElement").elements;

formViewer.addEventListener("click", showForm);
cardViewer.addEventListener("click", showCards);
filterInput.addEventListener("input", updateItems);
formSubmitBtn.addEventListener("click", createModal);

function showCards() {
  formContainer.style.display = "none";
  cardContainer.style.display = "flex";
  searchBar.style.display = "flex";
}

let dataArr = [];


//TODO: should i keep fetch like this or assign a function and put in showcards or standalone call

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((data) => {
    dataArr = data;
    loadItems(data);
  });

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

//TODO: fix cardgrid size changing on filter

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

/*---------------------FORM RELATED-----------------*/

function showForm() {
    cardContainer.style.display = "none";
    formContainer.style.display = "flex";
    searchBar.style.display = "none";
    //TODO: should i reset the search query on focus change to form
}

function createModal(e) {
    e.preventDefault();
    for(let i = 0; i < formElements.length - 1; i++) {
        console.log(formElements[i].name, formElements[i].value);
    }
}
