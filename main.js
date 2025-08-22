class UserAuth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem("users")) || [];
        this.currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    }

    signup(username, email, password) {
        const exists = this.users.find(u => u.username === username);
        if (exists) {
            alert("Username already exists!");
            return false;
        }
        const newUser = {
            username,
            email,
            password,
            createdAt: new Date().toLocaleString(),
            loggedIn: false
        };
        this.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(this.users));
        alert("Signup successful! Please login.");
        window.location.href = "index.html";
    }

    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
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
            const user = this.users.find(u => u.username === this.currentUser.username);
            if (user) user.loggedIn = false;
            localStorage.setItem("users", JSON.stringify(this.users));
            localStorage.removeItem("currentUser");
            window.location.href = "index.html";
        }
    }

    getProfile() {
        if (!this.currentUser) {
            window.location.href = "index.html";
        } else {
            return this.currentUser;
        }
    }
}

const auth = new UserAuth();

// Signup form
if (document.getElementById("signupForm")) {
    document.getElementById("signupForm").addEventListener("submit", e => {
        e.preventDefault();
        const username = document.getElementById("signupUsername").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        auth.signup(username, email, password);
    });
}

// Login form
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", e => {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;
        auth.login(username, password);
    });
}

// Profile page
if (document.getElementById("profile")) {
    const user = auth.getProfile();
    if (user) {
        document.getElementById("profile").innerHTML = `
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Created At:</strong> ${user.createdAt}</p>
            <p><strong>Logged In:</strong> ${user.loggedIn}</p>
        `;
    }

    document.getElementById("logoutBtn").addEventListener("click", () => {
        auth.logout();
    });
}
