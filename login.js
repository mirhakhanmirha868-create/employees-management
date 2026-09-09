const loginForm = document.getElementById("login-form");

const password = document.getElementById("login-password");
const togglePassword = document.getElementById("toggle-password");


// Show / Hide Password

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        this.classList.replace(
            "fa-eye",
            "fa-eye-slash"
        );

    } else {

        password.type = "password";

        this.classList.replace(
            "fa-eye-slash",
            "fa-eye"
        );
    }

});


// Login

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email =
        document.getElementById("login-email").value;

    const enteredPassword =
        document.getElementById("login-password").value;


    const savedUser =
        localStorage.getItem("stafflyUser");


    if (!savedUser) {

        alert(
            "No account found. Please create an account first."
        );

        return;
    }


    const user = JSON.parse(savedUser);


    if (
        email === user.email &&
        enteredPassword === user.password
    ) {

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        alert("Login successful! 🎉");

        window.location.href =
            "dashboard.html";

    } else {

        alert("Incorrect email or password.");
    }

});