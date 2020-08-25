import React from "react";
import PropTypes from 'prop-types';
import {gql, useQuery} from "@apollo/client";
import {makeStyles} from '@material-ui/core/styles';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        width: 1000,
        height: 900,
    },
}));

const getPosts = gql`
    query {
        posts{
            id
            title
            featured{
                url
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
        <FeaturedPost posts={data.posts}/>
    )
}

function FeaturedPost(props) {
    const classes = useStyles();
    const {posts} = props;
    return (
        <div className={classes.root}>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {posts.map((tile) => (
                    <GridListTile key={tile.id}>
                        <img src={tile.featured.url} alt={tile.title}/>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

FeaturedPost.propTypes = {
    post: PropTypes.object,
};