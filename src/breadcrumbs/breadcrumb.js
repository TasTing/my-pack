import React from "react";

import {Breadcrumbs, Link, Typography, Container, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

}));



function handleClick() {

}

export default function SimpleBreadCrumb(props) {
    const classes = useStyles();
    return (
        <Container>
            <Breadcrumbs aria-label="breadcrumb" className={classes.root}>
                {props.links.map(link => (
                        <Link key={link.name} color="inherit" href={link.link} onClick={handleClick}>
                            {link.name}
                        </Link>
                    )
                )}
            </Breadcrumbs>
            <Toolbar/>
        </Container>
    )
}