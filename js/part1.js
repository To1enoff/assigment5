const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
      taskList.innerHTML = '';

      tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        const label = document.createElement('label');
        label.textContent = task.text;
        label.classList.toggle('completed', task.completed);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        checkbox.addEventListener('change', () => {
          task.completed = checkbox.checked;
          label.classList.toggle('completed', task.completed);
          saveTasks();
        });

        deleteButton.addEventListener('click', () => {
          tasks.splice(index, 1);
          listItem.remove();
          saveTasks();
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
      });

      saveTasks();
    }

    function addNewTask() {
      const text = taskInput.value.trim();
      if (text !== '') {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        renderTasks();
      }
    }

    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskButton.addEventListener('click', addNewTask);
    taskInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addNewTask();
      }
    });

    renderTasks(); 