// =========================
// GET ELEMENTS
// =========================

const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskCount = document.getElementById("taskCount");

const tasksContainer = document.getElementById("tasksContainer");

const emptyMessage = document.getElementById("emptyMessage");


// =========================
// TASKS ARRAY
// =========================

let tasks = [];


// =========================
// ADD TASK
// =========================

addTaskBtn.addEventListener("click", function () {

    const taskText = taskInput.value.trim();

    // Check Empty Input
    if (taskText === "") {

        alert("Please Enter New Task");

        return;
    }

    // Check Characters Length
    if (taskText.length < 3 || taskText.length > 30) {

        alert("PLEASE CAN WRITE BETWEEN 3 WORDS TO 30 WORDS");

        return;
    }

    // Create Task Object
    const task = {

        id: Date.now(),

        text: taskText,

        completed: false
    };

    // Add Task
    tasks.push(task);

    // Clear Input
    taskInput.value = "";

    // Display Tasks
    displayTasks();

});


// =========================
// ENTER KEY
// =========================

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addTaskBtn.click();

    }

});


// =========================
// DISPLAY TASKS
// =========================

function displayTasks() {

    // Clear Tasks

    tasksContainer.innerHTML = "";


    // Update Counter

    taskCount.textContent = tasks.length;


    // Empty State

    if (tasks.length === 0) {

        emptyMessage.style.display = "flex";

        return;

    }


    // Hide Empty Message

    emptyMessage.style.display = "none";


    // Create Tasks

    tasks.forEach(function (task) {


        // Task Div

        const taskDiv = document.createElement("div");

        taskDiv.classList.add("task-item");


        // Completed

        if (task.completed) {

            taskDiv.classList.add("completed");

        }


        // Task HTML

        taskDiv.innerHTML = `

            <div class="task-text">
                ${task.text}
            </div>

            <div class="task-buttons">

                <button class="complete-btn">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>

        `;


        // Complete Button

        const completeBtn =
            taskDiv.querySelector(".complete-btn");


        completeBtn.addEventListener("click", function () {

            task.completed = !task.completed;

            displayTasks();

        });


        // Delete Button

        const deleteBtn =
            taskDiv.querySelector(".delete-btn");


        deleteBtn.addEventListener("click", function () {

            tasks = tasks.filter(function (item) {

                return item.id !== task.id;

            });


            displayTasks();

        });


        // Add Task To Container

        tasksContainer.appendChild(taskDiv);

    });

}