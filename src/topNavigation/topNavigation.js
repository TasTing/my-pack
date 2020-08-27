import React from 'react';

// material ui
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import {CircularProgress} from "@material-ui/core";
//Components
import Main from '../demoMain/demoMain.js'
import Posts from "../posts/posts";

// apollo graphql
import {gql, useQuery} from '@apollo/client';
// router
import {Switch, Route, Link} from "react-router-dom";
// end


const drawerWidth = 240;
const majorComponents = 'rgba(255,255,255,0.1)';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',

    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: majorComponents,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,

    },
    drawerPaper: {
        width: drawerWidth,
        background: majorComponents,
    },
    drawerContainer: {
        overflow: 'auto',
        background: 'rgba(255,255,255,0.3)',
    },
    content: {
        margin: theme.smallPadding,
        padding: 'auto',
    }
}));


const getHeader = gql`
    query {
        header{
            websiteName
            topNav {
                name
                linkto
            }
        }
    }
`

export default function ClippedDrawer() {
    const classes = useStyles();
    // APOLLO query function
    const {loading, error, data} = useQuery(getHeader);
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;

    // END
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>{data.header.websiteName}</Typography>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper,}}>
                <Toolbar/>
                <div className={classes.drawerContainer}>
                    <List> {data.header.topNav.map(menu => (
                        <ListItem button key={menu.name} component={Link} to={menu.linkto}>
                            <ListItemIcon>
                                {menu.name === 'Home' ? <HomeIcon/> : null}
                            </ListItemIcon>
                            <ListItemText primary={menu.name}/>
                        </ListItem>
                    ))}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar/>
                <Switch>
                    <Route exact path='/'>
                        <Main/>
                    </Route>
                    <Route path='/posts'>
                        <Posts/>
                    </Route>
                </Switch>
            </main>
        </div>
    );
}
