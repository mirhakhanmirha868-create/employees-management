const registerForm = document.getElementById("register-form");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const togglePassword = document.getElementById("toggle-password");
const toggleConfirm = document.getElementById("toggle-confirm");


// Show / Hide password
togglePassword.addEventListener("click", function () {

    if (password.type === "password") {
        password.type = "text";
        this.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        password.type = "password";
        this.classList.replace("fa-eye-slash", "fa-eye");
    }

});


// Show / Hide confirm password
toggleConfirm.addEventListener("click", function () {

    if (confirmPassword.type === "password") {
        confirmPassword.type = "text";
        this.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        confirmPassword.type = "password";
        this.classList.replace("fa-eye-slash", "fa-eye");
    }

});


// Create Account
registerForm.addEventListener("submit", function (e) {

    e.preventDefault();

    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return;
    }

    const gender =
        document.querySelector('input[name="gender"]:checked');

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: password.value,
        gender: gender.value
    };

    localStorage.setItem(
        "stafflyUser",
        JSON.stringify(user)
    );

    alert("Account created successfully! 🎉");

    window.location.href = "login.html";
});