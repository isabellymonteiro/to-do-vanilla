const addTaskForm = document.querySelector("#add-task-form")
const addTaskInput = document.querySelector('#add-task-input')
const addTaskButton = document.querySelector('#add-task-btn')

addTaskForm.addEventListener("submit", addTask)

function addTask(e) {
  e.preventDefault()
  var taskText = addTaskInput.value
  const taskList = document.querySelector("#tasks")
  const completedList = document.querySelector("#completed-tasks")

  if (!taskText) {
    alert("Please fill out the task")
    return
  }

  // task input (task element)
  const task = document.createElement("div")
  task.classList.add("task")

  const taskContent = document.createElement("div")
  taskContent.classList.add("content")

  const taskCheckbox = document.createElement("input")
  taskCheckbox.classList.add("task-checkbox")
  taskCheckbox.type = "checkbox"

  const taskInput = document.createElement("input")
  taskInput.classList.add("task-text")
  taskInput.type = "text"
  taskInput.value = taskText
  taskInput.setAttribute("readonly", "readonly")

  taskContent.appendChild(taskCheckbox)
  taskContent.appendChild(taskInput)
  task.appendChild(taskContent)

  // check class
  taskContent.addEventListener("click", () => {
     if (!taskCheckbox.getAttribute("checked")) {
        taskCheckbox.setAttribute("checked", "checked")
        taskInput.classList.add("checked")
        taskList.removeChild(task)
        completedList.appendChild(task)
     } else {
        taskCheckbox.removeAttribute("checked")
        taskInput.classList.remove("checked")
        taskList.appendChild(task)
     }
  })

  // actions (buttons)
  const taskActions = document.createElement("div")
  taskActions.classList.add("actions")

  const editButton = document.createElement("button")
  editButton.classList.add("edit-task-btn")
  editButton.innerText = "Edit"

  const deleteButton = document.createElement("button")
  deleteButton.classList.add("delete-task-btn")
  deleteButton.innerText = "Delete"

  taskActions.appendChild(editButton)
  taskActions.appendChild(deleteButton)
  
  task.appendChild(taskActions)

  // edit task
  editButton.addEventListener("click", () => {
    if (editButton.innerText.toLowerCase() === "edit") {
        taskInput.removeAttribute("readonly")
        taskInput.focus()
        editButton.innerText = "Save"
    } else {
        taskInput.setAttribute("readonly", "readonly")
        editButton.innerText = "Edit"
    }
  })
  
  // delete task
  deleteButton.addEventListener("click", () => {
    if (taskList.contains(task)) {
        taskList.removeChild(task)
    } else {
        completedList.removeChild(task)
    }
  })

  // append task element
  taskList.appendChild(task)

  // reset input value
  addTaskInput.value = ""
}
