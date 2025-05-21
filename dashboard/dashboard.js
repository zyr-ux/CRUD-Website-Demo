let admins = JSON.parse(localStorage.getItem("admins")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];

function loadDashboard() {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    const admin = admins.find(a => a.email === email && a.isActive);

    if (!admin) {
        window.location.href = "../login/login.html";
        return;
    }

    // Replace the history entry to skip login.html when going back
    history.replaceState(null, '', 'dashboard.html?email=' + encodeURIComponent(email));
    // Push the landing page into history so back button goes there
    history.pushState({ page: 'dashboard' }, '', 'dashboard.html?email=' + encodeURIComponent(email));

    // Handle back button press
    window.onpopstate = function(event) {
        if (event.state && event.state.page === 'dashboard') {
            window.location.replace('../index.html');
        }
    };

    displayAdminPanel();
    displayUserPanel();
}

function displayAdminPanel() {
    const adminList = document.getElementById("admin-list");
    adminList.innerHTML = "";
    admins.forEach(admin => {
        const isSuperAdmin = admin.email === "superadmin@example.com";
        const adminDiv = document.createElement("div");
        adminDiv.className = `admin-item ${isSuperAdmin ? 'superadmin' : ''}`;
        adminDiv.innerHTML = `
            <p><strong>Name:</strong> ${admin.name}</p>
            <p><strong>Email:</strong> ${admin.email}</p>
            <p><strong>Status:</strong> ${admin.isActive ? "Active" : "Inactive"}</p>
            <div class="actions">
                <span class="${isSuperAdmin ? 'disabled' : ''}" ${!isSuperAdmin ? `onclick="showEditAdminModal('${admin.email}')"` : ''}>
                    <svg class="action-icon edit" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </span>
                <span class="${isSuperAdmin ? 'disabled' : ''}" ${!isSuperAdmin ? `onclick="toggleAdminStatus('${admin.email}')"` : ''}>
                    <svg class="action-icon ${admin.isActive ? 'deactivate' : 'activate'}" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        ${admin.isActive ? 
                            `<path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>` : 
                            `<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>`}
                    </svg>
                </span>
                <span class="${isSuperAdmin ? 'disabled' : ''}" ${!isSuperAdmin ? `onclick="deleteAdmin('${admin.email}')"` : ''}>
                    <svg class="action-icon delete" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </span>
            </div>
        `;
        adminList.appendChild(adminDiv);
    });
}

function displayUserPanel() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";
    users.forEach(user => {
        const userDiv = document.createElement("div");
        userDiv.className = "user-item";
        userDiv.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Skills:</strong> ${user.skills.join(", ")}</p>
            <p><strong>Status:</strong> ${user.isActive ? "Active" : "Inactive"}</p>
            <div class="actions">
                <span onclick="showEditUserModal('${user.email}')">
                    <svg class="action-icon edit" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </span>
                <span onclick="toggleUserStatus('${user.email}')">
                    <svg class="action-icon ${user.isActive ? 'deactivate' : 'activate'}" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        ${user.isActive ? 
                            `<path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>` : 
                            `<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>`}
                    </svg>
                </span>
                <span onclick="deleteUser('${user.email}')">
                    <svg class="action-icon delete" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </span>
            </div>
        `;
        userList.appendChild(userDiv);
    });
}

function toggleAddAdminForm() {
    const form = document.getElementById("add-admin-form");
    const button = document.getElementById("toggle-admin-form-btn");
    if (form.classList.contains("hidden")) {
        form.classList.remove("hidden");
        form.classList.add("visible");
        button.textContent = "Cancel";
    } else {
        form.classList.remove("visible");
        form.classList.add("hidden");
        button.textContent = "Add Admin";
    }
}

function toggleAddUserForm() {
    const form = document.getElementById("add-user-form");
    const button = document.getElementById("toggle-user-form-btn");
    if (form.classList.contains("hidden")) {
        form.classList.remove("hidden");
        form.classList.add("visible");
        button.textContent = "Cancel";
    } else {
        form.classList.remove("visible");
        form.classList.add("hidden");
        button.textContent = "Add User";
    }
}

function addAdmin() {
    const name = document.getElementById("new-admin-name").value;
    const email = document.getElementById("new-admin-email").value;
    const password = document.getElementById("new-admin-password").value;

    if (name && email && password) {
        admins.push({ name, email, password, isActive: true });
        localStorage.setItem("admins", JSON.stringify(admins));
        displayAdminPanel();
        toggleAddAdminForm();
    }
}

function showEditAdminModal(email) {
    const admin = admins.find(a => a.email === email);
    document.getElementById("edit-admin-name").value = admin.name;
    document.getElementById("edit-admin-email").value = admin.email;
    document.getElementById("edit-admin-password").value = admin.password;
    const modal = document.getElementById("edit-admin-modal");
    document.body.classList.add("modal-open");
    modal.style.display = "flex";
    modal.dataset.email = email;
}

function closeEditAdminModal() {
    const modal = document.getElementById("edit-admin-modal");
    document.body.classList.remove("modal-open");
    modal.style.display = "none";
}

function saveAdminChanges() {
    const email = document.getElementById("edit-admin-modal").dataset.email;
    const admin = admins.find(a => a.email === email);
    const newName = document.getElementById("edit-admin-name").value;
    const newEmail = document.getElementById("edit-admin-email").value;
    const newPassword = document.getElementById("edit-admin-password").value;

    if (newName && newEmail && newPassword) {
        admin.name = newName;
        admin.email = newEmail;
        admin.password = newPassword;
        localStorage.setItem("admins", JSON.stringify(admins));
        displayAdminPanel();
        closeEditAdminModal();
    }
}

function toggleAdminStatus(email) {
    const admin = admins.find(a => a.email === email);
    admin.isActive = !admin.isActive;
    localStorage.setItem("admins", JSON.stringify(admins));
    displayAdminPanel();
}

function deleteAdmin(email) {
    if (confirm("Are you sure you want to delete this admin?")) {
        admins = admins.filter(a => a.email !== email);
        localStorage.setItem("admins", JSON.stringify(admins));
        displayAdminPanel();
    }
}

function addUser() {
    const name = document.getElementById("new-user-name").value;
    const email = document.getElementById("new-user-email").value;
    const skills = document.getElementById("new-user-skills").value.split(",").map(skill => skill.trim()).filter(skill => skill);

    if (name && email) {
        users.push({ name, email, skills, isActive: true });
        localStorage.setItem("users", JSON.stringify(users));
        displayUserPanel();
        toggleAddUserForm();
    }
}

function showEditUserModal(email) {
    const user = users.find(u => u.email === email);
    document.getElementById("edit-user-name").value = user.name;
    document.getElementById("edit-user-email").value = user.email;
    document.getElementById("edit-user-skills").value = user.skills.join(", ");
    const modal = document.getElementById("edit-user-modal");
    document.body.classList.add("modal-open");
    modal.style.display = "flex";
    modal.dataset.email = email;
}

function closeEditUserModal() {
    const modal = document.getElementById("edit-user-modal");
    document.body.classList.remove("modal-open");
    modal.style.display = "none";
}

function saveUserChanges() {
    const email = document.getElementById("edit-user-modal").dataset.email;
    const user = users.find(u => u.email === email);
    const newName = document.getElementById("edit-user-name").value;
    const newEmail = document.getElementById("edit-user-email").value;
    const newSkills = document.getElementById("edit-user-skills").value.split(",").map(skill => skill.trim()).filter(skill => skill);

    if (newName && newEmail) {
        user.name = newName;
        user.email = newEmail;
        user.skills = newSkills;
        localStorage.setItem("users", JSON.stringify(users));
        displayUserPanel();
        closeEditUserModal();
    }
}

function toggleUserStatus(email) {
    const user = users.find(u => u.email === email);
    user.isActive = !user.isActive;
    localStorage.setItem("users", JSON.stringify(users));
    displayUserPanel();
}

function deleteUser(email) {
    if (confirm("Are you sure you want to delete this user?")) {
        users = users.filter(u => u.email !== email);
        localStorage.setItem("users", JSON.stringify(users));
        displayUserPanel();
    }
}