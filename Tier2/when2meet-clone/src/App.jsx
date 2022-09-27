import {useContext, useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Checkbox, Container} from "@mui/material";
import {AppContext} from "./Context.jsx";

// Each time block contains the following information
class TimeBlock {
    constructor(month, dayOfWeek, day, start, end) {
        this.month = month;
        this.day = day;
        this.dayOfWeek = dayOfWeek;
        this.start = start;
        this.end = end;
        this.availabilityCount = 0;
    }
}

// Participants contain a parallel array of boolean indicators of availability for each time block
class Participant {
    constructor(name, availabilityList) {
        this.name = name;
        this.availabilityList = availabilityList;
    }

}


function App() {
    // Having these in the global state insures the values update accordingly
    const context = useContext(AppContext);

    const [timeBlocks, setTimeBlocks] = useState([]);

    // This runs on init
    useEffect(() => {
        // Hard coding dates to the range of days and times below
        const startDate = 14;
        const startMonth = 'Jan'
        let tempTimeBlocks = [];
        let tbIndex = 0;
        ['Mon', 'Tue', 'Wed',].forEach((day, i) => {
            [1, 2, 3, 4, 5].forEach((startTime) => {
                const block = new TimeBlock(startMonth, day, startDate + i, startTime, startTime + 1, tbIndex);
                tempTimeBlocks.push(block);
                tbIndex += 1;
            })
        });
        let tempParticipants = [];
        // Initializing  participants with random coin flips for availability
        ['Fran', 'Rita', 'Vik'].forEach((name) => {
            let availabilityList = [...Array(tbIndex).keys()].map((i) => {
                const available = Math.random() < 0.5;
                if (available) {
                    tempTimeBlocks[i].availabilityCount = 0;
                }
                return available;
            })
            tempParticipants.push(new Participant(name, availabilityList));
        });
        // Add the "you" participant to the top of the list with false for all availability
        tempParticipants = [new Participant('You', Array(tbIndex).fill(false)), ...tempParticipants]
        setTimeBlocks(tempTimeBlocks);
        context.setParticipants(tempParticipants);
    }, [])

    useEffect(() => {
        // Make sure variables are initialized
        if (!context.participants || !context.participants.length || !timeBlocks || !timeBlocks.length) return;
        let tmpTimeBlocks = [...timeBlocks]
        // Initialize availability for each timeblock depending on randomized availablity of participants
        context.participants.forEach((participant) => {
            participant.availabilityList.forEach((available, i) => {
                if (available) {
                    tmpTimeBlocks[i].availabilityCount += 1
                }
            })
        })
        setTimeBlocks(tmpTimeBlocks);
    }, [context.participants])

    // This is the function that runs when a checkbox is clicked which changes the count value for the time block
    const updateYourSelection = (i, checked) => {
        const tmpTimeBlocks = [...timeBlocks];
        tmpTimeBlocks[i].availabilityCount += checked ? 1 : -1;
        setTimeBlocks(tmpTimeBlocks);
    }

    return (
        <div className="App">
            {/* I'm using MUI here for styling*/}

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="10vh"
                maxHeight="10vh"
            >
                <h1>When2Meet Clone</h1>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="90vh"
                maxHeight="90vh"
            >
                {/*    MUI grid with two columns*/}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        Simon
                    </Grid>
                    <Grid item xs={6}>
                        Test
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default App
