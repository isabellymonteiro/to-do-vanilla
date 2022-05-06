const addTaskForm = document.querySelector("#add-task-form")
const addTaskInput = document.querySelector('#add-task-input')
const taskList = document.querySelector("#tasks")
const completedTaskList = document.querySelector("#completed-tasks")
const mobileAddTaskButton = document.querySelector(".mobile-add-task-btn")
const allTasksText = []
const allCompletedTasksText = []
 
addTaskForm.addEventListener("submit", preventDefault)
mobileAddTaskButton.addEventListener("click", mobileAddTask)
 
function preventDefault(e) {
  e.preventDefault()
  addTask()
}

// mobile only
function mobileAddTask() {
  if (mobileAddTaskButton.classList.contains("mobile-add-task-btn--active")) {
    addTaskInput.value = ""
    hideForm()
  } else {
    showForm()
  }
}

const showForm = () => {
  mobileAddTaskButton.classList.add("mobile-add-task-btn--active")
  mobileAddTaskButton.setAttribute("aria-label", "close add task form")
  addTaskForm.style.display = "flex"
  addTaskForm.style.marginTop = "40px"
}

const hideForm = () => {
  mobileAddTaskButton.classList.remove("mobile-add-task-btn--active")
  mobileAddTaskButton.setAttribute("aria-label", "open add task form")
  addTaskForm.style.display = "none"
}

// desktop, tablet and mobile (all devices)
 
const addTask = (text = null) => {
 
  if (!text) {
    var taskText = addTaskInput.value.toLowerCase()
      if (!taskText) {
        alert("Please fill out the task")
        return
      }
  } else {
    var taskText = text.toLowerCase()
  }

  taskText = taskText[0].toUpperCase() + taskText.slice(1)
 
  allTasksText.push(taskText)
 
  const tasksText = orderTaskList(allTasksText)
 
  if (taskList) {
    cleanTaskList()
  }
 
  const tasks = createTaskList(tasksText)
 
  tasks.map(task => {
    taskList.appendChild(task)
  })
 
  if (!text) {
    addTaskInput.value = ""
  }
}
 
const addCompletedTask = (text) => {
  var completedTaskText = text.toLowerCase()
  completedTaskText = completedTaskText[0].toUpperCase() + completedTaskText.slice(1)
 
  allCompletedTasksText.push(completedTaskText)
 
  const completedTasksText = orderTaskList(allCompletedTasksText)
 
  if (completedTaskList) {
    cleanCompletedTaskList()
  }
 
  const completedTasks = createTaskList(completedTasksText, true)
 
  completedTasks.map(completedTask => {
    completedTaskList.appendChild(completedTask)
  })
}
 
const cleanTaskList = () => {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
}
 
const cleanCompletedTaskList = () => {
  while (completedTaskList.firstChild) {
    completedTaskList.removeChild(completedTaskList.firstChild)
  }
}
 
const orderTaskList = (tasksText) => {
  return tasksText.sort()
}
 
const createTaskList = (tasksText, completed = null) => {
  const tasks = tasksText.map(taskText => {
    const task = createElement("li")
    if (completed) {
      task.classList.add("completed-task")
    } else {
      task.classList.add("task")
    }
 
    const taskContent = createElement("div")
    taskContent.classList.add("content")
 
    const taskCheckbox = createElement("input")
    taskCheckbox.classList.add("task-checkbox")
    taskCheckbox.type = "checkbox"
 
    const taskInput = createElement("input")
    taskInput.classList.add("task-text")
    taskInput.type = "text"
    taskInput.value = taskText
    taskInput.setAttribute("readonly", "readonly")
 
    if (completed) {
      taskCheckbox.setAttribute("checked", "checked")
      taskInput.classList.add("checked")
    }
 
    taskCheckbox.addEventListener("click", () => {
      if (!taskCheckbox.getAttribute("checked")) {
          taskList.removeChild(task)
          allTasksText.splice(allTasksText.indexOf(taskInput.value), 1)
          addCompletedTask(taskInput.value)
      } else {
          completedTaskList.removeChild(task)
          allCompletedTasksText.splice(allCompletedTasksText.indexOf(taskInput.value), 1)
          addTask(taskInput.value)
      }
    })
 
    taskContent.appendChild(taskCheckbox)
    taskContent.appendChild(taskInput)
    task.appendChild(taskContent)
 
    const taskActions = createElement("div")
    taskActions.classList.add("actions")
 
    const editButton = createElement("button")
    editButton.classList.add("edit-task-btn")
    editButton.setAttribute("aria-label", "edit task")
 
    const deleteButton = createElement("button")
    deleteButton.classList.add("delete-task-btn")
    deleteButton.setAttribute("aria-label", "delete task")

    editButton.addEventListener("click", () => {
      if (editButton.classList.contains("edit-task-btn")) {
        taskInput.removeAttribute("readonly")
        taskInput.focus()
        editButton.classList.replace("edit-task-btn", "save-task-btn")
        editButton.setAttribute("aria-label", "save task")
      } else {
          if (completed) {
            completedTaskList.removeChild(task)
            allCompletedTasksText.splice(allCompletedTasksText.indexOf(taskInput.value), 1)
            addCompletedTask(taskInput.value)
          } else {
            taskList.removeChild(task)
            allTasksText.splice(allTasksText.indexOf(taskInput.value), 1)
            addTask(taskInput.value)
          }
      }
    })
   
    deleteButton.addEventListener("click", () => {
      if (taskList.contains(task)) {
        taskList.removeChild(task)
        allTasksText.splice(allTasksText.indexOf(taskInput.value), 1)
      } else {
        completedTaskList.removeChild(task)
        allCompletedTasksText.splice(allCompletedTasksText.indexOf(taskInput.value), 1)
      }
    })
 
    taskActions.appendChild(editButton)
    taskActions.appendChild(deleteButton)
    task.appendChild(taskActions)
 
    return task
  })
 
  return tasks
}
 
const createElement = (element) => {
  return document.createElement(element)
}
 