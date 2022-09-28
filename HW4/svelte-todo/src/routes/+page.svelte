<script>
    import {initializeApp} from "firebase/app";
    import {getFirestore} from "firebase/firestore";
    import {onSnapshot, collection, doc, updateDoc, addDoc, deleteDoc} from "firebase/firestore";

    const firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
        measurementId: import.meta.env.VITE_MEASUREMENT_ID
    };
    const firebaseApp = initializeApp(firebaseConfig);
    console.log('firebaseApp', firebaseApp);
    const db = getFirestore(firebaseApp);
    console.log('db', db);
    let inputText = '';
    let todos = []
    const collectionRef = collection(db, 'todo');
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        let _todos = []
        querySnapshot.forEach((doc) => {
            _todos = [..._todos, {...doc.data(), id: doc.id}]
        });
        todos = _todos;
        console.table(todos);
    });

    const addTodo = async () => {
        await addDoc(collection(db, 'todo'), {
            text: inputText,
            isCompleted: false
        });
        inputText = '';
    }


    const markAsComplete = async (item) => {
        await updateDoc(doc(db, 'todo', item.id), {
            isComplete: !item.isComplete
        });
    }
    const deleteTask = async (item) => {
        await deleteDoc(doc(db, 'todo', item.id));
    }
</script>
<input type="text" id="todoInput" placeholder="Add New Todo" bind:value={inputText}>
<button on:click={addTodo} id="addTodo">Add Todo</button>
<ol>
    {#each todos as todo, index}
        <li class:complete={todo.isComplete}>
            <span>{todo.text}</span>
            <button on:click={()=> markAsComplete(todo)}>✔</button>
            <button on:click={()=> deleteTask(todo
            )}>🗑️</button>
        </li>
    {/each}
</ol>
<style>
    .complete {
        text-decoration: line-through;
    }
</style>