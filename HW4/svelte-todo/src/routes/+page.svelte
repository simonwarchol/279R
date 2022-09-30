<script>
    import {initializeApp} from "firebase/app";
    import {getFirestore} from "firebase/firestore";
    import {onSnapshot, collection, doc, updateDoc, addDoc, deleteDoc} from "firebase/firestore";

    // This is read from the .env file automatically by sveltekit
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
        measurementId: import.meta.env.VITE_MEASUREMENT_ID
    };
    // Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);

    let inputText = '';
    // This will be bound to the visual elements in the UI
    let todos = []

    const collectionRef = collection(db, 'todo');
    // This will be called when the page is loaded or when the data changes
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        let _todos = []
        querySnapshot.forEach((doc) => {
            _todos = [..._todos, {...doc.data(), id: doc.id}]
        });
        // This will update the UI
        todos = _todos;
    });

    // This will be called when the user clicks the add button
    const addTodo = async () => {
        await addDoc(collection(db, 'todo'), {
            text: inputText,
            isCompleted: false
        });
        // Clear the input field
        inputText = '';
    }


    // This will be called when the user clicks the check button
    const markAsComplete = async (item) => {
        await updateDoc(doc(db, 'todo', item.id), {
            isComplete: !item.isComplete
        });
    }
    // This will be called when the user clicks the delete button
    const deleteTask = async (item) => {
        await deleteDoc(doc(db, 'todo', item.id));
    }
</script>

<!--Basic HTML elements are bound to the svelte functions-->
<input type="text" id="todoInput" placeholder="Add New Todo" bind:value={inputText}>
<button on:click={addTodo} id="addTodo">Add Todo</button>
<ol>
    <!--    Iterate over the todos and draw them-->
    {#each todos as todo, index}
        <li class:complete={todo.isComplete}>
            <span>{todo.text}</span>
            <button on:click={()=> markAsComplete(todo)}>✔</button>
            <button on:click={()=> deleteTask(todo
            )}>🗑️
            </button>
        </li>
    {/each}
</ol>
<style>
    .complete {
        text-decoration: line-through;
    }
</style>