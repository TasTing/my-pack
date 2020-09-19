import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {loader} from 'graphql.macro';
import {useQuery} from "@apollo/client";
import {CircularProgress} from "@material-ui/core";

const getPosts = loader('../query/getPosts.graphql');

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        background: 'inherit'
    },
    media: {
        height: 140,
    },
});

export default function SideCard() {
    const {loading, error, data} = useQuery(getPosts);
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;
    let posts = data.posts
    console.log(data)
    return (
        posts.map(post => {
                let count = 0
                if (post.category === 'article'&&count<3) {
                    count++
                    return (<MediaCard post={post} key={post.id}/>)
                }
            }
        )
    );
}

const MediaCard = (props) => {
    const classes = useStyles();
    let {post} = props
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={post.featured.url}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary" href={`/posts/${post.title}/${post.id}`}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    )
}
