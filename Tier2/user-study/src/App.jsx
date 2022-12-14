import {useContext} from 'react'
import './App.css'
import When2Meet from "./when2meet/When2Meet.jsx";
import Doodle from "./doodle/Doodle.jsx";
import Task1 from "./Task1.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppContext} from "./Context.jsx";
import Grid from "@mui/material/Grid";
import Task2 from "./Task2.jsx";
import Survey from "./Survey.jsx";
import LandingPage from "./LandingPage.jsx";

function App() {
    // Having these in the global state insures the values update accordingly
    const context = useContext(AppContext);


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs={12}>
                                <LandingPage/>
                            </Grid>

                        </Grid>
                    </>}/>
                    <Route path="/t1/w2m" element={<>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs={12}>
                                <Task1 system={'w2m'}/>
                            </Grid>
                            <Grid item xs={12}>
                                <When2Meet showYou={true} showGroup={false}/>
                            </Grid>
                        </Grid>
                    </>}/>
                    <Route path="/t1/doodle" element={
                        <>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={12}>
                                    <Task1 system={'doodle'}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Doodle showYou={true} showGroup={false}/>
                                </Grid>
                            </Grid>
                        </>
                    }/>
                    <Route path="/t2/doodle" element={
                        <>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={12}>
                                    <Task2 system={'doodle'}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Doodle showYou={false} showGroup={true}/>
                                </Grid>
                            </Grid>
                        </>
                    }/>
                    <Route path="/t2/w2m" element={
                        <>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={12}>
                                    <Task2 system={'w2m'}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <When2Meet showYou={false} showGroup={true}/>
                                </Grid>
                            </Grid>
                        </>
                    }/>
                    <Route path="/thanks" element={
                        <>
                            <h1>Thank You</h1>
                        </>
                    }/>
                    <Route path="/doodleSurvey" element={
                        <>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >

                                <Grid item xs={12}>
                                    <Survey system={'doodle'}/>
                                </Grid>
                            </Grid>
                        </>
                    }/>
                    <Route path="/w2mSurvey" element={
                        <>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={12}>
                                    <Survey system={'w2m'}/>
                                </Grid>
                            </Grid>
                        </>
                    }/>

                </Routes>
            </BrowserRouter>
            {/* I'm using MUI here for styling*/}
        </div>
    )
}

export default App
