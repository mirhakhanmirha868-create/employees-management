const modal = document.getElementById("employeeModal");
const viewModal = document.getElementById("viewModal");

const addEmployee = document.getElementById("addEmployee");
const closeModal = document.getElementById("closeModal");
const closeView = document.getElementById("closeView");

const employeeForm = document.getElementById("employeeForm");
const employeeList = document.getElementById("employee-list");
const emptyMessage = document.getElementById("empty-message");
const searchEmployee = document.getElementById("searchEmployee");

let employees = JSON.parse(localStorage.getItem("employees"));

/* Default Employees */

if (!employees) {
    employees = [
        {
            id: 1,
            name: "mahnoor",
            email: "ali@gmail.com",
            department: "IT",
            position: "Web Developer",
            status: "Active"
        },
        {
            id: 2,
            name: "kinza hashmi",
            email: "sara@gmail.com",
            department: "HR",
            position: "HR Manager",
            status: "Active"
        },
        {
            id: 3,
            name: "sufiyan ali",
            email: "hamza@gmail.com",
            department: "Finance",
            position: "Accountant",
            status: "Inactive"
        }
    ];

    localStorage.setItem("employees", JSON.stringify(employees));
}

let editId = null;


/* Theme */

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


/* User */

const savedUser = localStorage.getItem("stafflyUser");

if (savedUser) {

    const user = JSON.parse(savedUser);

    document.getElementById("user-name").textContent =
        user.name;

    document.getElementById("user-email").textContent =
        user.email;
}


/* Add Employee */

addEmployee.addEventListener("click", function () {

    editId = null;

    document.getElementById("modal-title").textContent =
        "Add Employee";

    document.getElementById("save-btn").textContent =
        "Add Employee";

    employeeForm.reset();

    modal.classList.add("show");
});


/* Close Add/Edit */

closeModal.addEventListener("click", function () {
    modal.classList.remove("show");
});


/* Close View */

closeView.addEventListener("click", function () {
    viewModal.classList.remove("show");
});


/* Add / Update Employee */

employeeForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const employeeData = {

        name: document.getElementById("employeeName").value,

        email: document.getElementById("employeeEmail").value,

        department: document.getElementById("department").value,

        position: document.getElementById("position").value,

        status: document.getElementById("status").value
    };


    /* Add */

    if (editId === null) {

        employeeData.id = Date.now();

        employees.push(employeeData);

    }


    /* Update */

    else {

        employees = employees.map(function (employee) {

            if (employee.id === editId) {

                return {
                    id: editId,
                    ...employeeData
                };

            }

            return employee;
        });
    }


    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

    employeeForm.reset();

    modal.classList.remove("show");

    editId = null;

    displayEmployees();
});


/* Display Employees */

function displayEmployees(list = employees) {

    employeeList.innerHTML = "";

    if (list.length === 0) {

        emptyMessage.style.display = "block";

        return;
    }

    emptyMessage.style.display = "none";


    list.forEach(function (employee) {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${employee.name}</td>

            <td>${employee.email}</td>

            <td>${employee.department}</td>

            <td>${employee.position}</td>

            <td>

                <span class="status ${
                    employee.status === "Active"
                    ? "active-status"
                    : "inactive-status"
                }">

                    ${employee.status}

                </span>

            </td>

            <td>

                <div class="actions">

                    <button
                        class="view-btn"
                        onclick="viewEmployee(${employee.id})">

                        <i class="fa-solid fa-eye"></i>

                    </button>


                    <button
                        class="edit-btn"
                        onclick="editEmployee(${employee.id})">

                        <i class="fa-solid fa-pen"></i>

                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteEmployee(${employee.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>
        `;

        employeeList.appendChild(row);
    });
}


/* View Employee */

function viewEmployee(id) {

    const employee = employees.find(function (e) {
        return e.id === id;
    });


    document.getElementById("view-name").textContent =
        employee.name;

    document.getElementById("view-email").textContent =
        employee.email;

    document.getElementById("view-department").textContent =
        employee.department;

    document.getElementById("view-position").textContent =
        employee.position;

    document.getElementById("view-status").textContent =
        employee.status;


    viewModal.classList.add("show");
}


/* Edit Employee */

function editEmployee(id) {

    const employee = employees.find(function (e) {
        return e.id === id;
    });


    editId = id;


    document.getElementById("modal-title").textContent =
        "Edit Employee";

    document.getElementById("save-btn").textContent =
        "Update Employee";


    document.getElementById("employeeName").value =
        employee.name;

    document.getElementById("employeeEmail").value =
        employee.email;

    document.getElementById("department").value =
        employee.department;

    document.getElementById("position").value =
        employee.position;

    document.getElementById("status").value =
        employee.status;


    modal.classList.add("show");
}


/* Delete Employee */

function deleteEmployee(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
        return;
    }


    employees = employees.filter(function (employee) {
        return employee.id !== id;
    });


    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );


    displayEmployees();
}


/* Search */

searchEmployee.addEventListener("input", function () {

    const value = this.value.toLowerCase();


    const filtered = employees.filter(function (employee) {

        return (
            employee.name.toLowerCase().includes(value) ||
            employee.email.toLowerCase().includes(value) ||
            employee.department.toLowerCase().includes(value) ||
            employee.position.toLowerCase().includes(value)
        );

    });


    displayEmployees(filtered);
});


/* Logout */

document.getElementById("logout").addEventListener("click", function () {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";
});


/* Start */

displayEmployees();
