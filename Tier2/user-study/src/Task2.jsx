import {useContext, useRef} from 'react'
import {AppContext} from "./Context.jsx";
import {Button, TextField} from "@mui/material";
import _ from "lodash";
import {useNavigate} from "react-router-dom";
import db from "./Firebase.jsx";
import {addDoc, collection} from "firebase/firestore";


function Task2() {
    // Having these in the global state insures the values update accordingly
    const context = useContext(AppContext);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const submitTask2 = () => {
        const matchingBlocks = _.filter(context.timeBlocks, (timeBlock) => {
            return timeBlock?.availabilityCount=== 3;
        })
        const numMatchingBlocks = matchingBlocks?.length || 0
        const inputValue = _.toNumber(inputRef.current.value);
        console.log('asdf', numMatchingBlocks, inputValue)
        let resp = addDoc(collection(db, 'task2'), {
            response: inputValue,
            correctResponse: numMatchingBlocks,
            uuid: _.toString(context.userId)
        });
        inputRef.current.value = null;
        if (window.location.pathname === '/t2/w2m') {
            navigate('/w2mSurvey');
        } else if (window.location.pathname === '/t2/doodle') {
            navigate('/doodleSurvey');
        }
    }


    return (
        <div style={{margin: '10px', padding: '10px'}}>
            <h2>How many time blocks with 3 available people exist?</h2>
            <TextField type={'number'} inputRef={inputRef}/>
            <Button
                sx={{marginTop: '10px'}} variant="contained" size="large" onClick={submitTask2}>Submit</Button>
        </div>
    )
}

export default Task2
