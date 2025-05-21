// Initialize admins and users arrays in localStorage if they don't exist
if (!localStorage.getItem("admins")) {
    const initialAdmins = [
        { name: "Super Admin", email: "superadmin@example.com", password: "super123", isActive: true }
    ];
    localStorage.setItem("admins", JSON.stringify(initialAdmins));
}
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
}

function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    const admins = JSON.parse(localStorage.getItem("admins")) || [];
    const admin = admins.find(a => a.email === email && a.password === password && a.isActive);

    if (admin) {
        errorMessage.style.display = "none";
        showModal(admin);
    } else {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Invalid credentials or account inactive";
    }
}

function showModal(admin) {
    const modal = document.getElementById("success-modal");
    document.getElementById("modal-name").textContent = `Name: ${admin.name}`;
    document.getElementById("modal-email").textContent = `Email: ${admin.email}`;
    document.body.classList.add("modal-open");
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("success-modal");
    const email = document.getElementById("modal-email").textContent.replace("Email: ", "");
    document.body.classList.remove("modal-open");
    modal.style.display = "none";
    // Replace the current history entry (login.html) with dashboard.html
    window.location.replace(`../dashboard/dashboard.html?email=${encodeURIComponent(email)}`);
}

function cancelLogin() {
    const modal = document.getElementById("success-modal");
    document.body.classList.remove("modal-open");
    modal.style.display = "none";
}

function togglePassword() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eye-icon");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle><line x1="1" y1="1" x2="23" y2="23" />`;
    } else {
        passwordInput.type = "password";
        eyeIcon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
    }
}