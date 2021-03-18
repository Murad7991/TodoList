//Selectors
let todoButton = document.querySelector('.todo-button')
let todoList = document.querySelector('.todo-list')
let todoInput= document.querySelector('.todo-input')
let filterTodo = document.querySelector('.filter-todo')


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterTodo.addEventListener('click', filterTodos)



//Functions
function addTodo(event) {
    event.preventDefault();
    //Create TODO DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add("todo")
    //Create Li
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    //ADD TODO TO LOCAlSTORAGE
    saveLocalTodo(todoInput.value)
    todoInput.value = ""
    //Create MARK BUTTON
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)
    //Create TRASH BUTTON
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)
    //APPEND TO LIST
    todoList.appendChild(todoDiv)
}

function deleteCheck(e) {
    //Trash button
    const item = e.target
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement
        //Animation
        todo.classList.add("fall")
        removeTodo(todo)
        todo.addEventListener('transitionend', function() {
            todo.remove()
        })
    }
    //Check button
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle("completed")
    }
}

function filterTodos(e) {
    const todos = todoList.childNodes
    todos.forEach(function (todo) {
        console.log(todos)
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
        }
    })
}

function saveLocalTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add("todo")
        //Create Li
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo)
        todoInput.value = ""
        //Create MARK BUTTON
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)
        //Create TRASH BUTTON
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)
        //APPEND TO LIST
        todoList.appendChild(todoDiv)
    })
}

function removeTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todoIndex.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}
