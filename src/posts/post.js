import React from "react";
import {useParams} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import {CircularProgress} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Grid, Typography} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import {Image, Transformation} from 'cloudinary-react';
import ReactMarkdown from "react-markdown";
import Container from "@material-ui/core/Container";



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
            responsive
            width="100%"
            crop="scale"
            responsiveUseBreakpoints="true"
            {...props}
        >
            <Transformation quality="auto" fetchFormat="auto"/>
        </Image>,
    heading: props =>
        <Typography {...props} gutterBottom={true} variant={`h${props.level+3}`}/>,
    paragraph: props =>
        <Typography {...props} paragraph={true} variant={"body1"}/>
};

export default function Post() {
    let {postId} = useParams()

    const getPost = gql`
        query {
            post(id:${postId}){
                id
                title
                created_at
                category
                user {
                    username
                }
                featured{
                    url
                    provider_metadata
                }
                description
                content

            }
        }
    `

    const {loading, error, data} = useQuery(getPost);
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;

    return (
        <Main post={data.post}/>
    )
}

function Main(props) {
    const classes = useStyles();
    const {post} = props;

    return (
        <div>
            <Image publicId={post.featured.url}
                   dpr="auto"
                   responsive
                   width="100%"
                   crop="scale"
                   responsiveUseBreakpoints="true"
            >
                <Transformation quality="auto" fetchFormat="auto"/>
            </Image>
            <Typography variant="h3" gutterBottom>
                {post.title}
            </Typography>
            <Typography variant="caption" color="inherit" align={"center"}>
                <p>Author: {post.user == null ? '匿名' : post.user.username}</p>
            </Typography>
            <Typography variant="caption" color="inherit" align={"center"}>
                <p>{Date(post.created_at)}</p>
            </Typography>
            <Divider/>
            <Container>
                <Typography variant="body1" color="inherit" paragraph align={"center"}>
                    <ReactMarkdown
                        key={post.id}
                        className={classes.markdown}
                        source={post.content}
                        renderers={renderers}
                    />
                </Typography>
            </Container>
        </div>
    );
}