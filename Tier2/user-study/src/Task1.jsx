import {useContext} from 'react'
import {AppContext} from "./Context.jsx";
import {Button} from "@mui/material";
import {addDoc, collection} from "firebase/firestore";
import db from "./Firebase.jsx";
import _ from 'lodash';
import {useNavigate} from "react-router-dom";


function Task1(props) {
    // Having these in the global state insures the values update accordingly
    const context = useContext(AppContext);
    // This will be called when the page is loaded or when the data changes
    const navigate = useNavigate();


    const submitTask1 = () => {
        console.log(context.participants);
        const correctResponse = [true, false, true, false, false, false, true, false, false, false, false, true, true, true, false];
        const responses = context.participants[0].availabilityList;
        let resp = addDoc(collection(db, 'task1'), {
            responses: responses,
            correctResponse: correctResponse,
            uuid: _.toString(context.userId)
        });
        if (window.location.pathname === '/t1/w2m') {
            navigate('/t1/doodle');
        } else if (window.location.pathname === '/t1/doodle') {
            navigate('/t2/w2m');
        }


    }

    return (
        <div style={{margin: '10px', padding: '10px'}}>
            <h2>Please input the following times for "You" in the form below and press submit <Button
                sx={{marginTop: '10px'}} variant="contained" size="large" onClick={submitTask1}>Submit</Button>
            </h2>
            <div>
                Mon Jan 14 1pm - 2pm ⚫ Mon Jan 14 3pm - 4pm ⚫ Tue Jan 13 2pm - 3pm ⚫ Wed Jan 16 2pm - 3pm ⚫ Wed Jan
                16 3pm - 4pm ⚫ Wed Jan 16 4pm - 5pm
            </div>

        </div>
    )
}

export default Task1
