import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {loader} from 'graphql.macro';
import {useQuery} from "@apollo/client";
import {CircularProgress, Divider} from "@material-ui/core";

const getPosts = loader('../query/getPosts.graphql');

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        background: 'rgba(255,255,255,0.2)',
        marginTop: 10,
        marginBottom: 10,
        display: "flex",
        flexDirection: "column",
        position: 'relative',
    },
    media: {
        height: 200,
    },
    content:{
        marginBottom:50,
    },
    buttonGroup: {
        position: 'absolute',
        bottom: 0,
    },
});

export default function SideCard() {
    const {loading, error, data} = useQuery(getPosts);
    if (loading) return <CircularProgress/>;
    if (error) return <p>Error :(</p>;
    let posts = data.posts
    return (
        posts.map(post => {
                let count = 0
                if (post.categories.some(category => (category.name === 'feature')) && count < 3) {
                    count++
                    return (
                        <MediaCard post={post} key={post.id}/>
                    )
                }
                return (null)
            }
        )
    );
}

const MediaCard = (props) => {
    const classes = useStyles();
    let {post} = props
    return (
        <Card className={classes.root} key={post.id}>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <CardActionArea href={`/posts/${post.title}/${post.id}`}>
                        <CardMedia
                            className={classes.media}
                            image={post.featured.url}
                            title="Contemplative Reptile"
                        />
                    </CardActionArea>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h6" component="h6">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" className={classes.desc}>
                            {sliceWord(post.description)}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.buttonGroup}>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                        <Button size="small" color="primary" href={`/posts/${post.title}/${post.id}`}>
                            Learn More
                        </Button>
                    </CardActions>
                </Grid>
            </Grid>

        </Card>
    )
}

const sliceWord = (content) => {
    let templateWord = '';
    const len = 200;
    if (content.length * 2 <= len) {
        return content;
    }
    let strLength = 0;
    for (let i = 0; i < content.length; i++) {
        templateWord = templateWord + content.charAt(i)
        if (content.charCodeAt(i) > (len / 4)) {
            strLength = strLength + 2;
            if (strLength >= len) {
                return templateWord.substring(0, templateWord.length - 1) + '...'
            }
        } else {
            strLength = strLength + 1
            if (strLength >= len) {
                return templateWord.substring(0, templateWord.length - 2) + '...'
            }
        }
    }
    return templateWord;
}
