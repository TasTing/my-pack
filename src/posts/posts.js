import React from "react";
import PropTypes from 'prop-types';
import {useQuery} from "@apollo/client";
import {CircularProgress, Hidden} from "@material-ui/core";
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Post from "./post";
import SimpleBreadCrumb from "../breadcrumbs/breadcrumb";
import CheckboxLabels from "./checkbox";




export default function Posts() {
    // APOLLO query function
    return (
        <MainFeaturedPost />
    )
}

function MainFeaturedPost() {
    let match = useRouteMatch();
    const links = [
        {
            name: 'Home',
            link: '/'
        }, {
            name: 'Posts',
            link: '/posts'
        }
    ]

    return (
        <Switch>
            <Route exact path={match.path}>
                <Hidden mdDown>
                    <SimpleBreadCrumb links={links}/>
                </Hidden>
                <CheckboxLabels/>
            </Route>
            <Route path={`${match.path}/:postTitle/:postId`}>
                <Post/>
            </Route>
        </Switch>
    );
}

MainFeaturedPost.propTypes = {
    post: PropTypes.object,
};