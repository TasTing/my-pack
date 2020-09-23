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
import {loader} from 'graphql.macro';


const getPosts = loader('../query/getPosts.graphql');


export default function Posts() {
    // APOLLO query function
    const {loading, error, data} = useQuery(getPosts);
    // requires modification
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;

    return (
        <MainFeaturedPost posts={data.posts}/>
    )
}

function MainFeaturedPost(props) {
    let match = useRouteMatch();
    let posts = props.posts
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
                <CheckboxLabels posts={posts}/>
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