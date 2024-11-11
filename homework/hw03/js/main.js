import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "olive";
let password = "password";

async function initializeScreen() {
    token = await getAccessToken(rootURL, username, password);
    showNav();
    getPosts();
}

function showNav() {
    document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:

/**
 * Goal: generate posts from API data
 *  1. fetch all of our posts
 *  2. once posts come back, loop thru each post, and append each post to correct place in HTML
 */

async function getPosts() {
    //get http resp header
    const endpoint = "https://photo-app-secured.herokuapp.com/api/posts/?limit=10";
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }

    });

    //get http body (json obj)
    const posts = await response.json();

    //print data to console
    console.log(posts);

    //invoke function to draw posts to screen
    showPosts(posts);

}

function showPosts(posts) {
    //get reference to HTML main tag
    const mainEL = document.querySelector("main");

    //loop thru each post, append html representation to DOM
    posts.forEach(post => {
        const template = `<section class="bg-white border mb-10">
        <div class="p-4 flex justify-between">
          <h3 class="text-lg font-Comfortaa font-bold">${post.user.username}</h3>
          <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
        </div>
        <img
          src="${post.image_url}"
          alt="${post.alt_text}"
          width="300"
          height="300"
          class="w-full bg-cover"
        />
        <div class="p-4">
          <div class="flex justify-between text-2xl mb-3">
            <div>
            ${getLikeButton(post)}
              <button><i class="far fa-comment"></i></button>
              <button><i class="far fa-paper-plane"></i></button>
            </div>
            <div>
             ${getBookmarkButton(post)} 
            </div>
          </div>
          <p class="font-bold mb-3">${post.likes.length} like(s)</p>
          <div class="text-sm mb-3">
            <p>
              <strong>${post.user.username}</strong>
              ${post.caption}
              <button class="button">more</button>
            </p>
          </div>
          ${showComments(post.comments)}
          
        </div>
        <div class="flex justify-between items-center p-3">
          <div class="flex items-center gap-3 min-w-[80%]">
            <i class="far fa-smile text-lg"></i>
            <input
              type="text"
              class="min-w-[80%] focus:outline-none"
              placeholder="Add a comment..."
            />
          </div>
          <button class="text-blue-500 py-2">Post</button>
        </div>
      </section>`;
        mainEL.insertAdjacentHTML("beforeend", template);
    });

    function showComments(comments) {
        if (comments.length > 1) {
            const lastComment = comments[comments.length - 1];
            return `<button>view all ${comments.length} comments</button>
            <p class="text-sm mb-3"><strong>${lastComment.user.username}</strong> ${lastComment.text}</p>
            `;
        }
        if (comments.length === 1) {
            const lastComment = comments[comments.length - 1];
            return `
            <p class="text-sm mb-3"><strong>${lastComment.user.username}</strong> ${lastComment.text}</p>
            `;
        }
        return ``;
    }

    function getLikeButton(post) {
        let iconClass = "far";
        if (post.current_user_like_id) {
            iconClass = "fa-solid text-red-700";
        }
        return `<button><i class="${iconClass} fa-heart"></i></button>`;
    }

    function getBookmarkButton(post) {
        if (post.current_user_bookmark_id) {
            return `<button onclick="deleteBookmark(${post.current_user_bookmark_id})"><i class="fa-solid fa-bookmark"></i></button>`;
        } else {
            return `<button onclick="createBookmark(${post.id})">
            <i class="far fa-bookmark"></i>
            </button>
            `;
        }
    }

}
window.createBookmark = async function (postID) {
    const postData = {
        "post_id": postID
    };
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/bookmarks/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    console.log(data);
}

window.deleteBookmark = async function (bookmarkID) {
    const response = await fetch(`https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmarkID}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
    const data = await response.json();
    console.log(data);
}

// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();
