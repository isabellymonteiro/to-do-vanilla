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
  addTaskForm.style.display = "flex"
  addTaskForm.style.marginTop = "40px"
}

const hideForm = () => {
  mobileAddTaskButton.classList.remove("mobile-add-task-btn--active")
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
 
  // order task list text
  const tasksText = orderTaskList(allTasksText)
 
  // clean previous task list
  if (taskList) {
    cleanTaskList()
  }
 
  // create new task list
  const tasks = createTaskList(tasksText)
 
  // append task element
  tasks.map(task => {
    taskList.appendChild(task)
  })
 
  // reset input value
  if (!text) {
    addTaskInput.value = ""
  }
}
 
const addCompletedTask = (text) => {
  var completedTaskText = text.toLowerCase()
  completedTaskText = completedTaskText[0].toUpperCase() + completedTaskText.slice(1)
 
  allCompletedTasksText.push(completedTaskText)
 
  // order completed task list text
  const completedTasksText = orderTaskList(allCompletedTasksText)
 
  // clean previous completed task list
  if (completedTaskList) {
    cleanCompletedTaskList()
  }
 
  // create new completed task list
  const completedTasks = createTaskList(completedTasksText, completed)
 
  // append completed task element
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
  // create task input and checkbox
  const tasks = tasksText.map(taskText => {
    const task = createElement("div")
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
 
    // check class
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
 
    // actions (buttons)
    const taskActions = createElement("div")
    taskActions.classList.add("actions")
 
    const editButton = createElement("button")
    editButton.classList.add("edit-task-btn")
    editButton.innerText = "EDIT"
 
    const deleteButton = createElement("button")
    deleteButton.classList.add("delete-task-btn")
    deleteButton.innerText = "DELETE"
 
    // edit task
    editButton.addEventListener("click", () => {
      if (editButton.innerText.toUpperCase() === "EDIT") {
        taskInput.removeAttribute("readonly")
        taskInput.focus()
        editButton.innerText = "SAVE"
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
   
    // delete task
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
 