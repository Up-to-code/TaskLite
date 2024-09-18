// Elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Load saved tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach((taskElement) => {
        tasks.push(taskElement.textContent.replace('❌', '').trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks as a string in localStorage
}

// Create a task element and append it to the list
function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete_button');
 
    deleteButton.addEventListener('click', function () {
        li.remove();
        saveTasks(); // Update the saved tasks in localStorage
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Add task when button is clicked
addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        createTaskElement(taskText); // Add the new task to the list
        saveTasks(); // Save the updated task list to localStorage
        taskInput.value = ''; // Clear the input field
    }
});

// Load tasks when the page is loaded
loadTasks();
