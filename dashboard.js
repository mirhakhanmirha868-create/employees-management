const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem("theme", "dark");
    } else {
        themeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem("theme", "light");
    }
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
}


const savedUser = localStorage.getItem("stafflyUser");

if (savedUser) {
    const user = JSON.parse(savedUser);

    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-email").textContent = user.email;
}


const departmentChart = document.getElementById("departmentChart");

new Chart(departmentChart, {
    type: "bar",

    data: {
        labels: ["HR", "IT", "Finance", "Marketing", "Sales", "Accounts"],

        datasets: [{
            data: [1, 1, 1, 1, 1, 1],
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
        }
    }
});


const statusChart = document.getElementById("statusChart");

new Chart(statusChart, {
    type: "doughnut",

    data: {
        labels: ["Active", "Inactive"],

        datasets: [{
            data: [5, 1],
            backgroundColor: ["#F0C987", "#6d596b"],
            borderWidth: 0
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});