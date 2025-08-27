class UserAuth {
  constructor() {
    this.users = JSON.parse(localStorage.getItem("users")) || [];
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  }

  signup(username, email, password) {
    const exists = this.users.find((u) => u.username === username);
    if (exists) {
      alert("Username already exists!");
      return false;
    }
    const newUser = { username, email, password, loggedIn: false };
    this.users.push(newUser);
    localStorage.setItem("users", JSON.stringify(this.users));
    alert("Signup successful! Please login.");
    window.location.href = "index.html"; // back to login
  }

  login(username, password) {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      user.loggedIn = true;
      this.currentUser = user;
      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "profile.html";
    } else {
      alert("Invalid username or password");
    }
  }

  logout() {
    if (this.currentUser) {
      const user = this.users.find(
        (u) => u.username === this.currentUser.username
      );
      if (user) user.loggedIn = false;
      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    }
  }

  getProfile() {
    if (!this.currentUser) {
      alert("Please login first!");
      window.location.href = "index.html";
      return null;
    } else {
      return this.currentUser;
    }
  }
}

const auth = new UserAuth();

let user = JSON.parse(localStorage.getItem("currentUser"));

if (user){
  if(user.loggedIn && !window.location.href.includes("profile.html")){window.location.href = "profile.html"}
}

//  Auto-redirect if already logged in 
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser && currentUser.loggedIn) {
  if (window.location.pathname.includes("index.html")) {
    window.location.href = "profile.html";
  }
}

//  Signup form 
if (document.getElementById("signupForm")) {
  document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    auth.signup(username, email, password);
  });
}

// Login form 
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    auth.login(username, password);
  });
}

//  Profile page 
if (document.getElementById("profile")) {
  const user = auth.getProfile();
  if (user) {
    document.getElementById("profile").innerHTML = `
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Status:</strong> ${
        user.loggedIn ? "✔️ " : "❌ "
      }</p>
    `;
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    auth.logout();
  });
}
