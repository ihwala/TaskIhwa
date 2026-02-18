const button = document.getElementById("button")
const input = document.getElementById("input-name")
const list = document.getElementById("list")


let tasks = [
    { id: 1, title: "Finish report", done: false }
]

function changeTasks() {
    list.innerHTML = ''

    tasks.forEach(function (task) {
        const li = document.createElement('li')
        li.className = task.done ? 'task done' : 'task'

        li.innerHTML = `<input type="checkbox" ${task.done ? 'checked' : ''}>
                        <span class="title">${task.title}</span>
                        <span class="date">Today</span>`

        const checkbox = li.querySelector('input[type="checkbox"]')
        checkbox.addEventListener('change', () => {
            toggleTask(task.id)

        })

        list.appendChild(li)

    })

    updateCount()
}

function addTasks() {
    const title = input.value.trim()

    if (!title) return

    const newTask = {
        id: Date.now(),
        title: title,
        done: false
    }

    tasks.push(newTask)
    input.value = ''
    changeTasks()
}

function toggleTask(id) {
    const task = tasks.find(t => {
        return t.id === id
    })

    if (task) {
        task.done = !task.done
    }

    changeTasks()

}

function updateCount() {
    const doneTasks = tasks.filter(t => t.done)
    const totalTasks = tasks.length

    const heading = document.querySelector('.my-tasks')
    if (heading) {
        heading.textContent = 'My Tasks -- ' + doneTasks.length + ' / ' + totalTasks + ' done'
    }

}

button.addEventListener('click', () => {
    addTasks()
})

input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        addTasks()
    }
})

changeTasks()
