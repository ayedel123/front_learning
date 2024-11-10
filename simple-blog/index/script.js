// main
const MAX_PAGES_COUNT = 7;

const getPostsUrl = "https://jsonplaceholder.typicode.com/posts";
const postGrid = document.getElementById("post-grid-1");
const postTemplate = document.getElementById("post-template-0");

//const postCountSelector = document.getElementById("post-count-selector");
//const showMoreButton = document.getElementById("show-more-button");

// Must be minimal when script starts
// parseInt(postCountSelector.value);
let pagePostCount = 10;
//Probably should be taken from the server
let maxPostCount = 100;

const pgButtonsContainer = document.getElementById(
    "pagination-buttons-container"
);
const pgButtonsContainerBot = document.getElementById(
    "pagination-buttons-container-bottom"
);
const pgStartButton = document.getElementById("pg-start-button");
const pgStartButtonBot = document.getElementById("pg-start-button-bottom");
const pgEndButton = document.getElementById("pg-end-button");
const pgEndButtonBot = document.getElementById("pg-end-button-bottom");
let pgButtons = [];
let pgButtonsBot = [];

let pgLastPageNumber = Math.ceil(maxPostCount / pagePostCount);
const pgButtonsCount = Math.min(pgLastPageNumber, MAX_PAGES_COUNT);

let currentPage = 0;
let currnetPgButtonIndex = 1;

// postCountSelector.addEventListener("change", postCountChange);
pgStartButton.addEventListener("click", pgStartButtonOnClick);
pgStartButtonBot.addEventListener("click", pgStartButtonOnClick);
pgEndButton.addEventListener("click", pgEndButtonOnClick);
pgEndButtonBot.addEventListener("click", pgEndButtonOnClick);

fetchAndDisplayPosts(pagePostCount);

createPgButtons(pgButtonsContainer, pgButtons);
createPgButtons(pgButtonsContainerBot, pgButtonsBot);

const pgButtonsMediator = {
    buttonsArrays: [pgButtons, pgButtonsBot],

    update: function (newIndex, value) {
        this.buttonsArrays.forEach(function (buttonArray) {
            updatePageButtons(buttonArray, newIndex, value);
        });
        currentPage = this.buttonsArrays[0].at(newIndex).textContent - 1;
        currnetPgButtonIndex = newIndex;
    },
};
pgButtonsMediator.update(0, 0);
// function declaration

//Pagination buttons listeners

// Updates the text on the pagination buttons by adding the specified value,
// if doing so does not exceed the minimum or maximum page limits.
function updateButtonsText(buttons, value) {
    if (
        (value == -1 && buttons.at(0).textContent == 1) ||
        (value == 1 && parseInt(buttons.at(-1).textContent) == pgLastPageNumber)
    ) {
        return;
    }

    buttons.forEach((button) => {
        button.textContent = parseInt(button.textContent) + value;
    });
}

// Updates the current button index and applies the highlighting style
// to the new current button, while also updating the text on the pagination buttons
// according to the provided textChangeOnValue.
function updatePageButtons(buttons, newCurrentIndex, textChangeOnValue) {
    updateButtonsText(buttons, textChangeOnValue);
    buttons
        .at(currnetPgButtonIndex)
        .classList.remove("pagination-button-current");
    buttons.at(newCurrentIndex).classList.add("pagination-button-current");
}

function getPgButtonOnClickListener(buttons, index) {
    listener = () => {
        if (index == 0) {
            buttons.at(index).textContent == 1
                ? pgButtonsMediator.update(index, -1)
                : pgButtonsMediator.update(index + 1, -1);
        } else if (index == pgButtonsCount - 1) {
            buttons.at(index).textContent == pgLastPageNumber
                ? pgButtonsMediator.update(index, 1)
                : pgButtonsMediator.update(index - 1, 1);
        } else {
            pgButtonsMediator.update(index, 0);
        }

        fetchAndDisplayPosts(pagePostCount, currentPage * pagePostCount);
    };
    return listener;
}

function pgStartButtonOnClick() {
    pgButtonsMediator.update(
        pgButtons.at(0).value,
        1 - pgButtons.at(0).textContent
    );
    fetchAndDisplayPosts(pagePostCount, currentPage * pagePostCount);
}

function pgEndButtonOnClick() {
    pgButtonsMediator.update(
        pgButtons.at(-1).value,
        pgLastPageNumber - pgButtons.at(-1).textContent
    );

    fetchAndDisplayPosts(pagePostCount, currentPage * pagePostCount);
}

function createPgButtons(parent, buttons) {
    for (let i = 0; i < pgButtonsCount; i++) {
        let newButton = document.createElement("button");
        newButton.textContent = i + 1;
        newButton.value = i;
        newButton.classList.add("pagination-button");
        newButton.addEventListener(
            "click",
            getPgButtonOnClickListener(buttons, i)
        );

        buttons.push(newButton);
        parent.appendChild(newButton);
    }
}

function postCountChange() {
    pagePostCount = parseInt(postCountSelector.value);
    fetchAndDisplayPosts(pagePostCount);
}

function fetchAndDisplayPosts(postCount, startIndex = 0) {
    getPostsFromServer(postCount, startIndex)
        .then((result) => putPostsToGrid(result, startIndex))
        .catch((error) => console.error("Error:", error));
}

async function sendRequest(url) {
    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        throw new Error("HTTP error: " + response.status);
    }
}



async function getPostsFromServer(limit, startIndex = 0) {
    if (limit === undefined) {
        return sendRequest(getPostsUrl);
    }
    return sendRequest(`${getPostsUrl}?_limit=${limit + startIndex}`);
}

function putPostsToGrid(postsInJson, startIndex) {
    if (Array.isArray(postsInJson)) {
        const postGrid = document.getElementById("post-grid-1");
        postGrid.innerHTML = "";

        const postsToDisplay = postsInJson.slice(startIndex);
     
        postsToDisplay.forEach((post) => {
            const newPost = postTemplate.content.cloneNode(true);
            newPost.querySelector(".post-title").textContent =
                post.title.toUpperCase();
            newPost.querySelector(".post-body").textContent = post.body;
            newPost
                .querySelector(".post-wrapper")
                .addEventListener("click", getPostOnClickListener(post));
            postGrid.appendChild(newPost);
        });
    }
}

// showMoreButton.addEventListener("click", () => {
//     pagePostCount += parseInt(postCountSelector.value);
//     fetchAndDisplayPosts(pagePostCount);
// });

function getPostOnClickListener(post) {
    return () => {
        // Кодируем заголовок поста в формат URL

        const postIdEncoded = encodeURIComponent(post.id);

        // Открываем новую вкладку с нужным URL и передаем данные

        window.open(
            `../post-detail/post-detail.html?post-id=${postIdEncoded}`,
            "_blank"
        );
    };
}
