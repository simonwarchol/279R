import React, {useEffect, useState} from "react";

export const AppContext = React.createContext(null);

// Step 2: Create a ContextWrapper component that has to be the parent of every consumer.
//VIA https://github.com/breatheco-de/content/blob/master/src/content/lesson/context-api.md

export const ContextWrapper = (props) => {

    const [participants, setParticipants] = useState([]);
    const [timeBlocks, setTimeBlocks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

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