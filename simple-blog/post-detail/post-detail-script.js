const getPostsUrl = "https://jsonplaceholder.typicode.com/posts";
const currentUrl = window.location.href;
const url = new URL(currentUrl);
const postId = url.searchParams.get("post-id");

const postTitle = document.getElementById("post-title");
const postBody = document.getElementById("post-body");
fetchAndDisplayPostById(postId);

function fetchAndDisplayPostById(id) {
    getPostById(id)
        .then((post) => {
            postTitle.textContent = post.title.toUpperCase();
            postBody.textContent = post.body;
        })
        .catch((error) => {
            postTitle.textContent = error;
            postBody.textContent="Something went wrong."
            console.error("Error:", error);
        });
}

async function getPostById(postId) {
    return sendRequest(`${getPostsUrl}/${postId}`);
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
