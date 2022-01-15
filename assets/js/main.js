const todoList = document.querySelector('#todo-list');
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoInfo = document.querySelector('.infoBtn');
const todoMain = document.querySelector('.simple-todo');
const log = console.log;

let tasks;
let todoItemElems = [];

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function getInfo() {
    todoInfo.classList.remove('none');
    todoMain.classList.add('secondScreen');
}


function Task(desc) {
    this.desc = desc,
    this.priority = false,
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
        <div class='item ${task.completed ? 'checked' : ''} ${task.priority ? 'priority' : ''}'>
            <input class="check" onclick="completeTask(${index})" type="radio" ${task.completed ? 'checked' : ''}>
            <p>${task.desc}</p>
            <button onclick="alertTask(${index})" title="Alert"><i class='bx bxs-bell alert' ></i></button>
            <button class="btn-delete" onclick="deleteTask(${index})" title="Remove"><i class='bx bxs-trash trash'></i></button>
        </div> `;
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    activeTasks.sort((a, b) => {
        if(a.priority == true){
            return -1;
        } else {
            return 1;
        }
    });

    tasks = [...activeTasks, ...completedTasks];
}

const fillHtmlList = () => {
    todoList.innerHTML = "";
    if(tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todoList.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.item');
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        tasks[index].priority = false;
        todoItemElems[index].classList.remove('priority');
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }

    updateLocal();
    fillHtmlList();
}

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    tasks.push(new Task(todoInput.value));
    updateLocal();
    fillHtmlList();

    todoInput.value = '';
    todoInput.focus();
});

const deleteTask = index => {
    todoItemElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }, 500);
}

const alertTask = index => {
    tasks[index].priority = !tasks[index].priority;
    if(tasks[index].priority) {
        todoItemElems[index].classList.add('priority');
    } else {
        todoItemElems[index].classList.remove('priority');
    }

    updateLocal();
    fillHtmlList();
}
