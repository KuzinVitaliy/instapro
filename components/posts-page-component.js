import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken } from "../index.js";
import { ChangeLikeAsync } from "../api.js";

//import { formatDistance } from "../node_modules/date-fns";

function formatDistance(a, s) {
  return a;
}

export function renderPostsPageComponent({ appEl }) {
  // @TODO: реализовать рендер постов из api

  console.log("Актуальный список постов:", posts);

  /**
   * @TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  let appHtml = `<div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">`;
  let postsHtml = posts
    .map((post) => {
      return GetPostHtml(post);
    })
    .join("");

  appEl.innerHTML = appHtml + postsHtml + "</div></div></ul>";

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
  for (let userEl of document.querySelectorAll(".like-button")) {
    userEl.addEventListener("click", async () => {
      console.log(userEl.dataset.isliked);
      console.log(userEl.dataset.postId);
      let likeCountElement = document.getElementById(
        `LK${userEl.dataset.postId}`
      );
      let likeCount = Number( likeCountElement.innerText.replace("Нравится: ","").trim());
      

      let res = await ChangeLikeAsync(
        userEl.dataset.postId,
        userEl.dataset.isliked == "false",
        getToken()
      );
      if (res) {
        if (userEl.dataset.isliked == "false") {
          userEl.innerHTML = `<img src="./assets/images/like-active.svg">`;
          userEl.dataset.isliked = "true";
          likeCount++;
        } else {
          userEl.innerHTML = `<img src="./assets/images/like-not-active.svg">`;
          userEl.dataset.isliked = "false";
          likeCount--;
        }
        likeCountElement.innerText = `Нравится: ${likeCount}`;
      }
      /*      let postId = userEl.dataset.postId;
      let url = `http://localhost:3000/api/posts/${postId}`;
      fetch(url, {
    */
    });
  }
}

function GetPostHtml(post) {
  let likeImage = "like-not-active.svg";
  if (post.isLiked) likeImage = "like-active.svg";

  let postDateText = post.createdAt;
  postDateText = formatDistance(post.createdAt, Date.now);
  return `<li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${
                          post.user.imageUrl
                        }" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                  
                    
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" data-isLiked="${
    post.isLiked
  }" class="like-button">
                        <img src="./assets/images/${likeImage}">
                      </button>
                      <p class="post-likes-text" id="LK${post.id}">
                        Нравится: <strong>${getLikeInfo(post.likes)}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                         ${postDateText}
                    </p>
                  </li>`;
}

function getLikeInfo(likes) {
  if (likes == null || likes.length == 0) return "0";
  return likes.length;

  /*
  if (likes == null || likes.length == 0) return "0";
  let res = "";
  likes.map((item) => (res += item.name + "; "));
  return res;
  */
}

function postImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.fileUrl);
    });
}

export { postImage };
