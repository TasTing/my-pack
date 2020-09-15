import React from 'react';
import './App.css';
import Header from "./header/header";
import Main from "./demoMain/demoMain";
import Footer from "./footer/footer";
// material UI THEME
import purple from '@material-ui/core/colors/purple';
import grey from '@material-ui/core/colors/grey';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
// Router
import {BrowserRouter as Router} from "react-router-dom";

import {CloudinaryContext} from 'cloudinary-react';



const theme = createMuiTheme({
    palette: {
        primary: {
            main: grey["900"],
        },
        secondary: {
            main: purple[500],
        },
        transparentBack:{
            background:'rgba(255,255,255,0.3)',
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
                        <Footer/>
                    </div>
                </CloudinaryContext>
            </Router>
        </ThemeProvider>
    );
}

export default App;

