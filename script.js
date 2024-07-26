document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            addTaskToList(task.text, task.completed, index);
        });
    };

    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTaskToList = (text, completed, index) => {
        const li = document.createElement('li');
        if (completed) li.classList.add('completed');

        li.innerHTML = `
            <span>${text}</span>
            <button class="edit">ویرایش</button>
            <button class="delete">حذف</button>
            <button class="toggle">${completed ? 'بازگردانی' : 'اتمام'}</button>
        `;

        li.querySelector('.edit').addEventListener('click', () => editTask(index));
        li.querySelector('.delete').addEventListener('click', () => deleteTask(index));
        li.querySelector('.toggle').addEventListener('click', () => toggleTask(index));

        taskList.appendChild(li);
    };

    const addTask = () => {
        const text = taskInput.value.trim();
        if (text === '') return;

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text, completed: false });
        saveTasks(tasks);
        addTaskToList(text, false, tasks.length - 1);
        taskInput.value = '';
    };

    const editTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newText = prompt('ویرایش وظیفه:', tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            tasks[index].text = newText;
            saveTasks(tasks);
            loadTasks();
        }
    };

    const deleteTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        saveTasks(tasks);
        loadTasks();
    };

    const toggleTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        loadTasks();
    };

    addTaskBtn.addEventListener('click', addTask);
    loadTasks();
});
