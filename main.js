let addBtn = document.getElementById("add-btn");
let cancel = document.getElementById("cancel");
let page = document.querySelector(".page");
let input = document.getElementById("input");
let addTask = document.getElementById("add");
let showTask = document.getElementById("task");
let delBtn = document.getElementById("del-btn");
let checked = document.querySelector(".task-txt");

let change = "Add";

// Add - Cancel page
function addCancel() {
  addBtn.addEventListener("click", () => {
    page.classList.remove("text");
    input.value = "";
    input.focus();
  });

  cancel.addEventListener("click", () => {
    page.classList.add("text");
  });
}

addCancel();

// Create Data
let arrTasks = [];
if (window.localStorage.getItem("dataTask")) {
  arrTasks = JSON.parse(window.localStorage.getItem("dataTask"));
}

function createData() {
  addTask.addEventListener("click", () => {
    let taskData = {
      title: input.value,
      date: `${new Date().getDate()} / ${
        new Date().getMonth() + 1
      } / ${new Date().getFullYear()}`,
      isDone: false,
    };

    if (input.value === "") {
      alert("Enter the task name");
    } else {
      page.classList.add("text");

      if (change === "Add") {
        arrTasks.push(taskData);
      } else {
        arrTasks[upData] = taskData;
        addTask.innerHTML = "Add";
        change = "Add";
      }
    }

    saveTasks();
    showData();
  });
}

createData();

// show data
function showData() {
  showTask.innerHTML = "";
  let index = 0;
  for (tasks of arrTasks) {
    let content = `
    <div class="task ${tasks.isDone ? "checked" : ""}">
                            <div class="task-txt">
                                <p style="color: black;">${tasks.title}</p>
                                <div>
                                    <span class="material-symbols-outlined">
                                        calendar_month
                                        </span>
                                        ${tasks.date}
                                    </div>
                            </div>
                            <div class="icons">
                                <button onclick ="updateTask(${index})"class="circule" style="background-color: #18188e; color: whitesmoke;">
                                    <span class="material-symbols-outlined">
                                        edit
                                        </span>
                                </button>
                                ${
                                  tasks.isDone
                                    ? `
                                  <button onclick = "completeTask(${index})"class="circule" style="background-color: #C80036; color: white">
                                    <span class="material-symbols-outlined">
                                      close
                                    </span>
                                </button>
                                  `
                                    : `
                                  <button onclick = "completeTask(${index})"class="circule" style="background-color: #059212; color: white">
                                    <span class="material-symbols-outlined">
                                        check
                                        </span>
                                </button>
                                  `
                                }

                                
                                <button onclick = "deleteData(${index})" class="circule" style="background-color: #973131; color: white">
                                    <span class="material-symbols-outlined">
                                        delete
                                        </span>
                                </button>
                            </div>
                        </div>
    `;
    showTask.innerHTML += content;
    index++;
  }
}

showData();

// Save tasks in local Storage
function saveTasks() {
  const dataArr = JSON.stringify(arrTasks);
  window.localStorage.setItem("dataTask", dataArr);
}

// delete data
function deleteData(index) {
  let confer = confirm(
    `Are you sure you want to delete the ${arrTasks[index].title}?`
  );
  if (confer === true) {
    arrTasks.splice(index, 1);
    saveTasks();
    showData();
  }
}

// update Task
let upData;
function updateTask(index) {
  let confer = confirm(`Are you sure to update the ${arrTasks[index].title}?`);
  if (confer === true) {
    page.classList.remove("text");
    input.value = arrTasks[index].title;

    addTask.innerHTML = "Update";
    change = "Update";
    upData = index;
  }
}

// checked task
function completeTask(index) {
  let tasks = arrTasks[index];
  if (tasks.isDone === false) {
    tasks.isDone = true;
  } else {
    tasks.isDone = false;
  }

  saveTasks();
  showData();
}
