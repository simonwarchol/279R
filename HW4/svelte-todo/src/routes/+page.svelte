<script>
    let todos = []
    let inputText = ''
    const addTodo = () => {
        todos = [...todos, {
            text: inputText,
            isComplete: false
        }];
        inputText = '';
    };
    const markAsConmplete = (index) => {
        todos[index].isComplete = !todos[index].isComplete ;
    }
    const deleteTask = (index) => {
        todos = todos.filter((todo, i) => i !== index);
    }
</script>
<input type="text" id="todoInput" placeholder="Add New Todo" bind:value={inputText}>
<button on:click={addTodo} id="addTodo">Add Todo</button>
<ol>
    {#each todos as todo, index}
        <li class:complete={todo.isComplete}>
            <span>{todo.text}</span>
            <button on:click={()=> markAsConmplete(index)}>✔</button>
            <button on:click={()=> deleteTask(index)}>🗑️</button>
        </li>
    {/each}
</ol>
<style>
    .complete {
        text-decoration: line-through;
    }
</style>