export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // @TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
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
        <p><label for="file" style="cursor: pointer">Upload Image</label></p>
       <input type="texts" id="comment" />
      <button class="button" id="add-button">Добавить</button>
    </div>
  `;

    appEl.innerHTML = appHtml;

    document.getElementById("add-button").addEventListener("click", () => {
      let img = document.getElementById("file");
      let cmt = document.getElementById("comment");
      //     onAddPostClick({ imageUrl: img.value, description: cmt.value });
      onAddPostClick({
        imageUrl: img.files[0],
        description: cmt.value,
      });
      // description: "Описание картинки",
      // imageUrl: "https://image.png",
    });

    document.getElementById("file").addEventListener("change", (event) => {
      var image = document.getElementById("output");
      image.src = URL.createObjectURL(event.target.files[0]);
    });
  };

  render();
}
