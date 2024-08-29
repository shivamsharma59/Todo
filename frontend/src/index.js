const apiUrl = 'http://localhost:3000/api/tasks';

window.createTask = function () {
    const taskBody = document.getElementById('new-task').value.trim();
    if (!taskBody) return; // return if empty 

    let newTaskObj = {
        id: Date.now(),
        title: taskBody,
        completed: false,
    };

    postTask(newTaskObj).then(response => {
        if (response.ok)
            return response.json();
        else {
            throw new Error('failed to add task');
        }
    }).then(task => {
        if (task)
            addTaskToDom(task);
        document.getElementById('new-task').value = ''; // clear the input
    }).catch(error => {
        console.error(error);
    })
}

// get all task from the server
window.fetchTodos = () => {
    fetch(apiUrl)
        .then(response =>
            {
                return response.json();
            })
        .then(tasks => {
            renderTasksToDom(tasks)
        })
        .catch(error => console.error(error));
}

// add new task to the server 
window.postTask = (newTaskObj) => {
    return fetch(apiUrl, { // returing the promise 
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(newTaskObj),
    })
}

// delete task from the server
window.deleteTask = (taskId) => {
    fetch(`${apiUrl}/${taskId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok)
                return response.json();
            else {
                throw new Error('Failed to delete task');
            }
        })
        .then(task => deleteTaskFromDom(taskId))
        .catch(error => console.error(error));
}

// update existing task in the server
window.patchTask = (taskId, updates) => {
    fetch(`${apiUrl}/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: updates,
        }),
    }).then(response => {
        if (response.ok) {
            response.json();
            editTaskToDom(taskId);
        }
        else
            throw new Error('failed to update');
    }).catch(error => console.error(error));
}

fetchTodos();