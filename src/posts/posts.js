import React from "react";
import PropTypes from 'prop-types';
import {gql, useQuery} from "@apollo/client";
import {makeStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
}));

const getPosts = gql`
    query {
        posts{
            id
            title
            featured{
                url
                caption
            }
            content
        }
    }
`

export default function Posts() {
    // APOLLO query function
    const {loading, error, data} = useQuery(getPosts);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <MainFeaturedPost posts={data.posts}/>
    )
}

function MainFeaturedPost(props) {
    const classes = useStyles();
    const {posts} = props;

    return (
        <div>
            {posts.map(post => (
                <Paper className={classes.mainFeaturedPost} style={{backgroundImage: `url(${post.featured.url})`}}>
                    {/* Increase the priority of the hero background image */}
                    {<img style={{display: 'none'}} src={post.featured.url} alt={post.featured.alt}/>}
                    <div className={classes.overlay}/>
                    <Grid container>
                        <Grid item md={12}>
                            <div className={classes.mainFeaturedPostContent}>
                                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Typography variant="h5" color="inherit" paragraph>
                                    {post.content}
                                </Typography>
                                <Link variant="subtitle1" href="#">
                                    {post.linkText}
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </div>
    );
}

MainFeaturedPost.propTypes = {
    post: PropTypes.object,
};