<script>
    import {TasksCollection} from '../api/TasksCollection';
    // This task variable is used throughout the component
    export let task;

    const toggleChecked = () => {
        // Set the checked property to the opposite of its current value
        // This interacts with the mongo DB
        TasksCollection.update(task._id, {
            $set: {isChecked: !task.isChecked}
        });
    };
    // Simple monog remove
    const deleteThisTask = () => {
        TasksCollection.remove(task._id);
    };
</script>

<li>
    <input
            type="checkbox"
            readOnly
            checked={!!task.isChecked}
            on:click={toggleChecked}
    />
    <span>{ task.text }</span>
    <button className="delete" on:click={deleteThisTask}>&times;</button>
</li>