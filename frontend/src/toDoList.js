const taskList = document.getElementById('task-list');

window.addTaskToDom = (newTaskObj) => {
    let newTask = taskSnippet(newTaskObj);
    taskList.insertBefore(newTask, taskList.firstChild);
}

window.editTaskToDom = (taskId) => {
    const newTaskBody = document.getElementById('show-task-container-body');
    const showTaskContainer = document.getElementById('show-task-container');
    let task = document.getElementById(`${taskId}`).children[1];
    task.value = newTaskBody.value;
    showTaskContainer.classList.add('hidden');
}

window.deleteTaskFromDom = (taskId) => {
    let element = document.getElementById(`${taskId}`);
    taskList.removeChild(element);
}

window.renderTasksToDom = (tasks) => {
    if (!tasks)
        console.log("No Todos");
    tasks.forEach(task => {
        addTaskToDom(task);
    })
}

window.edit = (event) => {
    let id = event.target.parentNode.id;
    editTaskCss(); // in window object 
    const saveEditBtn = document.getElementById('save-edit-btn');
    saveEditBtn.addEventListener('click', () => {
        let content = document.getElementById('show-task-container-body').value;
        patchTask(id, content);
    })
}



function taskSnippet(newTaskObj) {
    const fragment = document.createDocumentFragment();

    const newTask = document.createElement('li');
    newTask.classList.add("task");
    newTask.setAttribute('id', `${newTaskObj.id}`);

    const newCheckbox = document.createElement('input');
    newCheckbox.type = "checkbox";
    newCheckbox.classList.add("task-checkbox");
    newCheckbox.name = "completed";

    const newSubject = document.createElement('input');
    newSubject.classList.add("input", "task-body");
    newSubject.value = `${newTaskObj.title}`;
    newSubject.addEventListener('click', readTaskCss);
    newSubject.readOnly = true;

    const newEditIcon = document.createElement('i');
    newEditIcon.classList.add("ri-pencil-line", "edit-task")
    newEditIcon.addEventListener('click', edit);

    const newDeleteIcon = document.createElement('i');
    newDeleteIcon.classList.add("ri-delete-bin-6-line", "delete-task");
    // newDeleteIcon.setAttribute('onclick',`deleteTask(${newTaskObj.id})`);
    newDeleteIcon.addEventListener('click', () => {
        deleteTask(newTask.id);
    })

    newTask.appendChild(newCheckbox);
    newTask.appendChild(newSubject);
    newTask.appendChild(newEditIcon);
    newTask.appendChild(newDeleteIcon);

    fragment.appendChild(newTask);
    return fragment;
}
