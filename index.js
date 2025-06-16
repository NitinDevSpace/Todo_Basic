// ✅ Load tasks from localStorage as objects
let tasksArr = JSON.parse(localStorage.getItem('tasks')) || [];

// ✅ Render saved tasks on page load
const ul = document.querySelector('.task-list');
tasksArr.forEach(task => {
  const li = document.createElement('li');
  li.classList.add('task');
  if (task.completed) li.classList.add('completed');

  li.innerHTML = `
    <input type="checkbox" ${task.completed ? 'checked' : ''}/> 
    <span class="task-text">${task.text}</span>
    <button class="delete-btn">x</button>
  `;
  ul.appendChild(li);
});
updateTaskCount();

// ✅ Theme toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
});

// ✅ Add task
document.querySelector('.add-btn').addEventListener('click', () => {
  const input = document.querySelector('.input-section input');
  const taskText = input.value.trim();
  if (!taskText) {
    alert('Add a Task First');
    return;
  }

  const taskObj = { text: taskText, completed: false };
  tasksArr.push(taskObj);
  updateLocalStorage();

  const li = document.createElement('li');
  li.classList.add('task');
  li.innerHTML = `
    <input type="checkbox"/> 
    <span class="task-text">${taskObj.text}</span>
    <button class="delete-btn">x</button>
  `;
  ul.appendChild(li);
  input.value = '';
  updateTaskCount();
});

// ✅ Handle delete and checkbox toggle
ul.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  const taskText = li.querySelector('.task-text').innerText;

  // Delete task
  if (e.target.classList.contains('delete-btn')) {
    tasksArr = tasksArr.filter(task => task.text !== taskText);
    li.remove();
    updateLocalStorage();
    updateTaskCount();
  }

  // Toggle checkbox
  if (e.target.type === 'checkbox') {
    li.classList.toggle('completed');
    tasksArr = tasksArr.map(task => {
      if (task.text === taskText) {
        return { ...task, completed: e.target.checked };
      }
      return task;
    });
    updateLocalStorage();
    updateTaskCount();
  }
});

// ✅ Task count
function updateTaskCount() {
  const incompleteCount = tasksArr.filter(task => !task.completed).length;
  document.getElementById('rem_tasks').innerText = incompleteCount;
}

// ✅ Save to localStorage
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasksArr));
}
