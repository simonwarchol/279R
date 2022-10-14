<script>
    import {TasksCollection} from '../api/TasksCollection';

    let newTask = '';
    //Adds to the mongo db collection
    const handleSubmit = () => {
        // Insert a task into the collection
        TasksCollection.insert({
            text: newTask,
            createdAt: new Date(), // current time
        });

        // Clear form
        newTask = '';
    }
</script>
<!-- Instead of a POST request we handle submission with our own functions-->
<form class="task-form" on:submit|preventDefault={handleSubmit}>
    <!--            the newTask variable updates automatically with input-->
    <input
            type="text"
            name="text"
            placeholder="Type to add new tasks"
            bind:value={newTask}
    />
    <button type="submit">Add Task</button>
</form>