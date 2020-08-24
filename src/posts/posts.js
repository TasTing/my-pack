import React from "react";
import {gql, useQuery} from "@apollo/client";
import CssBaseline from '@material-ui/core/CssBaseline';


const getPosts = gql`
    query {
        posts{
            id
            Title
            Featured{
                url
            }
            Content
            created_at
            created_by{
                id
                username
            }
        }
    }
`

export default function Posts() {
    // APOLLO query function
    const {loading, error, data} = useQuery(getPosts);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div>
            <CssBaseline/>
            {
                data.posts.map(post => (
                    <div key={post.Title}>
                        <p>{post.Title}</p>
                        <img src={post.Featured.url} alt=''/>
                    </div>
                ))
            }
        </div>
    )
}