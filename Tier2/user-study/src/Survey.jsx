import {useContext, useState} from 'react'
import {AppContext} from "./Context.jsx";
import {Button, Rating, Typography} from "@mui/material";
import {addDoc, collection} from "firebase/firestore";
import db from "./Firebase.jsx";
import _ from 'lodash';
import {useNavigate} from "react-router-dom";


function Survey(props) {
    // Having these in the global state insures the values update accordingly
    const context = useContext(AppContext);
    // This will be called when the page is loaded or when the data changes
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState(0);
    const [readValue, setReadValue] = useState(0);
    const system = props.system;


    const submitSurvey = () => {
        console.log(context.participants);
        const correctResponse = [true, false, true, false, false, false, true, false, false, false, false, true, true, true, false];
        const responses = context.participants[0].availabilityList;
        let resp = addDoc(collection(db, 'survey'), {
            inputValue: inputValue,
            readValue: readValue,
            system: props.system,
            uuid: _.toString(context.userId)
        });
        if (window.location.pathname === '/w2mSurvey') {
            navigate('/t1/doodle');
        } else if (window.location.pathname === '/doodleSurvey') {
            navigate('/thanks');
        }


    }

    return (
        <div style={{margin: '10px', padding: '10px'}}>

            <Typography component="legend">How Easy Was Inputting Your Availability?</Typography>
            <Rating
                name="simple-controlled"
                value={inputValue}
                onChange={(event, newValue) => {
                    setInputValue(newValue);
                }}
            />
            <Typography component="legend">How Easy Was Reading the Availability of Others?</Typography>
            <Rating
                name="simple-controlled"
                value={readValue}
                onChange={(event, newValue) => {
                    setReadValue(newValue);
                }}
            />
            <br/>

            <Button
                sx={{marginTop: '10px'}} variant="contained" size="large" onClick={submitSurvey}>Submit</Button>


        </div>
    )
}

export default Survey
