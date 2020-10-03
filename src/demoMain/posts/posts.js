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
import SimpleBreadCrumb from "../../breadcrumbs/breadcrumb";
import CheckboxLabels from "./checkbox";
import {loader} from 'graphql.macro';


const getPosts = loader('../../query/getPosts.graphql');
const getCategories = loader('../../query/getCategories.graphql');

export default function Posts() {
    // APOLLO query function
    const {loading:postLoading, error:postError, data:postData} = useQuery(getPosts);
    const {loading:cateLoading, error:cateError, data:cateData} = useQuery(getCategories);
    // requires modification
    if (postLoading) return <CircularProgress/>;
    if (postError) return <p>Error :(</p>;

    // requires modification
    if (cateLoading) return <CircularProgress/>;
    if (cateError) return <p>Error :(</p>;


    return (
        <React.Fragment>
            <MainFeaturedPost posts={postData.posts} categories={cateData.categories}/>
        </React.Fragment>

    )
}

function MainFeaturedPost(props) {
    let match = useRouteMatch();
    let posts = props.posts
    let categories = props.categories
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
                <CheckboxLabels posts={posts} categories={categories}/>
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