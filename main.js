const inputField = document.querySelector(".add-form"),
  todoList = document.querySelector(".todoList"),
  progressNum = document.querySelector(".progress-num"),
  clear = document.querySelector(".clear"),
  success = document.querySelector(".task-success"),
  bar = document.querySelector(".bar"),
  checkAllTasks = document.querySelector(".checkAll"),
  addBtn = document.querySelector(".add"),
  formAdd = document.querySelector(".form-add"),
  deleteForm = document.querySelector(".task-delete");

//Add task. Create a templete. Mỗi lần add task thì kiểm tra
function inputValue() {
  let inputVal = inputField.value.trim();
  if (inputVal.length > 0) {
    let task = `
    <div class="item">
    <input type="checkbox" class="item-completed pending" onclick ="handleStatus(this)">
    <span class="item-description">${inputVal}</span>
    <div class="item-input hide">
      <textarea rows="3">${inputVal}</textarea>
      <button class="edit-success success btn" onclick = "editSuccess(this)">Add</button>
      <button class="edit-delete delete btn" onclick = "editCancel(this)"><i class="fas fa-times"></i></button>
    </div>
    <i class="item-delete fa-solid fa-trash-can" onclick = "deleteTask(this)"></i>
  </div>
        `;
    todoList.insertAdjacentHTML("beforeend", task);
    //Remove value input when user add task
    hideAddTask();
    checked();
  }
}

//Task progress. Tính tiến độ task. Tìm tổng số task bằng cách lấy nodelist class item-completed. Thêm class checked vào task đã hoàn thành qua handleStatus().
function checked() {
  let checkedTask = document.querySelectorAll(".checked");
  let total = document.querySelectorAll(".item-completed");
  let percent = Math.floor((100 / total.length) * checkedTask.length);
  setProgessVal(percent);
  if (percent === 100) {
    checkAllTasks.checked = true;
  } else {
    checkAllTasks.checked = false;
  }
  return percent;
}

// Click submit form
success.addEventListener("click", () => {
  inputValue();
});

// Keyup submit form
inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    inputValue();
  }
});

//Change color progress bar. Thêm class checked vào task đã hoàn thành. Lấy result percent của checked(). Kiểm tra và thêm class bg-green
function handleStatus(e) {
  e.classList.toggle("checked");
  let checkColor = checked();
  if (checkColor === 100) {
    bar.classList.add("bg-green");
  } else {
    bar.classList.remove("bg-green");
  }
}

//Add Task Form

addBtn.addEventListener("click", () => {
  formAdd.classList.add("is-show");
  addBtn.classList.add("is-hide");
});
deleteForm.addEventListener("click", () => {
  hideAddTask();
});

//Delete Form Add Task. Khi user click ra ngoài
document.addEventListener("click", (e) => {
  let addTaskForm = document.querySelector(".form");
  if (!addTaskForm.contains(e.target)) {
    hideAddTask();
  }
});

//Check All Task
checkAllTasks.addEventListener("click", () => {
  let tasks = document.querySelectorAll(".pending");
  if (checkAllTasks.checked) {
    tasks.forEach((e) => {
      bar.classList.add("bg-green");
      setProgessVal(100);
      e.checked = true;
    });
  } else {
    bar.classList.remove("bg-green");
    setProgessVal(0);
    tasks.forEach((e) => {
      e.checked = false;
    });
  }
});

//Delete Task
function deleteTask(e) {
  e.parentNode.remove();
  let total = document.querySelectorAll(".item-completed");
  checked();
  if (total.length === 0) {
    setProgessVal(0);
  }
}

//Delete All
clear.addEventListener("click", () => {
  todoList.innerHTML = "";
  setProgessVal(0);
  checkAllTasks.checked = false;
});

// Set Progress Bar value and Progress Number
function setProgessVal(num) {
  bar.style.width = `${num}%`;
  progressNum.textContent = `${num}%`;
}

// CONVERT SPAN TO INPUT

document.addEventListener("click", function (e) {
  if (e.target.matches(".item-description")) {
    e.target.classList.add("hide");
    e.target.nextElementSibling.classList.remove("hide");
  }
});

function editSuccess(e) {
  const editInput = e.previousElementSibling;
  const editSpan = editInput.parentNode.previousElementSibling;
  editSpan.textContent = editInput.value;
  editSpan.classList.remove("hide");
  editInput.parentNode.classList.add("hide");
}

function editCancel(e) {
  const editInput = e.previousElementSibling.previousElementSibling;
  const editSpan = editInput.parentNode.previousElementSibling;
  editInput.value = editSpan.textContent;
  editSpan.classList.remove("hide");
  editInput.parentNode.classList.add("hide");
}

//Hide Add Task Form
function hideAddTask() {
  inputField.value = "";
  formAdd.classList.remove("is-show");
  addBtn.classList.remove("is-hide");
}
