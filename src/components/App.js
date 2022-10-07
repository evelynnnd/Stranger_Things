import { React, useState } from "react";
import { Link, Route, Switch, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import Post from "./Posts";
import FeaturedPosts from "./FeaturedPosts";

// X make routes for posts, profile and login

const App = () => {
    const [posts, setPosts] = useState([])
    const [token, setToken] = useState('')
    const [username, setUsername] = useState('');
    const [postId, setPostId] = useState(null)
    const [featuredPosts, setFeaturedPosts] = useState([])
    const [search, setSearch] = useState('')
    const [user, setUser] = useState({})
    const history = useHistory()

    const logout = async (event) => {
        console.log('logged out')
        event.preventDefault();
        setUsername('')
        setToken('')
        history.push('/login')
    }

    return <main>
        <nav id="navbar">
            <div id="links" >
                <NavLink to="/home" className="navlink" activeClassName="active">Home</NavLink>
                <NavLink to="/posts" className="navlink" activeClassName="active">Posts</NavLink>
                <NavLink to="/profile" className="navlink" activeClassName="active">Profile</NavLink>
                {!token ?
                    <>
                        <NavLink to="/login" className="navlink" activeClassName="active">Log In</NavLink>
                    </> :
                    <button id="logout-btn" onClick={logout}>Log out</button>
                }
            </div>
        </nav>

        <Switch>
            <Route exact path="/">
                <Register token={token} setToken={setToken}/>
            </Route>

            <Route path="/login">
                <Login token={token} setToken={setToken}
                    username={username} setUsername={setUsername}/>
            </Route>

            <Route path="/posts">
                <Route path="/posts/:postId">
                    <FeaturedPosts token={token} featuredPosts = {featuredPosts} 
                    setFeaturedPosts = {setFeaturedPosts} username={username} postId={postId}/>
            </Route>
                <Post posts={posts} setPosts={setPosts} postId={postId} token={token} setPostId={setPostId}
                    search={search} setSearch={setSearch} setFeaturedPosts={setFeaturedPosts} username={username}/>
            </Route>

            <Route exact path="/home">
                <div id="home-container">
                    <h1 id="home-title">Welcome to Stranger Things</h1>
                    <div id="button">
                        <Link exact to="/profile">
                            <button type="text" id="profile-btn">View Profile</button>
                        </Link>
                    </div>
                </div>
            </Route>

            <Route exact path="/profile">
                {token ?
                    <Profile token={token} username={username}/> :
                    <div>
                        <h1 id="profile">Please Log In</h1>
                    </div>
                }
            </Route>
        </Switch>
    </main>
}

export default App;