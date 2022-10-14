import {useContext} from 'react'
import './App.css'
import When2Meet from "./when2meet/When2Meet.jsx";
import Doodle from "./doodle/Doodle.jsx";
import Task1 from "./Task1.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AppContext} from "./Context.jsx";
import Grid from "@mui/material/Grid";
import Task2 from "./Task2.jsx";

function App() {
    // Having these in the global state insures the values update accordingly
    const context = useContext(AppContext);


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigate to="/t1/w2m"/>}/>
                    <Route path="/t1/w2m" element={<>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs={12}>
                                <Task1/>
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
                                    <Task1/>
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
                                    <Task2/>
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
                                    <Task2/>
                                </Grid>
                                <Grid item xs={12}>
                                    <When2Meet showYou={false} showGroup={true}/>
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
