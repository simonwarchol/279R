import {useContext} from 'react'
import {AppContext} from "./Context.jsx";
import {Button, TextField} from "@mui/material";

function Task2() {
    // Having these in the global state insures the values update accordingly
    const context = useContext(AppContext);


    return (
        <div style={{margin: '10px', padding: '10px'}}>
            <h2>Ignoring "You", how many potential 1 hr meeting times exist in this 3-day time span?           </h2>
            <TextField type={'number'} />
             <Button
                sx={{marginTop: '10px'}} variant="contained" size="large">Submit</Button>
        </div>
    )
}

export default Task2
