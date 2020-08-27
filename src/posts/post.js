import React from "react";
import {useParams} from "react-router-dom";


export default function Post() {
    let {postId} = useParams()
    console.log(postId)
    return (
        <h1>Requested Topic : {postId}</h1>
    )
}