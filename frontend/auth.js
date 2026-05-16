async function registerUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/register", {
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
    }
}

async function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("http://lhttps://mcq-test-platform-9nl2.onrender.comocalhost:8080/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const user = await response.json();

    if (user && user.id) {
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.name);

        alert("Login successful");

        window.location.href = "index.html";
    } else {
        alert("Invalid login");
    }
}