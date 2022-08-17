"use strict";

const card = document.getElementById("github-card");
const usernameText = document.querySelector(".username-text");
const search = document.querySelector(".search");

// const avatar = document.querySelector(".github-card__avatar");
// const gitHubUsername = document.querySelector(".github-card__username");
// const name = document.querySelector(".github-card__name");
// const publicRepos = document.querySelector(".github-card__public-repos");
// const followers = document.querySelector(".github-card__followers");
// const following = document.querySelector(".github-card__following");

// card.style.display = "none";

search.addEventListener("click", (e) => {
  let username = "";

  if (usernameText.value !== "") {
    username = usernameText.value;

    fetchGitHubApi(username)
      .then((data) => console.log(data))
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("Please enter a username.");
  }
});

usernameText.addEventListener("keypress", (e) => {
  let username = "";

  if (e.key === "Enter" && usernameText.value !== "") {
    username = usernameText.value;

    fetchGitHubApi(username)
      .then((data) => console.log(data))
      .catch((error) => {
        console.log(error);
      });
  }
});

const fetchGitHubApi = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();

  const profile = {
    avatar: data.avatar_url,
    username: data.login,
    name: data.name,
    publicRepos: data.public_repos,
    url: data.html_url,
    joinedDate: data.created_at,
    bio: data.bio,
    followers: data.followers,
    following: data.following,
    twitter: data.twitter_username,
  };

  formatGitHubProfile(profile);

  return data;
};

const formatGitHubProfile = (profile) => {
  let {
    avatar,
    username,
    name,
    publicRepos,
    url,
    joinedDate,
    bio,
    followers,
    following,
    twitter,
  } = profile;

  let date = new Date(joinedDate).toLocaleDateString();

  console.log(date);

  bio = bio === null ? "This profile has no bio" : bio;
  twitter = twitter === null ? "Not available" : twitter;

  card.style.display = "grid";

  let html = `
        <img id="github-card__avatar" src="${avatar}" alt="">
        <h3 id="github-card__name">${name}</h3>
        <a href="${url}" ><p id="github-card__username">@${username}</p></a>
        <p id="github-card__bio">${bio}</p>
        <p id="github-card__joined-date">Joined ${date}</p>
        <div id="github-card__stats-container">
            <table>
                <tr>
                    <th>Repos</th>
                    <th>Followers</th>
                    <th>Following</th>
                </tr>
                <tr>
                    <td id="github-card__public-repos">${publicRepos}</td>
                    <td id="github-card__followers">${followers}</td>
                    <td id="github-card__following">${following}</td>
                </tr>
            </table>
        </div>
        <div id="github-card__twitter"><img src="./images/twitter.png">${twitter}</div>
    `;

  card.innerHTML = html;
};
