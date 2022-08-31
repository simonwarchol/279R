const list = document.getElementById('list');
const addButton = document.getElementById('add_button');
const newItem = document.getElementById('new_item');

addButton.onclick = () => {
    if (newItem?.value !== '') {
        const li = document.createElement('li');
        li.innerHTML = `<button type="button" class="delete-button">️🗑</button><input type="checkbox" class="checkbox"><span>${newItem.value}</span>`;
        li.onclick = completeTask;
        list.appendChild(li);
        newItem.value = '';
    }
}

const completeTask = (e) => {
    if (e.target.className === 'checkbox') {
        // This line was suggested by copilot which toggles this class on and off
        e.target.parentElement.classList.toggle('completed');
    } else if (e.target.className === 'delete-button') {
        e.target.parentElement.remove();
    }
    console.log(e)
}