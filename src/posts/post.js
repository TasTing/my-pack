import React from "react";
import {useParams} from "react-router-dom";


export default function Post() {
    let {postId} = useParams()
    let {postTitle} = useParams()
    return (
        <div>
            <h1>Requested Topic ID: {postId}</h1>
            <h1>Requested Topic Title: {postTitle}</h1>
        </div>
    )
}