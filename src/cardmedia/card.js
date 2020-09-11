import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Grid from "@material-ui/core/Grid";
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth:'100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function IngredientReviewCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    let {card} = props

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
            <Grid item xs={12} md={4}>
                <Box boxShadow={3}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    I
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={
                                <Typography>{card.title}</Typography>
                            }
                            subheader={Intl.DateTimeFormat('en', { weekday:'long',year:'numeric',month: 'short',day:'numeric' }).format(card.create_at)}
                        />
                        <CardMedia
                            className={classes.media}
                            title={card.title}
                            image={card.image.url}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {card.description}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography>
                                    {card.content}
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Box>
            </Grid>
    );
}
