import React from 'react'
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {useRouteMatch} from "react-router-dom";

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
            // paddingRight: 0,
        },
    },
    link: {
        float: 'left',
    }
}));

function handleclick(props) {

}

export default function PostList(props) {

    let posts = props.posts
    let state = props.state
    console.log(state)
    console.log(posts)

    return (
        posts.map(post => (
            <Box boxShadow={3} key={post.id}>
                {
                    post.categories.some(category => ((category.name === 'feature' && state.feature === true) || (category.name === 'news' && state.news === true) || (category.name === 'article' && state.article === true))) ?
                        <HiddenPost post={post}/> : null
                }
            </Box>
        )))
}



const HiddenPost = (props) => {
    let post = props.post
    const classes = useStyles();
    let match = useRouteMatch();
    return (
        <Paper className={classes.mainFeaturedPost}
               style={{backgroundImage: `url(${post.featured.url})`}}>
            {/* Increase the priority of the hero background image */}
            {<img style={{display: 'none'}} id={post.featured.id} src={post.featured.url}
                  alt={post.featured.alt}/>}
            <div className={classes.overlay}/>
            <Grid container>
                <Grid item md={12}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom
                                    align={"left"}>
                            {post.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph align={"left"}>
                            {post.description}
                        </Typography>
                        <Typography variant="caption" color="inherit" paragraph align={"left"}>
                            Author: {post.user == null ? '匿名' : post.user.username}
                        </Typography>
                        <Typography variant="caption" color="inherit" paragraph align={"left"}>
                            {Intl.DateTimeFormat('en', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            }).format(post.create_at)}
                        </Typography>
                        <Typography align={"left"}>
                            {post.categories.map(category => (<span>|{category.name}|</span>))}
                        </Typography>
                        <Typography variant='button'>
                            <Button size='large' variant={"contained"} color={"default"}
                                    href={`${match.url}/${post.title}/${post.id}`}
                                    id={post.id}
                                    onClick={handleclick(`${match.url}/${post.title}/${post.id}`)}>
                                Read more...
                            </Button>
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}