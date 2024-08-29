// -----------------------------Css---------------------------

const showTaskCanvas = document.getElementById('show-task-canvas');
const showTaskContainer = document.getElementById('show-task-container');
let showTaskSubject = document.getElementById('show-task-container-subject');
let showTaskBody = document.getElementById('show-task-container-body');
const saveEditBtn = document.getElementById('save-edit-btn');

window.showTaskCss = function () {
    showTaskCanvas.classList.remove('hidden');
    showTaskContainer.classList.remove('hidden');
}

// read only 
window.readTaskCss = function () {
    event.stopPropagation();
    showTaskCss();
    saveEditBtn.classList.add('hidden');
    showTaskBody.value = event.target.value;
    showTaskBody.readOnly = true;
}

window.hideShowTaskCss = function () {
    event.stopPropagation();
    showTaskContainer.classList.add('hidden');
    showTaskCanvas.classList.add('hidden');
}

// editable task
window.editTaskCss = function () {
    event.stopPropagation();
    showTaskCss();
    saveEditBtn.classList.remove('hidden');
    showTaskBody.value = event.target.previousElementSibling.value;
    showTaskBody.readOnly = false;
}