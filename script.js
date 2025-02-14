const get = (naam) => document.querySelector(`${naam}`);
const themeBtn = get(".theme");
const themeText = get(".theme-text");
const themeIcon = get("#theme-icon");
const body = document.body;

// Check local storage for theme preference on page load
function updateThemeUI() {
    if (body.classList.contains("light-mode")) {
        themeIcon.classList.remove("fa-sun");
        themeText.textContent = "DARK";
        themeIcon.classList.add("fa-moon");
        localStorage.setItem("theme", "light");

    } else {
        themeIcon.classList.add("fa-sun");
        themeText.textContent = "LIGHT";
        themeIcon.classList.remove("fa-moon");
        localStorage.setItem("theme", "dark");
    }
}

//apply saved theme on page load
if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    updateThemeUI();
}

// Toggle theme on button click
themeBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    updateThemeUI();
});
const url = "https://api.github.com/users/";
const searchBarInput = get("#search");
const noresults = get(".error");
const submitBtn = get(".blue-btn");
const avatar = get(".avatar");
const nameis = get("#name");
const userID = get("#username");
const joined = get(".joined");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("#bio");
const repo = get(".repo-value");
const follower = get(".followers-value");
const following = get(".following-value");
const locationis = get(".location-name")
const website = get("#page");
const twitter = get("#twitter");
const company = get(".company-name")

submitBtn.addEventListener("click", () => {
    const inputValue = searchBarInput.value.trim();
    fetchUserData(inputValue);
});

async function fetchUserData(userData) {
    try {
        const response = await fetch(url + userData);
        if (!response.ok) {
            throw new Error("User not found");
        }
        let data = await response.json();
        renderUserInfo(data);
    } catch (err) {
        alert("error aa gaya h");
        console.log(err);
    }    
};
searchBarInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const inputValue = searchBarInput.value.trim();
        if (inputValue) {
            fetchUserData(inputValue);
        }
    }
});

function renderUserInfo(userinfo) {
    nameis.innerText = userinfo?.name;
    avatar.src = userinfo?.avatar_url;
    userID.innerText = `@${userinfo?.login}`;
    if (userinfo?.blog) {
        website.innerText = userinfo.blog;
        website.href = `https://github.com/${userinfo?.login}`
    } else {
        website.innerText = "Not Available";
        website.removeAttribute("href");
    }
    // userID.href = `https://github.com/${userinfo?.login}`;
    const dateSegments = userinfo?.created_at.split("T")[0].split("-");
    joined.innerText = `Joined ${dateSegments[2]} ${months[dateSegments[1] - 1]} ${dateSegments[0]}`;
    bio.innerText = userinfo?.bio;
    repo.innerText = userinfo?.public_repos;
    follower.innerText = userinfo?.followers;
    following.innerText = userinfo?.following;
    locationis.innerText = userinfo?.location || "Not Available";
    website.innerText = userinfo?.blog || "Not Available";
    website.href = userinfo?.blog;
    twitter.innerText = userinfo?.twitter_username || "Not Available";
    company.innerText = userinfo?.company || "Not Available";
}

fetchUserData("iamarpitsharma");