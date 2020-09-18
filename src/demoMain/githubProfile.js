import React, {useState, useEffect} from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
    Box,
    Avatar,
    CircularProgress,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import axios from 'axios'

const useStyles = makeStyles({
    root: {
        width: "100%",
        maxHeight: 600,
        background:'rgba(255,255,255,0.2)',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
    avatar: {
        margin: 'auto'
    }
});

export default function GithubProfile() {

    const classes = useStyles();
    const BASE_URL = 'https://api.github.com/users/'
    const [user, setUser] = useState('tasting');
    const [profile={
        login:String,
        bio:String,
        avatar_url:String,
        followers:String,
        following:String,
        public_repos:String,
        html_url:String,
    }, setProfile] = useState(null)
    useEffect(() => {
        if (!profile) {
            axios.get(BASE_URL + user)
                .then(res => {
                    const profile = res.data;
                    setProfile(profile)
                })
        }
    })

    if (profile) {
        return (
            <Box shadow={3}>
                <Card className={classes.root}>
                    <CardContent>
                        <Avatar src={profile.avatar_url} className={classes.avatar}/>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {profile.login}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {profile.bio}
                        </Typography>
                        <Typography>
                            Followers:{profile.followers}
                        </Typography>
                        <Typography>
                            Following:{profile.following}
                        </Typography>
                        <Typography>
                            Repository:{profile.public_repos}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" href={profile.html_url}>Learn More</Button>
                    </CardActions>
                </Card>
            </Box>
        )
    } else {
        return (
            <CircularProgress/>
        )
    }
}

