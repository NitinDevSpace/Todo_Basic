// Description: This script toggles a dark mode theme on a webpage when a button is clicked.
const toggleBtn = document.getElementById('theme-toggle');
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
        if (document.body.classList.contains('dark')) {
            toggleBtn.textContent = 'Light Mode';
        } else {
            toggleBtn.textContent = 'Dark Mode';
        }
    });


// JS for Adding a new item to the list
let count = 0;
const addbtn = document.querySelector('.add-btn');
    addbtn.addEventListener('click', (e) => {
        const newtask = document.querySelector('.input-section input');
        const task = newtask.value;
        if(task == ""){
            window.alert('Add a Task First')
        }else{
            const ul = document.querySelector('.task-list')
            const li = document.createElement('li')
            li.classList.add('task');
            li.innerHTML = `
                <input type="checkbox"/> 
                <span class="task-text">${task}</span>
                <button class="delete-btn">x</button>
            `;
            ul.appendChild(li);
            count++;
            updateTaskCount();
        }
        newtask.value = '';
    })



//JS for removing an item from the list

const ul = document.querySelector('.task-list');

ul.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove(); // remove the <li>
    count--;
    updateTaskCount();
  }

  // Completing Tasks with checkbox

//   if (e.target.type === 'checkbox') {
//     e.target.parentElement.classList.toggle('completed');
//   }

// more complex and length
  const taskItem = e.target.parentElement;
  if (taskItem.classList.contains('completed')) {
    taskItem.classList.remove('completed'); // uncheck
    count++;
    updateTaskCount();
  } else {
    taskItem.classList.add('completed'); // check
    count--;
    updateTaskCount();
  }

});

// wont work for newly added tasks
// const delbtns = document.querySelectorAll('.delete-btn')

// delbtns.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         e.target.parentElement.remove();
//     })
// })



// adding dynamic count
const taskcount = document.getElementById('rem_tasks');

function updateTaskCount() {// understand that script only runs once so need to update something then call the fn again and again
  taskcount.innerText = count;
}



