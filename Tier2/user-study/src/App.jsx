import {useContext} from 'react'
import './App.css'
import When2Meet from "./when2meet/When2Meet.jsx";
import Doodle from "./doodle/Doodle.jsx";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import {AppContext} from "./Context.jsx";

function App() {
    // Having these in the global state insures the values update accordingly
    const context = useContext(AppContext);


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/w2m" element={<When2Meet/>}/>
                    <Route path="/doodle" element={<Doodle/>}/>
                </Routes>
            </BrowserRouter>
            {/* I'm using MUI here for styling*/}
        </div>
    )
}

export default App
