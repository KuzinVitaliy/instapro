// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
//const personalKey = "prod";
const personalKey = "vk";
//const baseHost = "https://webdev-hw-api.vercel.app";
const baseHost = "https://wedev-api.sky.pro";
//const baseHost = "https://glebkaf.github.io";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function getUserPosts({ token, userid }) {
  return fetch(postsHost + `/user-posts/${userid}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

//#region loginUser
export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

export async function loginUserAsync({ login, password }) {
  let response = await fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({ login, password }),
  });
  return await response.json();
}

//#endregion

export function saveCommentApi(file, comment, token) {
  return uploadImage(file).then((response) => {
    if (response.status === 200) {
      let js = response.json;
    }
  });
}

export async function saveCommentApiAsync(file, comment, token) {
  try {
    let res = await uploadImageAsync(file);
    if (res.success) {
      let js = res.fileUrl;
      comment = comment.response("<", "").response(">", "");
      let response = await fetch(postsHost, {
        method: "POST",
        body: JSON.stringify({ description: comment, imageUrl: js }),
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      if (response.status === 200) {
        let t = 0;
      }
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

//#region  Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage(file) {
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
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function ChangeLike(postId, setLiked, token) {
  return fetch(postsHost + `/${postId}/${!setLiked ? "like" : "dislike"}`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 200) {
      console.log("Изменение like -  OK");
      return true;
    }
    if (response.status === 401) {
      throw new Error("Нет авторизации");
    } else {
      console.log("Изменение like - Error");
      return false;
    }
  });
}

export async function ChangeLikeAsync(postId, setLiked, token) {
  let host = postsHost + `/${postId}/${setLiked ? "like" : "dislike"}`;
  let response = await fetch(
    postsHost + `/${postId}/${setLiked ? "like" : "dislike"}`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    }
  );
  if (response.status === 200) {
    console.log("Изменение like -  OK");
    return true;
  }
  if (response.status === 401) {
    throw new Error("Нет авторизации");
  } else {
    console.log("Изменение like - Error");
    let body = await response.body;
    let content = await response.json();
    return false;
  }
}

export async function uploadImageAsync(file) {
  const data = new FormData();
  data.append("file", file);
  try {
    let response = await fetch(baseHost + "/api/upload/image", {
      method: "POST",
      body: data,
    });
    if (response.status !== 200) {
      throw new Error("Ошибка при загрузке картинки");
    }
    let json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
//#endregion

/*
export async function uploadImageAsyncCall(file) {
    let dd = await uploadImageAsync(file);
)
*/
