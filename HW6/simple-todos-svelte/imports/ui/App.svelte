<script>
    //   Import my DB 
    import {TasksCollection} from '../api/TasksCollection';
    // Import the individual task as a UI element
    import Task from './Task.svelte';
    // Handles adding / submitting a new task
    import TaskForm from './TaskForm.svelte';
    // This is provided by the zodern:melte compiler, and is a reactive data source
    // it is updated when the server publishes changes to the collection
    $m: tasks = TasksCollection.find({}, {sort: {createdAt: -1}}).fetch()
</script>


<div class="container">
    <header>
        <h1>Todo List</h1>
    </header>

    <TaskForm/>

    <ul>
        <!--        Svelte loop syntax-->
        {#each tasks as task (task._id)}
            <Task task={task}/>
        {/each}
    </ul>
</div>