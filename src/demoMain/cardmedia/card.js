import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Grid,
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
    Button
} from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import {red} from '@material-ui/core/colors';

import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'rgba(255,255,255,0.2)',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    avatar: {
        backgroundColor: red[500],
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    content:{

    }
}));

export default function ReviewCard(props) {
    const classes = useStyles();
    let {card} = props
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const TransitionModal = (props) => {
        let card = props
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{card.title}</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText id="alert-dialog-description">
                        {card.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus={true}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <Grid item xs={6} md={4}>
            <Box boxShadow={3} className={classes.content}>
                <Card className={classes.root}>
                    <CardHeader
                        // action={
                        //     <IconButton aria-label="settings">
                        //         <MoreVertIcon/>
                        //     </IconButton>
                        // }
                        title={
                            <Typography>{card.title}</Typography>
                        }
                        subheader={Intl.DateTimeFormat('en', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        }).format(card.create_at)}
                    />
                    <CardMedia
                        className={classes.media}
                        title={card.title}
                        image={card.image.url}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {sliceWord(card.description)}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {/*<IconButton aria-label="add to favorites">*/}
                        {/*    <FavoriteIcon/>*/}
                        {/*</IconButton>*/}
                        {/*<IconButton aria-label="share">*/}
                        {/*    <ShareIcon/>*/}
                        {/*</IconButton>*/}
                        <Typography>
                            Learn more
                        </Typography>
                        <IconButton
                            className={clsx(classes.expand)}
                            onClick={handleOpen}

                            aria-label="show more"
                        >
                            <FullscreenIcon/>
                        </IconButton>
                    </CardActions>
                    <TransitionModal title={card.title} content={card.content}/>
                </Card>
            </Box>
        </Grid>
    );
}

const sliceWord = (content) => {
    let templateWord = '';
    const len = 100;
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
