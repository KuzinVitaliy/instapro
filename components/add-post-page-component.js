import { renderHeaderText } from "./header-component.js";
import {
  ADD_POSTS_PAGE,
  AUTH_PAGE,
  LOADING_PAGE,
  POSTS_PAGE,
  USER_POSTS_PAGE,
} from "../routes.js";

import { goToPage } from "../index.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // @TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div> ${renderHeaderText()}
      Страница добавления поста
          <p><img id="output" width="200"/></p>

          <p>
      <input
        type="file"
        accept="image/*"
        name="image"
        id="file"
       
        style="display: none"
      />
    </p>
       <p><label for="file" style="cursor: pointer">Загрузить изображение</label></p>
       <p><label for="file" style="cursor: pointer">Комментарий к картинке</label></p>
       <input type="texts" id="comment" />
      <button class="button" id="add-button">Добавить</button>
    </div>
  `;

    appEl.innerHTML = appHtml;

    document.getElementById("add-button").addEventListener("click", () => {
      let img = document.getElementById("file");
      let cmt = document.getElementById("comment");
      //     onAddPostClick({ imageUrl: img.value, description: cmt.value });
      if (
        cmt.value.length < 1 ||
        img.files.length <= 0 ||
        img.files[0].size <= 0
      ) {
        alert("Заполните все поля!");
        return;
      }
      onAddPostClick({
        imageUrl: img.files[0],
        description: cmt.value,
      });
      goToPage(POSTS_PAGE);
      // description: "Описание картинки",
      // imageUrl: "https://image.png",
    });

    document.getElementById("file").addEventListener("change", (event) => {
      var image = document.getElementById("output");
      image.src = URL.createObjectURL(event.target.files[0]);
    });
  };

  render();
  let f = document.getElementsByClassName("logo");
  f[0].addEventListener("click", (ff) => {
    goToPage(POSTS_PAGE);
  });

}
