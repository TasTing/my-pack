import React from "react";
import {useParams} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import {CircularProgress} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Grid, Typography} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';
import {Image} from 'cloudinary-react';

const useStyles = makeStyles((theme) => ({
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
    },
    image:{

    }
}));

export default function Post() {
    let {postId} = useParams()

    const getPosts = gql`
        query {
            post(id:${postId}){
                id
                title
                featured{
                    url
                    provider_metadata
                }
                description
                content

            }
        }
    `

    const {loading, error, data} = useQuery(getPosts);
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
        <Grid item >
            <Image publicId={post.featured.provider_metadata.public_id} loading="lazy" className={classes.image} sizes="100vw"/>
            <Typography variant="h6" gutterBottom>
                {post.title}
            </Typography>
            <Divider/>
            <Markdown className={classes.markdown} key={post.id}>
                {post.content}
            </Markdown>
        </Grid>
    );
}