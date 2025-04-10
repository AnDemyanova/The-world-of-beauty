const items = [{
        title: "Гель для бровей Luxvisage",
        description: "Гель-ламинатор для бровей суперсильной фиксации Brow Laminator Extreme Fix 24h Waterproof 4,2г",
        tags: ["eye", "brows"],
        price: 250,
        img: "./img/1.jpeg",
        rating: 4.2,
    },
    {
        title: "BB крем для лица Consly",
        description: "BB крем для лица с эффектом фотошопа Effect Photoshop Anti-Age BB Cream SPF50 PA++++ 50мл",
        tags: ["face"],
        price: 563,
        img: "./img/2.jpeg",
        rating: 3.9,
    },
    {
        title: "Стик-скульптор для лица BelorDesign",
        description: "Стик-скульптор для лица Multitalent 7,1г №1",
        tags: ["face"],
        price: 400,
        img: "./img/3.jpeg",
        rating: 3.2,
    },
    {
        title: "Тушь для ресниц XXL LUXVISAGE",
        description: "Тушь XXL Суперобъем-Эффект накладных ресниц 8г",
        tags: ["eye"],
        price: 401,
        img: "./img/4.jpeg",
        rating: 4.9,
    },
    {
        title: "Корректирующий крем для лица Erborian",
        description: "Корректирующий крем для лица CC Red Correct SPF25, 15мл.",
        tags: ["face"],
        price: 1880,
        img: "./img/5.jpeg",
        rating: 4.8,
    },
    {
        title: "Cыворотка для ресниц и бровей Careprost",
        description: "Cыворотка для роста бровей и ресниц Original Eyelash Growth Serum 3мл",
        tags: ["eye", "brows"],
        price: 966,
        img: "./img/6.jpeg",
        rating: 3.6,
    },
    {
        title: "Корректор морщин для лица RELOUIS",
        description: "Корректор морщин для лица Korean Secret Make Up & Care Wrinkle Filler 11г",
        tags: ["face"],
        price: 687,
        img: "./img/7.jpeg",
        rating: 4.1,
    },
    {
        title: "Фиксирующая пудра для лица RELOUIS",
        description: "Фиксирующая прозрачная пудра для лица Relouis PRO HD Powder 10г",
        tags: ["face"],
        price: 477,
        img: "./img/8.jpeg",
        rating: 3.7,
    },
    {
        title: "Подводка для глаз LUXVISAGE",
        description: "Подводка для глаз Super Stay Eyeliner Ultra Black 3г",
        tags: ["eye"],
        price: 201,
        img: "./img/9.jpeg",
        rating: 4.2,
    },
    {
        title: "Карандаш для бровей The Saem",
        description: "Карандаш для бровей Saemmul Artlook Eyebrow 0,2г",
        tags: ["eye", "brows"],
        price: 270,
        img: "./img/10.jpeg",
        rating: 4.4,
    },
    {
        title: "База под макияж глаз The Saem",
        description: "База под макияж для век Saemmul Eye Primer 6мл",
        tags: ["eye"],
        price: 434,
        img: "./img/11.jpeg",
        rating: 3.6,
    },
    {
        title: "Хайлайтер для лица Arive Makeup",
        description: "Двойной стик-хайлайтер для лица Duo Highlighter Stick Soft Matte & Dewy 10г",
        tags: ["face"],
        price: 1049,
        img: "./img/12.jpeg",
        rating: 4.3,
    },
];


let currentState = [...items];


const itemsContainer = document.querySelector("#shop-items");

const itemTemplate = document.querySelector("#item-template");

const nothingFound = document.querySelector("#nothing-found");


function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

function sortByAlphabet(a, b) {
    return a.title.localeCompare(b.title);
}

function sortByPrice(a, b) {
    return a.price - b.price;
}

function sortByRating(a, b) {
    return a.rating - b.rating;
}

renderItems(currentState.sort(sortByAlphabet));


function prepareShopItem(shopItem) {

    const { title, description, tags, img, price, rating } = shopItem;

    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}P`;


    const ratingContainer = item.querySelector(".rating");
    ratingContainer.innerHTML = "";

    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }


    const tagsHolder = item.querySelector(".tags");

    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });

    return item;
}


const searchInput = document.querySelector("#search-input");

const searchButton = document.querySelector("#search-btn");


function applySearch() {

    const searchString = searchInput.value.trim().toLowerCase();


    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );

    currentState.sort(sortByAlphabet);

    renderItems(currentState);

    sortControl.selectedIndex = 0;
}


searchButton.addEventListener("click", applySearch);

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        applySearch();
    }
});


const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
    let sortedItems;
    if (!currentState.length) return;

    switch (event.target.value) {
        case "expensive":
            sortedItems = [...currentState].sort((a, b) => sortByPrice(b, a));
            break;

        case "cheap":
            sortedItems = [...currentState].sort(sortByPrice);
            break;

        case "rating":
            sortedItems = [...currentState].sort((a, b) => sortByRating(b, a));
            break;

        case "alphabet":
            sortedItems = [...currentState].sort(sortByAlphabet);
            break;
        default:
            sortedItems = currentState;
            break;


    }

    renderItems(currentState);
});