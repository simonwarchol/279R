// Base elements created in index.html
const list = document.getElementById('list');
const addButton = document.getElementById('add_button');
const newItem = document.getElementById('new_item');

addButton.onclick = () => {
    if (newItem?.value !== '') {
        const li = document.createElement('li');
        const innerDiv = document.createElement('div');
        innerDiv.classList.add('task');
        //Create checkbox, delete button, and label itself and append to li
        innerDiv.innerHTML = `<div>
                                  <!--Crosses out item-->
                                  <input type="checkbox" class="checkbox">
                                  <!-- The contenteditable property on the span allows it to be edited when toggled  -->
                                  <span class="task-text" contenteditable="false">${newItem.value}</span>
                              </div>
                              <div>
                                  <!--Toggles contenteditable to change task-->
                                  <button type="button" class="edit-button" title="Edit Task">️✏️</button>
                                    <!--Remove task from list-->   
                                  <button type="button" class="delete-button" title="Delete Task">️🗑</button>
                              </div>`;
        // Add listener for click events
        innerDiv.onclick = clickTask;
        //Add content to the list item
        li.appendChild(innerDiv);
        // Add list item to list
        list.appendChild(li);
        // BLank out input field
        newItem.value = '';
    }
}

// Clicking on a task either toggles it completed or deletes it
const clickTask = (e) => {
    if (e.target.className === 'checkbox') {    // Toggle completed
        // This line was suggested by copilot which toggles this class on and off
        e.target.parentElement.classList.toggle('completed');
    } else if (e.target.className === 'delete-button') { // Delete task
        e.target.parentElement.parentElement.remove();
    } else if (e.target.className === 'edit-button') { // Delete task
        // Find neighboring parent element
        const taskText = e.target.parentElement.parentElement.getElementsByClassName('task-text')[0];
        const contentEditable = taskText.getAttribute('contenteditable');
        // Toggle between span being editable or not
        taskText.setAttribute('contenteditable', contentEditable === 'false' ? 'true' : 'false');
    }
}