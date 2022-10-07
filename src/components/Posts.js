import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {  fetchPosts, handleSubmitPost } from "../utils/api"

// X unauthorized users SHOULD be able to see list of posts
// X authorized users SHOULD be able to create posts
// authorized users SHOULD be able to delete posts they've created
// unauthorized users SHOULD NOT be able to be able to delete other posts

const Posts = ({ search, setSearch, token, posts, postId, setPosts, setPostId, setFeaturedPosts, username }) => {

    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const history = useHistory()

    const allPosts = async () => {
        setPosts(await fetchPosts())
    }

    useEffect(() => {
        allPosts();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (token) {
            const createPost = await handleSubmitPost(token, title, description, price, location)
            setPosts([createPost, ...posts])
            setPostId(createPost.author._id)
        } else {
            alert('Login please!')
        }
    }

    const handleFeatured = async (event, post) => {
        event.preventDefault()
        if (token) {
            setFeaturedPosts(post)
            setPostId(post._id)
            history.push(`/posts/${post._id}`)
        }
    }

    return (
        <>
            <div id="search-form">
                <h1 id="page-title">Posts</h1>
                <form id="search-bar">
                    <input
                        type="text" name="search"
                        placeholder="search" value={search}
                        onChange={(event) => setSearch(event.target.value)}></input>
                </form>

                {!token ? <h1 id="form-alert">PLEASE LOGIN TO CREATE A POST</h1> :
                    <form id="post-form" onSubmit={handleSubmit}>

                        <h2 id="form-title">Create a Post</h2>

                        <label>Title:
                            <input onChange={(event) => setTitle(event.target.value)}
                                type="text" name="title"
                                placeholder="title" value={title} />
                        </label>
                        <br />
                        <label>Description:
                            <input onChange={(event) => setDescription(event.target.value)}
                                type="text" name="description"
                                placeholder="description" value={description} />
                        </label>
                        <br />
                        <label>Price:
                            <input onChange={(event) => setPrice(event.target.value)}
                                type="text" name="price"
                                placeholder="price" value={price} />
                        </label>
                        <br />
                        <label>Location:
                            <input onChange={(event) => setLocation(event.target.value)}
                                type="text" name="location"
                                placeholder="location" value={location} />
                        </label>
                        <br />
                        <button id="submit-btn" type="submit">Submit Post</button>
                    </form>
                }

                {posts.filter(post => {
                    return `${post.title} ${post.description} ${post.price} ${post.location}`
                        .toLowerCase()
                        .includes(search.toLowerCase())
                }).map((post => {
                    return (
                        <>
                            <div onClick={(event) => {
                                {handleFeatured(event, post)}
                            }} id='posts' key={post._id}>
                                <h1 className="title">{post.title}</h1>
                                <p className="description">Description: {post.description}</p>
                                <p className="description">Price: {post.price}</p>
                                <p className="description">Location: {post.location}</p>
                                <p className="description">Posted by: {post.author.username}</p>
                            </div>
                        </>
                    )
                }))}
            </div>

        </>
    )
}

export default Posts;