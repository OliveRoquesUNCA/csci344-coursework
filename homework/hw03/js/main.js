import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "olive";
let password = "password";

async function initializeScreen() {
    token = await getAccessToken(rootURL, username, password);
    getNav();
    getStories();
    getPosts();

}
async function getNav() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/profile/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
    const profile = await response.json();
    console.log(profile);
    showNav(profile);
    getRightPanel(profile);
}

function showNav(profile) {
    const navEl = document.querySelector("#nav");
    const template = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${profile.username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
    navEl.insertAdjacentHTML("beforeend", template);
}

async function getRightPanel(profile) {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/suggestions/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
    const suggestions = await response.json();
    console.log(profile, suggestions);
    showRightPanel(profile, suggestions);
}

function showRightPanel(profile, suggestions) {
    const asideEl = document.querySelector("#sidebar");
    let template = `
    <aside class="fixed top-[100px] left-[63vw] w-70 hidden md:block">
      <header class="flex gap-4 items-center">
        <img src="${profile.thumb_url}" class="rounded-full w-16" />
        <h2 class="font-Comfortaa font-bold text-2xl">${profile.username}</h2>
      </header>
      <div class="mt-4">
        <p class="text-base text-gray-400 font-bold mb-4">
          Suggestions for you
        </p>
    `;
    suggestions.forEach(suggestion => {
        template += `
        <section class="flex justify-between items-center mb-4 gap-2">
          <img src="${suggestion.thumb_url}" class="rounded-full" />
          <div class="w-[180px]">
            <p class="font-bold text-sm">${suggestion.username}</p>
            <p class="text-gray-500 text-xs">suggested for you</p>
          </div>
          <div>
          <button class="link following" aria-label="follow-${suggestion.username}">
        follow
        </button>
        </section>
        `
    })
    asideEl.insertAdjacentHTML("beforeend", template);
}


// function getFollowButton(suggestion) {
//     const followID = isFollowed(suggestion.id);
//     if (followID !== `0`) {
//         return `<button class="link following" aria-label="follow-${suggestion.username}" onclick="deleteFollow(${followID})">
//         unfollow
//         </button>`;
//     } else {
//         return `<button class="link following" aria-label="follow-${suggestion.username}" onclick="createFollow(${suggestion.id})">
//         follow
//         </button>
//         `;
//     }
// }

// async function getFollowers() {
//     const response = await fetch("https://photo-app-secured.herokuapp.com/api/following/", {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         }
//     });
//     const followers = await response.json();
//     console.log(followers);
//     return followers;
// }

// //check if user followed; if so, display unfollow; if not, display follow
// async function isFollowed(user_id) {
//     const followers = await getFollowers();
//     followers.forEach(follower => {
//         if (follower.following.id === user_id) {
//             return follower.id;
//         }
//     })
//     return `0`;
// }

// window.createFollow = async function (userID) {
//     const postData = {
//         "user_id": userID
//     };
//     const response = await fetch("https://photo-app-secured.herokuapp.com/api/following/", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(postData)
//     });
//     const data = await response.json();
//     console.log(data);
// }

// window.deleteFollow = async function (followID) {
//     const response = await fetch(`https://photo-app-secured.herokuapp.com/api/following/${followID}`, {
//         method: "DELETE",
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         }
//     });
//     const data = await response.json();
//     console.log(data);
// }

async function getStories() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/stories/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
    const stories = await response.json();
    console.log(stories);
    showStories(stories);
}

function showStories(stories) {
    const storiesEl = document.querySelector("#stories");
    var template = `<header class="flex gap-6 bg-white border p-2 overflow-hidden mb-6">`;
    stories.forEach(story => {
        template += `
            <div class="flex flex-col justify-center items-center">
            <img
              alt="${story.text}"
              src="${story.user.thumb_url}"
              class="rounded-full border-4 border-gray-300"
            />
            <p class="text-xs text-gray-500">${story.user.username}</p>
          </div>
        `
    })
    storiesEl.insertAdjacentHTML("beforeend", template)
}

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
    const mainEl = document.querySelector("main");

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
        mainEl.insertAdjacentHTML("beforeend", template);
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
            return `<button aria-label="Unlike" onclick="deleteLike(${post.current_user_like_id})"><i class="fa-solid fa-heart text-red-700"></i></button>`;
        } else {

            return `<button aria-label="Like" onclick="createLike(${post.id})"><i class="fa-regular fa-heart"></i></button>`;
        }
    }

    function getBookmarkButton(post) {
        if (post.current_user_bookmark_id) {
            return `<button aria-label="unbookmark" onclick="deleteBookmark(${post.current_user_bookmark_id})"><i class="fa-solid fa-bookmark"></i></button>`;
        } else {
            return `<button aria-label="bookmark" onclick="createBookmark(${post.id})">
            <i class="far fa-bookmark"></i>
            </button>
            `;
        }
    }

}

window.createLike = async function (postID) {
    const postData = {
        "post_id": postID
    };
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/likes/", {
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

window.deleteLike = async function (likeID) {
    const response = await fetch(`https://photo-app-secured.herokuapp.com/api/likes/${likeID}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
    const data = await response.json();
    console.log(data);
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
