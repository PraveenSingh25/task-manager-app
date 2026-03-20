let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span style="text-decoration:${task.done ? 'line-through' : 'none'}">
                ${task.text}
            </span>

            <div class="actions">
                <button class="complete" onclick="toggleTask(${index})">
                    <i class="fa fa-check"></i>
                </button>
                <button class="edit" onclick="editTask(${index})">
                    <i class="fa fa-pen"></i>
                </button>
                <button class="delete" onclick="deleteTask(${index})">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        `;

        list.appendChild(li);
    });

    updateCount();
}

function addTask() {
    let input = document.getElementById("taskInput");

    if (input.value === "") return;

    tasks.push({ text: input.value, done: false });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    showTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

function editTask(index) {
    let newTask = prompt("Edit task:", tasks[index].text);
    if (newTask !== null) {
        tasks[index].text = newTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        showTasks();
    }
}

function searchTask() {
    let value = document.getElementById("search").value.toLowerCase();
    let items = document.querySelectorAll("li");

    items.forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(value)
            ? "flex"
            : "none";
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

function updateCount() {
    document.getElementById("count").innerText =
        "Total Tasks: " + tasks.length;
}

showTasks();