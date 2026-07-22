
const themeBtn = document.getElementById("theme-btn");
const themeIcon = document.getElementById("theme-icon");

// --------------------------
// Load Saved Theme
// --------------------------

const savedTheme = localStorage.getItem("theme") || "dark";

document.body.classList.remove("dark", "light");
document.body.classList.add(savedTheme);

if (savedTheme === "light") {

    themeIcon.src = "images/icon-moon.svg";

} else {

    themeIcon.src = "images/icon-sun.svg";

}

// --------------------------
// Toggle Theme
// --------------------------

themeBtn.addEventListener("click", function () {

    if (document.body.classList.contains("dark")) {

        document.body.classList.replace("dark", "light");

        themeIcon.src = "images/icon-moon.svg";

        localStorage.setItem("theme", "light");

    } else {

        document.body.classList.replace("light", "dark");

        themeIcon.src = "images/icon-sun.svg";

        localStorage.setItem("theme", "dark");

    }

});


const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");

const allBtn = document.querySelectorAll(".filter")[0];
const activeBtn = document.querySelectorAll(".filter")[1];
const completedBtn = document.querySelectorAll(".filter")[2];

const clearCompleted = document.getElementById("clear-completed");


// --------------------------
// Add Todo
// --------------------------

input.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        const text = input.value.trim();

        if (text === "") return;

        createTodo(text);

        input.value = "";

        updateItemsLeft();

    }

});


// --------------------------
// Create Todo
// --------------------------

function createTodo(text) {

    const li = document.createElement("li");

    li.className = "todo-item";

    li.innerHTML = `

        <div class="left">

            <button class="check-btn"></button>

            <span>${text}</span>

        </div>

        <button class="delete-btn">

            <img src="images/icon-cross.svg">

        </button>

    `;

    todoList.appendChild(li);

}


todoList.addEventListener("click", function (e) {

    // Delete

    if (e.target.closest(".delete-btn")) {

        e.target.closest(".todo-item").remove();

        updateItemsLeft();

    }

    // Complete

    if (e.target.classList.contains("check-btn")) {

        e.target.closest(".todo-item").classList.toggle("completed");

        updateItemsLeft();

    }

});


// --------------------------
// Items Left
// --------------------------

function updateItemsLeft() {

    const activeItems = document.querySelectorAll(".todo-item:not(.completed)");

    itemsLeft.textContent = activeItems.length;

}

updateItemsLeft();


// --------------------------
// Filters
// --------------------------

allBtn.addEventListener("click", function () {

    setActiveButton(allBtn);

    document.querySelectorAll(".todo-item").forEach(todo => {

        todo.style.display = "flex";

    });

});



activeBtn.addEventListener("click", function () {

    setActiveButton(activeBtn);

    document.querySelectorAll(".todo-item").forEach(todo => {

        if (todo.classList.contains("completed")) {

            todo.style.display = "none";

        } else {

            todo.style.display = "flex";

        }

    });

});



completedBtn.addEventListener("click", function () {

    setActiveButton(completedBtn);

    document.querySelectorAll(".todo-item").forEach(todo => {

        if (todo.classList.contains("completed")) {

            todo.style.display = "flex";

        } else {

            todo.style.display = "none";

        }

    });

});


// --------------------------
// Clear Completed
// --------------------------

clearCompleted.addEventListener("click", function () {

    document.querySelectorAll(".completed").forEach(todo => {

        todo.remove();

    });

    updateItemsLeft();

});


// --------------------------
// Active Button
// --------------------------

function setActiveButton(button) {

    document.querySelectorAll(".filter").forEach(btn => {

        btn.classList.remove("active");

    });

    button.classList.add("active");

}