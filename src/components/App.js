import React, { useState } from "react";
import { NavLink, Route } from "react-router-dom";
import Home from "./Home";
import Account from "./Account";
import Vacations from "./Vacations";

const App = () => {
    const [vacations, setVacations] = useState([]);
    const [featuredVacation, SetVacation] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState(false);
    const [newVacation, setNewVacation] = useState(false);
    const [user, setUser] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    return <main>
        <nav>
            <NavLink exact to="/" className="navlink" activeClassName="active">
                Home
            </NavLink>

            <NavLink to="/vacations" className="navlink" activeClassName="active">
                Vacations
            </NavLink>

            <NavLink to="/login" className="navlink" activeClassName="active">
                Account
            </NavLink>
        </nav>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/vacations">
            <vacations vacations={vacations} setVacations={setVacations} />
        </Route>
        <Route path="/login">
        </Route>
    </main>
}

export default App;