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
            <p>${task.desc}</p>
            <input class="check" onclick="completeTask(${index})" type="checkbox" ${task.completed ? 'checked' : ''}>
            <button onclick="alertTask(${index})" title="Пометить как важное"><i class='bx bxs-bell alert' ></i></button>
            <button class="btn-delete" onclick="deleteTask(${index})" title="Удалить"><i class='bx bxs-trash trash'></i></button>
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









// todoForm.addEventListener('submit', formHendler);

// let checkCounter = 0;
// let alertCounter = 50;
// let trashCounter = 100;

// function formHendler(event) {
//     event.preventDefault();
    
//     const taskText = todoInput.value;
//     if(taskText === ''){
//         alert('Вы не написали задачу');
//     } else {
//         const newTask = document.createElement('div');
//         newTask.innerHTML = `
//         <div class='item'>
//             <p>${taskText}</p>
//             <button id="${checkCounter += 1}" onclick="checkBtn(this.id)" title="Выполнить"><i class='bx bxs-check-square check'></i></button>
//             <button id="${alertCounter += 1}" onclick="alertBtn(this.id)" title="Пометить как важное"><i class='bx bxs-bell alert' ></i></button>
//             <button id="${trashCounter += 1}" onclick="deleteBtn(this.id)" title="Удалить"><i class='bx bxs-trash trash'></i></button>
//         </div> `;

//         todoList.append(newTask);
//         todoInput.value = '';
//         todoInput.focus();
//     }
// }

// function checkBtn(e) {
//     const btn = document.getElementById(e);
//     btn.closest('div').style['opacity'] = '.3';
// }


// function alertBtn(e) {
//     const btn = document.getElementById(e);
//     btn.closest('div').classList.toggle('addAlert');
// }

// function deleteBtn(e) {
//     const btn = document.getElementById(e);
//     btn.closest('div').remove();
// }
