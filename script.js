// Utility functions
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getImages() {
  return JSON.parse(localStorage.getItem("images")) || {};
}

function saveImages(images) {
  localStorage.setItem("images", JSON.stringify(images));
}

function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

function setCurrentUser(username) {
  localStorage.setItem("currentUser", username);
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Navigation
document.addEventListener("DOMContentLoaded", function () {
  // Login button
  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    loginBtn.addEventListener(
      "click",
      () => (window.location.href = "login.html")
    );
  }

  // Signup button
  const signupBtn = document.getElementById("signup-btn");
  if (signupBtn) {
    signupBtn.addEventListener(
      "click",
      () => (window.location.href = "signup.html")
    );
  }

  // Logout button
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  // Home button (go to landing page without logout)
  const homeBtn = document.getElementById("home-btn");
  if (homeBtn) {
    homeBtn.addEventListener(
      "click",
      () => (window.location.href = "index.html")
    );
  }

  // Upload button
  const uploadBtn = document.getElementById("upload-btn");
  if (uploadBtn) {
    uploadBtn.addEventListener("click", function () {
      document.getElementById("upload-input").click();
    });
  }

  // Upload input
  const uploadInput = document.getElementById("upload-input");
  if (uploadInput) {
    uploadInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const imgData = e.target.result;
          const currentUser = getCurrentUser();
          const images = getImages();
          if (!images[currentUser]) images[currentUser] = [];
          images[currentUser].unshift(imgData); // Add to beginning of array
          saveImages(images);
          // Prepend new image to the top of the container
          const container = document.getElementById("images-container");
          const imageWrapper = document.createElement("div");
          imageWrapper.className = "image-wrapper";

          const img = document.createElement("img");
          img.src = imgData;

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "delete-btn";
          deleteBtn.textContent = "×";
          deleteBtn.addEventListener("click", function () {
            const wrapper = this.parentElement;
            const currentIndex = Array.from(
              wrapper.parentElement.children
            ).indexOf(wrapper);
            deleteImage(currentUser, currentIndex);
            wrapper.remove();
          });

          imageWrapper.appendChild(img);
          imageWrapper.appendChild(deleteBtn);
          container.insertBefore(imageWrapper, container.firstChild); // Prepend to top
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Load page-specific content
  if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/"
  ) {
    loadLandingPage();
  } else if (window.location.pathname.endsWith("profile.html")) {
    if (!getCurrentUser()) {
      window.location.href = "login.html";
    } else {
      loadProfilePage();
    }
  } else if (window.location.pathname.endsWith("public-profile.html")) {
    loadPublicProfilePage();
  }
});

// Landing Page
function loadLandingPage() {
  const mosaic = document.getElementById("mosaic");
  const images = getImages();
  const allImages = [];

  // Collect all images from all users
  Object.values(images).forEach((userImages) => {
    allImages.push(...userImages);
  });

  // Shuffle and take first 10
  const shuffled = allImages.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 10);

  selected.forEach((imgData) => {
    const img = document.createElement("img");
    img.src = imgData;
    mosaic.appendChild(img);
  });
}

// Sign Up
const signupForm = document.getElementById("signup");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = getUsers();
    if (users.find((u) => u.username === username)) {
      alert("Username already exists");
      return;
    }

    users.push({ username, email, password });
    saveUsers(users);
    alert("Sign up successful! Please login.");
    window.location.href = "login.html";
  });
}

// Login
const loginForm = document.getElementById("login");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentUser(username);
      window.location.href = "profile.html";
    } else {
      alert("Invalid credentials");
    }
  });
}

// Profile Page
function loadProfilePage() {
  const currentUser = getCurrentUser();
  const images = getImages();
  const userImages = images[currentUser] || [];
  const container = document.getElementById("images-container");

  container.innerHTML = ""; // Clear container

  userImages.forEach((imgData, index) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "image-wrapper";

    const img = document.createElement("img");
    img.src = imgData;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "×";
    deleteBtn.addEventListener("click", function () {
      const wrapper = this.parentElement;
      const currentIndex = Array.from(wrapper.parentElement.children).indexOf(
        wrapper
      );
      deleteImage(currentUser, currentIndex);
      wrapper.remove();
    });

    imageWrapper.appendChild(img);
    imageWrapper.appendChild(deleteBtn);
    container.appendChild(imageWrapper);
  });
}

function deleteImage(username, index) {
  const images = getImages();
  if (images[username] && images[username][index] !== undefined) {
    images[username].splice(index, 1);
    saveImages(images);
  }
}

// Public Profile Page
function loadPublicProfilePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  if (!username) {
    alert("No username specified");
    return;
  }

  document.getElementById(
    "username-title"
  ).textContent = `${username}'s Artworks`;

  const images = getImages();
  const userImages = images[username] || [];
  const container = document.getElementById("images-container");

  userImages.forEach((imgData) => {
    const img = document.createElement("img");
    img.src = imgData;
    container.appendChild(img);
  });
}
