import React from 'react';
import logo from '../logo.svg';
import {Grid} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import {Route, Switch} from "react-router-dom";
import Posts from "../posts/posts";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.secondary,
        background: theme.palette.background
    },
}));

export default function Main() {
    const classes = useStyles();

    return (
        <main className={classes.root}>

            <Grid container spacing={3}>
                <Grid item xs>

                </Grid>
                <Grid item xs={8}>
                    <Toolbar/>
                    <Switch>
                        <Route exact path='/'>
                            <ReactDefault/>
                        </Route>
                        <Route path='/posts'>
                            <Posts/>
                        </Route>
                    </Switch>
                </Grid>
                <Grid item xs>

                </Grid>
            </Grid>
        </main>
    )
}

function ReactDefault() {
    return (
        <div>
            <img src={logo} className="App-logo" alt="logo"/>
            <p> Edit <code> src / App.js </code> and save to reload. </p>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer"> Learn
                React </a>
        </div>
    )
}
