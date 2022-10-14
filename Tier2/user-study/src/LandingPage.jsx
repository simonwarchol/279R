import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";


function LandingPage() {
    // Having these in the global state insures the values update accordingly
    const navigate = useNavigate();


    return (
        <>
            <div><h2>In this user study you will be asked to perform the following 2 tasks using different scheduling
                systems. </h2>
            </div>
            <div style={{margin: '10px', padding: '10px'}}>
                <h2>Task 1</h2>
                <h2>Please input the following times for "You" in the form below and press submit
                </h2>
                <div>
                    Mon Jan 14 1pm - 2pm ⚫ Mon Jan 14 3pm - 4pm ⚫ Tue Jan 13 2pm - 3pm ⚫ Wed Jan 16 2pm - 3pm ⚫ Wed Jan
                    16 3pm - 4pm ⚫ Wed Jan 16 4pm - 5pm
                </div>
                <h2>Task 2</h2>
                <h2>How many time blocks with 3 available people exist?</h2>
                <br/>
                <h2>Please press continue once you have read and understand both tasks</h2>
                <br/>
                <Button
                    sx={{marginTop: '10px'}} variant="contained" size="large" onClick={
                    () => {
                        navigate('/t1/w2m');
                    }
                }>Continue</Button>
            </div>
        </>
    )
}

export default LandingPage
