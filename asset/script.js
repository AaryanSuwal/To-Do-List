// Selectors
const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');

// Add Task
toDoBtn.addEventListener('click', () => {
    const task = toDoInput.value.trim();
    if (!task) return alert("You must write something!");

    // Create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo', `${localStorage.getItem('savedTheme') || 'standard'}-todo`);

    // Create li
    const li = document.createElement('li');
    li.textContent = task;
    li.classList.add('todo-item');
    todoDiv.appendChild(li);

    // Check button
    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    checkBtn.classList.add('check-btn', `${localStorage.getItem('savedTheme') || 'standard'}-button`);
    todoDiv.appendChild(checkBtn);

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '<i class="fas fa-trash"></i>';
    delBtn.classList.add('delete-btn', `${localStorage.getItem('savedTheme') || 'standard'}-button`);
    todoDiv.appendChild(delBtn);

    toDoList.appendChild(todoDiv);

    toDoInput.value = '';
    saveData();
});

// Check & Delete
toDoList.addEventListener('click', e => {
    const item = e.target;
    if (item.closest('.check-btn')) {
        item.closest('.todo').querySelector('.todo-item').classList.toggle('completed');
        saveData();
    }

    else if (item.closest('.delete-btn')) {
        const parent = item.closest('.todo');
        parent.classList.add('fall');
        parent.addEventListener('transitionend', () => parent.remove());
        
        parent.addEventListener('transitionend', () => {
            parent.remove();
            saveData();
        });
    }
});

// Save and retrive data

function saveData(){
    localStorage.setItem("dataContainer", toDoList.innerHTML);
}

function showTask(){
    toDoList.innerHTML = localStorage.getItem("dataContainer");
}

showTask();

// localStorage.removeItem("dataContainer");