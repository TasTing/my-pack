import React from 'react';
import './App.css';
import Header from "./header/header";
// material UI THEME
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

// END
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
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <header className="App-header">
                    <Header/>
                </header>
            </div>
        </ThemeProvider>
    );
}

export default App;
