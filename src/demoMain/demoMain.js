import React from 'react';
import {Grid} from "@material-ui/core";
import {Toolbar, Hidden} from "@material-ui/core";
import {Route, Switch} from "react-router-dom";
import Posts from "./posts/posts";
import Cards from "./cardmedia/cards"
import {makeStyles} from "@material-ui/core/styles";
import MainBoard from "./mainBoard";

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
            <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Hidden mdDown>
                        <Toolbar/>
                    </Hidden>
                    <Switch>
                        <Route exact path='/'>
                            <MainBoard/>
                        </Route>
                        <Route path='/posts'>
                            <Posts/>
                        </Route>
                        <Route path='/cards'>
                            <Cards/>
                        </Route>
                    </Switch>
                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
        </main>
    )
}


