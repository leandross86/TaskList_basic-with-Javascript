const inputTask = document.querySelector('.input-task')
const btnTask = document.querySelector('.btn-task')
const task = document.querySelector('.task')

function createList() {
  const li = document.createElement('li')
  return li
}

inputTask.addEventListener('keypress', (e) => {
  if(e.keyCode === 13) {
    if (!inputTask.value) return
    createTask(inputTask.value)
  }
})

function cleanInput() {
  inputTask.value = ''
  inputTask.focus()
}

function createButtonDelete(li) {
  li.innerText += ' '
  const buttonDelete = document.createElement('button')
  buttonDelete.innerHTML = 'Apagar'
  // buttonDelete.classList.add('delete')
  buttonDelete.setAttribute('class', 'apagar')
  buttonDelete.setAttribute('title', 'Apagar essa tarefa')
  li.appendChild(buttonDelete)
}

function createTask(textInput) {
  const li = createList()
  li.innerText = textInput
  task.appendChild(li)
  cleanInput()
  createButtonDelete(li)
  saveTasks()
}

btnTask.addEventListener('click', () => {
  if (!inputTask.value) return
  createTask(inputTask.value)
})

document.addEventListener('click', (e) => {
  const el = e.target
  if(el.classList.contains('apagar')) {
    el.parentElement.remove()
    saveTasks()
  }
})

function saveTasks() {
  const taskList = task.querySelectorAll('li')
  const listTasks = []
  for (let tasksIndex of taskList) {
    let textTask = tasksIndex.innerText
    textTask = textTask.replace('Apagar', '').trim()
    listTasks.push(textTask)
  }
  const taskJSON = JSON.stringify(listTasks)
  localStorage.setItem('tarefas', taskJSON)
}

function addTasksave() {
  const taskStorage = localStorage.getItem('tarefas')
  const taskListStorage = JSON.parse(taskStorage)
  for(let task of taskListStorage) {
    createTask(taskStorage)
  }
}
addTasksave()