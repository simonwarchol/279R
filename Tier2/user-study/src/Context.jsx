import React, {useEffect, useState} from "react";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import uuid from "react-uuid";


export const AppContext = React.createContext(null);

// Step 2: Create a ContextWrapper component that has to be the parent of every consumer.
//VIA https://github.com/breatheco-de/content/blob/master/src/content/lesson/context-api.md

export const ContextWrapper = (props) => {


    const [participants, setParticipants] = useState([]);
    const [timeBlocks, setTimeBlocks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    let _userId = localStorage.getItem("scheduleUuid")
    if (!_userId) {
        _userId = uuid();
        localStorage.setItem("scheduleUuid", _userId);
    }
    const [userId, setUserId] = useState(_userId);
    // console.log('userid',userId)


    return (
        <AppContext.Provider value={
            {
                participants, setParticipants,
                timeBlocks, setTimeBlocks,
                isLoaded, setIsLoaded,
                userId, setUserId
            }}>
            {props.children}
        </AppContext.Provider>
    );
}