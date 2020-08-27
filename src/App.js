import React from 'react';
import './App.css';
import Header from "./header/header";
// material UI THEME
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
// Router
import {BrowserRouter as Router} from "react-router-dom";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
    smallPadding:'20px',
    linkSize:'20px',
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Header/>
                    </header>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
