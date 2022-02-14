const buttonSubmit = document.getElementById("btn-submit");

buttonSubmit.addEventListener("click", async (e) => {
  e.preventDefault();

  const unFollowersDiv = document.getElementById("unfollowers");
  const username = document.getElementById("username").value;

  if (username === "") {
    alert("Por favor, digite o nome de usuário.");
    return;
  }

  const followers = await fetch(
    `https://api.github.com/users/${username}/followers`
  ).then((data) => data.json());

  const following = await fetch(
    `https://api.github.com/users/${username}/following`
  ).then((data) => data.json());

  const unFollowers = following.filter((user) => {
    const isFollowingBack = followers.find(
      (follower) => follower.login === user.login
    );

    if (!isFollowingBack) {
      return user;
    }
  });

  unFollowersDiv.innerHTML = `<h2 class="my-3">Lista de usuários (${unFollowers.length})</h2>`;
  unFollowers.forEach((unFollower) => {
    unFollowersDiv.innerHTML += `
          <div class="card" style="width: 14rem; margin: 0 auto 2rem;">
            <img src="${unFollower.avatar_url}" class="card-img-top" alt="${unFollower.login}">
            <div class="card-body">
              <h5 class="card-title">${unFollower.login}</h5>
              <a href="${unFollower.html_url}" target="_blank" class="btn btn-primary">Ver perfil</a>
            </div>
          </div>
          `;
  });
});
