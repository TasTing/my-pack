import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import {useQuery} from "@apollo/client";
import {CircularProgress} from "@material-ui/core";
import {Link} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import {loader} from 'graphql.macro';
const getHeader = loader('../../query/getHeader.graphql');

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    root: {
        background:'linear-gradient(135deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'
    }
});

export default function SwipeableTemporaryDrawer() {
    const classes = useStyles();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    // APOLLO query function
    const {loading, error, data} = useQuery(getHeader);
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List >
                {data.header.topNav.map(menu => (
                    <ListItem button key={menu.name} component={Link} to={menu.linkto}>
                        <ListItemIcon>
                            {menu.name === 'Home' ? <HomeIcon/> : null}
                        </ListItemIcon>
                        <ListItemText primary={menu.name}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key={'left'}>
                <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer('left', true)}
                            color="inherit" aria-label="menu" >
                    <MenuIcon/>
                </IconButton>
                <SwipeableDrawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                >
                    {list('left')}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}