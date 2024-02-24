const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const priorityRadios = document.getElementsByName('priority');

addTaskBtn.addEventListener('click', () => {
  const selectedPriority = getSelectedPriority();
  const taskText = taskInput.value.trim();
  const deadline = document.getElementById('deadlineInput').value;
  const labels = document.getElementById('labelInput').value.split(',');

  
    if (taskText !== '' && selectedPriority) {
      const li = document.createElement('li');
      li.textContent = `${taskText} (Deadline: ${deadline})`; // Include deadline
      li.setAttribute('data-priority', selectedPriority);
      li.setAttribute('data-deadline', deadline);
      li.setAttribute('data-labels', JSON.stringify(labels));
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-btn');
  
      li.appendChild(deleteButton);
      taskList.appendChild(li);
  
      taskInput.value = '';
      sortTasks();
      updateProgress();
    }
  
});

taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    event.target.parentElement.remove();
    updateProgress();
  }
});

function getSelectedPriority() {
  for (const radio of priorityRadios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return null;
}

function sortTasks() {
  const tasks = Array.from(taskList.getElementsByTagName('li'));

  tasks.sort((a, b) => {
    const priorityA = a.getAttribute('data-priority');
    const priorityB = b.getAttribute('data-priority');

    if (priorityA === priorityB) {
      return 0;
    }

    if (priorityA === 'top') {
      return -1;
    }

    if (priorityB === 'top') {
      return 1;
    }

    if (priorityA === 'medium') {
      return -1;
    }

    return 1;
  });

  taskList.innerHTML = '';
  tasks.forEach(task => taskList.appendChild(task));
}

function updateProgress() {
  const totalTasks = taskList.children.length;
  const completedTasks = taskList.querySelectorAll('li.completed').length;
  const progress = (completedTasks / totalTasks) * 100;

  const progressBar = document.getElementById('progressIndicator');
  progressBar.style.width = progress + '%';
}

taskList.addEventListener('click', (event) => {
  if (!event.target.classList.contains('completed')) {
    event.target.classList.add('completed');
    updateProgress();
  }
});


function sortTasks() {
  const tasks = Array.from(taskList.getElementsByTagName('li'));

  tasks.sort((a, b) => {
    const priorityA = a.getAttribute('data-priority');
    const priorityB = b.getAttribute('data-priority');
    const deadlineA = new Date(a.getAttribute('data-deadline')).getTime();
    const deadlineB = new Date(b.getAttribute('data-deadline')).getTime();

    if (deadlineA < deadlineB) {
      return -1;
    } else if (deadlineA > deadlineB) {
      return 1;
    } else {
      // If deadlines are equal, sort by priority
      if (priorityA === priorityB) {
        return 0;
      }
      if (priorityA === 'top') {
        return -1;
      }
      if (priorityB === 'top') {
        return 1;
      }
      if (priorityA === 'medium') {
        return -1;
      }
      return 1;
    }
  });

  taskList.innerHTML = '';
  tasks.forEach(task => taskList.appendChild(task));
}
