import {useContext, useEffect} from 'react'
import './Doodle.css'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Checkbox} from "@mui/material";
import {AppContext} from "../Context.jsx";

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


function Doodle(props) {
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
        let tmpTimeBlocks = [...context.timeBlocks]
        tmpTimeBlocks = tmpTimeBlocks.map((tb) => {
            tb.availabilityCount = 0;
            return tb;
        });
        console.log(tmpTimeBlocks)
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

    // This is the function that runs when a checkbox is clicked which changes the count value for the time block
    const updateYourSelection = (i, checked) => {
        let tmpParticipants = [...context.participants];
        tmpParticipants[0].availabilityList[i] = checked;
        context.setParticipants(tmpParticipants);
        // const tmpTimeBlocks = [...context.timeBlocks];
        // tmpTimeBlocks[i].availabilityCount += checked ? 1 : -1;
        // context.setTimeBlocks(tmpTimeBlocks);
    }

    return (
        <div className="App">

            {/* I'm using MUI here for styling*/}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="50vh"
                maxHeight="50vh"

            >
                {/*Rows are date cards and checkboxes for participants*/}
                <Grid container spacing={0} justifyContent="center" direction="column">
                    {/*First row displays the dates*/}
                    <Grid container spacing={1} justifyContent="center" direction="row">
                        <Grid item>
                            <Paper className={'time-block'}>
                            </Paper>
                        </Grid>
                        {context.timeBlocks && context.timeBlocks.map(block => {
                            return (
                                <Grid item>
                                    {/*Display the date info*/}
                                    <Paper className={'time-block'}>
                                        <h4>{block.dayOfWeek}</h4>
                                        <h2>{block.day}</h2>
                                        <p>{block.month}</p>
                                        <h4>{block.start}:00 pm</h4>
                                        <h4>{block.end}:00 pm</h4>
                                        {/*This will update when the timeblock param is updated on check*/}
                                        <h3>✔ {block.availabilityCount}</h3>
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                    {context.participants && context.participants.map((participant, i) => {
                        return (
                            <Grid container spacing={1} justifyContent="center" direction="row">
                                <Grid item>
                                    {/*The first row if the "You" row which i highlight in blue*/}
                                    {i === 0 && props.showYou &&
                                        <Paper className={'time-block'}>
                                            <h3 className={'blue'}>{participant.name}</h3>
                                        </Paper>
                                    }
                                    {/*The other rows are the other participants*/}
                                    {i !== 0 && props.showGroup &&
                                        <Paper className={'time-block'}>
                                            <h3>{participant.name}</h3>
                                        </Paper>
                                    }
                                </Grid>
                                {participant && participant.availabilityList.map((time, j) => {
                                    return (
                                        <Grid item>
                                            <Paper className={'time-block'}>
                                                {/* If "You", show a checkbox*/}
                                                {i === 0 && props.showYou &&
                                                    <Checkbox sx={{m: 0, p: 0}}
                                                              onChange={e => {
                                                                  updateYourSelection(j, e.target.checked);
                                                              }}/>}
                                                {/*Otherwise show the availbility as x or check*/}
                                                {i > 0 && time && props.showGroup && <h3 className={'green'}>✔</h3>}
                                                {i > 0 && !time && props.showGroup && <h3 className={'red'}>✔</h3>}
                                            </Paper>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </div>
    )
}

export default Doodle
