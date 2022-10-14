import {useContext, useEffect} from 'react'
import './When2Meet.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {AppContext} from "../Context.jsx";
import UserTime from "./UserTime.jsx";
import GroupTime from "./GroupTime.jsx";
import _ from 'lodash';


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


function When2Meet(props) {
    // Having these in the global state insures the values update accordingly
    const context = useContext(AppContext);


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
        context.setTimeBlocks(tempTimeBlocks);
        context.setParticipants(tempParticipants);
    }, [])

    useEffect(() => {
        // Make sure variables are initialized
        if (!context.participants || !context.participants.length || !context.timeBlocks || !context.timeBlocks.length) return;
        let tmpTimeBlocks = _.cloneDeep(context.timeBlocks)
            .map(d => {
                d.availabilityCount = 0;
                return d;
            })
        // Initialize availability for each timeblock depending on randomized availablity of participants
        context.participants.forEach((participant) => {
            participant.availabilityList.forEach((available, i) => {
                if (available) {
                    tmpTimeBlocks[i].availabilityCount += 1
                }
            })
        })
        context.setTimeBlocks(tmpTimeBlocks);
    }, [context.participants])

    useEffect(() => {
        if (!context.participants || !context.participants.length || !context.timeBlocks || !context.timeBlocks.length) return;
        if (!context.isLoaded) context.setIsLoaded(true);

    }, [context.timeBlocks])


    return (
        <div className="App">
            {/* I'm using MUI here for styling*/}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                {/*    MUI grid with two columns*/}
                <Grid container spacing={2}>
                    {props.showYou && (
                        <Grid item xs={6}>
                            <UserTime/>
                        </Grid>
                    )}
                    {props.showGroup && (

                        <Grid item xs={6}>
                            <GroupTime/>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </div>
    )
}

export default When2Meet
