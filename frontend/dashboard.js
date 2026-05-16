function loadDashboard() {
    const userName = localStorage.getItem("userName");

    if (!userName) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("welcomeText").innerText =
        "Welcome, " + userName;
}

function logoutUser() {
    localStorage.clear();
    window.location.href = "dashboard.html";
}