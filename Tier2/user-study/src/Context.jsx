import React, {useEffect, useState} from "react";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";


export const AppContext = React.createContext(null);

// Step 2: Create a ContextWrapper component that has to be the parent of every consumer.
//VIA https://github.com/breatheco-de/content/blob/master/src/content/lesson/context-api.md

export const ContextWrapper = (props) => {


    const [participants, setParticipants] = useState([]);
    const [timeBlocks, setTimeBlocks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
        measurementId: import.meta.env.VITE_MEASUREMENT_ID
    };
    const [firebaseApp, setFirebaseApp] = useState(initializeApp(firebaseConfig));
    const [db, setDb] = useState(null);

    useEffect(() => {
        if (!firebaseApp) return
        setDb(getFirestore(firebaseApp));
    }, [firebaseApp])


    return (
        <AppContext.Provider value={
            {
                participants, setParticipants,
                timeBlocks, setTimeBlocks,
                isLoaded, setIsLoaded
            }}>
            {props.children}
        </AppContext.Provider>
    );
}