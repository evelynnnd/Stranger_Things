import React, { useState, useEffect } from "react";
import { fetchUser } from "../utils/api";

// X authorized users SHOULD be able to send messages
// X authorized users SHOULD be able to see messages for any post they are author

const Profile = ({ token, username }) => {
    const [messages, setMessages] = useState([])


    const userData = async () => {
        const user = await fetchUser(token)
        setMessages(user.messages)
        console.log(user)
    }

    useEffect(() => {
        userData();
    }, [])

    return (
        <div className="profile">
            <h1 id="profile-welcome">Welcome {`${username}`}</h1>
            <h2>Messages</h2>
            {messages.map((message) => {
                console.log(message)
                return <>
                    {username !== message.fromUser.username ?
                        <div key={message._id} className='message1'>
                            <div className='post'>
                                <p>From: {message.fromUser.username}</p>
                                <p>Post: {message.post.title}</p>
                                <p>Message: {message.content}</p>
                            </div>
                        </div>
                        : null
                    }</>
            })}
        </div>
    )
}

export default Profile;