//querySelector references
const formViewer = document.querySelector("#form-view");
const cardViewer = document.querySelector("#card-view");
const cardContainer = document.querySelector(".card-container");
const formContainer = document.querySelector(".form-container");
const cardContent = document.querySelector(".card-content");
const bottomContainer = document.querySelector(".bottom-container");
const filterInput = document.querySelector(".text-filter");
const searchBar = document.querySelector(".search-bar");
const formSubmitBtn = document.querySelector(".form-submitBtn");
const modalContainer = document.querySelector(".modal-container");
const modalContent = document.querySelector(".modal-content");
const closeModalBtn = document.querySelector("#closeModal");

//eventListeners
formViewer.addEventListener("click", showForm);
cardViewer.addEventListener("click", showCards);
filterInput.addEventListener("input", updateItems);
formSubmitBtn.addEventListener("click", createModal);
closeModalBtn.addEventListener("click", closeModal);

//runs when cards are toggled
function showCards() {
  formContainer.style.display = "none";
  cardContainer.style.display = "flex";
  searchBar.style.display = "flex";
  filterInput.value = "";
  updateItems();
}

let dataArr = [];


//card data fetch
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((data) => {
    dataArr = data;
    loadItems(data);
  });


//load items based on either entire data arr or filtered data arr, fill cardContent
function loadItems(data) {
  let cardCount = 0;

  for (let i = 0; i < data.length; i++) {
    const card = document.createElement("div");
    card.className = "card";

    const image = document.createElement("div");
    image.className = "image";

    const img = document.createElement("img");
    img.src = "./images/ciceksepeti.png";

    const titleContainer = document.createElement("div");
    titleContainer.className = "title-container";

    const pTitle = document.createElement("p");
    pTitle.innerHTML = data[i].title;

    const descContainer = document.createElement("div");
    descContainer.className = "desc-container";

    const pDescription = document.createElement("p");
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

//filter data arr and load filtered cards
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

//runs when form is toggled
function showForm() {
  cardContainer.style.display = "none";
  formContainer.style.display = "flex";
  searchBar.style.display = "none";
}


//creates modal upon form submission
function createModal(e) {
  e.preventDefault();
  formSubmitBtn.disabled = true;
  const formElements = document.querySelector("#formElement").elements;

  for (let i = 0; i < formElements.length - 1; i++) {
    const modalParagraph = document.createElement("p");

    if (formElements[i].id === "comments") {
      modalParagraph.innerHTML = `My comments: ${formElements[i].value}`;
    } else {
      modalParagraph.innerHTML = `${formElements[i].name}: ${formElements[i].value}`;
    }

    modalContent.appendChild(modalParagraph);
    modalContainer.appendChild(modalContent);

    formElements[i].value = "";
  }

  modalContainer.style.display = "flex";
}

//closes modal and cleans up modal innerhtml
function closeModal() {
  formSubmitBtn.disabled = false;
  modalContent.innerHTML = "";
  modalContainer.style.display = "none";
}
