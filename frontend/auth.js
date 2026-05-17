const API_BASE = "https://mcq-test-platform-9nl2.onrender.com/api/users";

async function registerUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        if (response.ok) {
            alert("Registration successful");
            window.location.href = "login.html";
        } else {
            alert("Registration failed");
        }
    } catch (error) {
        console.error(error);
        alert("Server error");
    }
}

async function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (!response.ok) {
            alert("Login failed");
            return;
        }

        const user = await response.json();

        if (user && user.id) {
            localStorage.setItem("userId", user.id);
            localStorage.setItem("userName", user.name);

            alert("Login successful");
            window.location.href = "index.html";
        } else {
            alert("Invalid login");
        }
    } catch (error) {
        console.error(error);
        alert("Server error");
    }
}