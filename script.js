"use strict";

const card = document.getElementById("github-card");
const usernameText = document.querySelector(".username-text");
const search = document.querySelector(".search");

search.addEventListener("click", () => {
  let username = "";

  if (usernameText.value !== "") {
    username = usernameText.value;

    fetchGitHubApi(username).catch((error) => {
      console.log(error);
    });
  }
});

usernameText.addEventListener("keypress", (e) => {
  let username = "";

  if (e.key === "Enter" && usernameText.value !== "") {
    username = usernameText.value;

    fetchGitHubApi(username).catch((error) => {
      console.log(error);
    });
  }
});

const fetchGitHubApi = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();

  const profile = {
    avatar: data.avatar_url,
    name: data.name,
    username: data.login,
    publicRepos: data.public_repos,
    url: data.html_url,
    joinedDate: data.created_at,
    lastUpdated: data.updated_at,
    bio: data.bio,
    followers: data.followers,
    following: data.following,
    twitterUsername: data.twitter_username,
    location: data.location,
    company: data.company,
    blog: data.blog,
    email: data.email,
  };

  formatGitHubProfile(profile);

  console.log(data);

  return data;
};

const formatGitHubProfile = (profile) => {
  let {
    avatar,
    name,
    username,
    publicRepos,
    url,
    joinedDate,
    lastUpdated,
    bio,
    followers,
    following,
    twitterUsername,
    location,
    blog,
    email,
  } = profile;

  const twitterUrl = "https://www.twitter.com";

  let date = new Date(joinedDate).toLocaleDateString();
  let lastUpdatedDate = new Date(lastUpdated).toLocaleDateString();

  name = name === null ? "" : name;

  bio = bio === null ? "This profile has no bio" : bio;

  twitterUsername =
    twitterUsername === null
      ? "Not available"
      : `<a href="${twitterUrl}/${twitterUsername}">${twitterUsername}</a>`;

  location = location === null ? "Not available" : location;

  blog = blog === "" ? "No blog provided" : `<a href="${blog}">Blog</a>`;
  email = email === null ? "No email provided" : `<a href="${email}">Email</a>`;

  // Displays the container as it was initially set to display: none
  card.style.display = "grid";

  // Generates the HTML of the elements that were returned from the search
  let html = `
        <img id="github-card__avatar" src="${avatar}" alt="${name}">
        <h3 id="github-card__name">${name}</h3>
        <p id="github-card__joined-date">Joined ${date}</p>
        <a href="${url}"><p id="github-card__username">@${username}</p></a>
        <p id="github-card__last-updated">Last updated on ${lastUpdatedDate}</p>
        <p id="github-card__bio">${bio}</p>
        
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
        <div class="github-card__contact-info">
          <div id="github-card__twitter"><img src="./images/twitter.png">${twitterUsername}</div>
          <div id="github-card__location"><img src="./images/location.png">${location}</div>
          <div id="github-card__blog"><img src="./images/link.png">${blog}</div>
          <div id="github-card__email"><img src="./images/email.png">${email}</div>
        </div>
    `;

  card.innerHTML = html;
};
