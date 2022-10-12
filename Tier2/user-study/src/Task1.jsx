import {useContext} from 'react'
import {AppContext} from "./Context.jsx";
import {Button} from "@mui/material";

function Task1() {
    // Having these in the global state insures the values update accordingly
    const context = useContext(AppContext);


    return (
        <div style={{margin: '10px', padding: '10px'}}>
            <h2>Please input the following times for "You" in the form below and press submit <Button
                sx={{marginTop: '10px'}} variant="contained" size="large">Submit</Button>
            </h2>
            <div>
                <b>Mon Jan 14 1pm - 2pm | Mon Jan 14 3pm - 4pm | Tue Jan 13 2pm - 3pm | Wed Jan 16 2pm - 3pm | Wed Jan
                    16
                    3pm - 4pm | Wed Jan 16 4pm - 5pm</b>
            </div>

        </div>
    )
}

export default Task1
