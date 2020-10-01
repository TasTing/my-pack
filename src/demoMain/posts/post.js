import React from "react";
import {useLocation, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {CircularProgress, Hidden} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Typography, Paper, Box, Toolbar} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import {Image, Transformation} from 'cloudinary-react';
import ReactMarkdown from "react-markdown";
import Container from "@material-ui/core/Container";
import SimpleBreadCrumb from "../../breadcrumbs/breadcrumb";
import {loader} from 'graphql.macro';
const getPost = loader('../../query/getPost.graphql');

const useStyles = makeStyles((theme) => ({
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
    },
    image: {}

}));

const renderers = {
    image: props =>
        <Image
            dpr="auto"
            width="80%"
            crop="scale"
            responsiveUseBreakpoints="true"
            {...props}
        >
            <Transformation quality="auto" fetchFormat="auto"/>
        </Image>,
    heading: props =>
        <Typography {...props} gutterBottom={true} variant={`h${props.level + 3}`}/>,
    paragraph: props =>
        <Typography {...props} component={"p"} paragraph={true} variant={"body1"}/>
};

export default function Post() {
    let {postId} = useParams()
    const {loading, error, data} = useQuery(getPost,{variables:{ postId:postId }});
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;
    return (
        <Main post={data.post}/>
    )
}

function Main(props) {
    const classes = useStyles();
    const {post} = props;
    const location = useLocation();
    const links = [
        {
            name: 'Home',
            link: '/'
        }, {
            name: 'Posts',
            link: '/posts'
        }, {
            name: post.title,
            link: location.pathname
        }
    ]
    return (
        <div>
            <Hidden mdDown>
                <SimpleBreadCrumb links={links}/>
            </Hidden>
            <Box boxShadow={3}>
                <Paper>
                    <Image publicId={post.image.url}
                           dpr="auto"
                           width="100%"
                           crop="scale"
                    >
                        <Transformation quality="auto" fetchFormat="auto"/>
                    </Image>
                    <Toolbar/>
                    <Typography variant="h3" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="caption" color="inherit" align={"center"}>
                        <p>Author: {post.user == null ? '匿名' : post.user.username}</p>
                    </Typography>
                    <Typography variant="caption" color="inherit" align={"center"}>
                        <p>{Intl.DateTimeFormat('en', { weekday:'long',year:'numeric',month: 'short',day:'numeric' }).format(post.create_at)}</p>
                    </Typography>
                    <Divider/>
                    <Container>
                        <ReactMarkdown
                            key={post.id}
                            className={classes.markdown}
                            source={post.content}
                            renderers={renderers}
                        />
                    </Container>
                </Paper>
            </Box>
        </div>
    );
}