import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { deletePosts, newMessage } from "../utils/api";

const FeaturedPosts = ({ token, featuredPosts, setFeaturedPosts, username, postId }) => {
    const [comment, setComment] = useState('')
    const history = useHistory()

    const handleClose = () => {
        setFeaturedPosts('')
        history.push('/posts')
    }

    const handleSubmitComment = (event) => {
        event.preventDefault();
        if (username !== featuredPosts.author.username) {
            newMessage(token, postId, comment)
            alert('Message sent!')
        } else {
            alert('not allowed')
        }
    }

    const handleDeletePost = async (postId) => {
        deletePosts(token, postId)
        history.push('/posts')
    }

    return <div className="featured-post">
        <h2 className="featured-title">{featuredPosts.title}</h2>
        <div>Description: {featuredPosts.description}</div>
        <div>Price: {featuredPosts.price}</div>
        <div>Seller: {featuredPosts.username}</div>
        <div>Location: {featuredPosts.location}</div>
        <section>
            <ul>
                {featuredPosts.messages.map(message => {
                    console.log(featuredPosts)
                    console.log(message)

                    return <li key={featuredPosts._id}>
                        <span> {message.content} </span>
                    </li>
                })}
            </ul>
        </section>

        <form onSubmit={handleSubmitComment}>
            <label>Send a message: 
            <input
                onChange={(event) => setComment(event.target.value)}
                type="text" name="comment"
                placeholder="comment" value={comment} />
            <button className="submit" type="submit">Submit</button>
            </label>
        </form>

        {username == featuredPosts.author.username &&
            <button onClick={() => handleDeletePost(postId)}>Delete Post</button>}
        <button className="close" onClick={handleClose}>Close</button>
    </div>
}
//when clicking on a post, it shows up at the top of the page.

export default FeaturedPosts;