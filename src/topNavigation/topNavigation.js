import React from 'react';
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
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import HomeIcon from '@material-ui/icons/Home';
import Main from '../demoMain/demoMain.js'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: 'grey'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));

const handleClick=(e)=>{
    console.log(e)
}

export default function ClippedDrawer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>BRAND NAME</Typography>
                </Toolbar>
            </AppBar>
            < Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper,}}>
                <Toolbar/>
                <div className={classes.drawerContainer}>
                    <List> {['Home', 'News'].map((text, index) => (
                        <ListItem button key={text} onClick={handleClick}>
                            <ListItemIcon>
                                {index % 2 === 0 ? < HomeIcon/> : < AccessAlarmIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Main/>
            </main>
        </div>
    );
}
