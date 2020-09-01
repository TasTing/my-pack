import React from 'react';
import './App.css';
import Header from "./header/header";
import Main from "./demoMain/demoMain";
// material UI THEME
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
// Router
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {CloudinaryContext} from 'cloudinary-react';
import Toolbar from "@material-ui/core/Toolbar";
import Posts from "./posts/posts";
import {Container} from "@material-ui/core";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: red[400],
        },
        secondary: {
            main: purple[500],
        },
    },
    smallPadding: '20px',
    linkSize: '20px',
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <CloudinaryContext cloudName="hgapshuy2">
                    <div className="App">
                        <Header/>
                        <Main/>
                    </div>
                </CloudinaryContext>
            </Router>
        </ThemeProvider>
    );
}

export default App;

