

const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeButton.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

        localStorage.setItem("theme", "dark");

    } else {

        themeButton.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

        localStorage.setItem("theme", "light");
    }
});


if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

    themeButton.innerHTML =
        '<i class="fa-solid fa-sun"></i>';
}




const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuToggle.addEventListener("click", function () {

    sidebar.classList.add("show");
    overlay.classList.add("show");

});


overlay.addEventListener("click", function () {

    sidebar.classList.remove("show");
    overlay.classList.remove("show");

});




const savedUser = localStorage.getItem("stafflyUser");

if (savedUser) {

    const user = JSON.parse(savedUser);

    document.getElementById("user-name").textContent =
        user.name;

    document.getElementById("user-email").textContent =
        user.email;
}


/* Employees */

let employees =
    JSON.parse(localStorage.getItem("employees")) || [];




const total = employees.length;

const active = employees.filter(function (employee) {
    return employee.status === "Active";
}).length;

const inactive = employees.filter(function (employee) {
    return employee.status === "Inactive";
}).length;


document.getElementById("total-employees").textContent = total;

document.getElementById("active-employees").textContent = active;

document.getElementById("inactive-employees").textContent = inactive;

document.getElementById("monthly-employees").textContent = active;




const departmentChart =
    document.getElementById("departmentChart");

new Chart(departmentChart, {

    type: "bar",

    data: {

        labels: [
            "HR",
            "IT",
            "Finance",
            "Marketing",
            "Sales",
            "Accounts"
        ],

        datasets: [{
            label: "Employees",

            data: [
                employees.filter(e => e.department === "HR").length,
                employees.filter(e => e.department === "IT").length,
                employees.filter(e => e.department === "Finance").length,
                employees.filter(e => e.department === "Marketing").length,
                employees.filter(e => e.department === "Sales").length,
                employees.filter(e => e.department === "Accounts").length
            ],

            backgroundColor: "#F0C987",
            borderRadius: 7
        }]
    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {

            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});


/* Status Chart */

const statusChart =
    document.getElementById("statusChart");

new Chart(statusChart, {

    type: "doughnut",

    data: {

        labels: [
            "Active",
            "Inactive"
        ],

        datasets: [{

            data: [
                active,
                inactive
            ],

            backgroundColor: [
                "#F0C987",
                "#6d596b"
            ],

            borderWidth: 0
        }]
    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        cutout: "65%",

        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }
});




const recentEmployees =
    document.getElementById("recent-employees");

if (employees.length > 0) {

    recentEmployees.innerHTML = "";

    employees.slice(-5).reverse().forEach(function (employee) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.position}</td>
            <td>${employee.status}</td>
        `;

        recentEmployees.appendChild(row);
    });
}




document.getElementById("logout").addEventListener("click", function () {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

});
