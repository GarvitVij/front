import logo from "./logo.svg";
import "./App.css";
import Login from "./Screens/Login";
import Home from "./Screens/Home";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Folders from "./Screens/Folders";
import Post from "./Screens/Post";
import GetPost from "./Screens/GetPost";

function App() {
    let navigate = useNavigate();
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if (!auth) {
            navigate("/");
        }
    }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    auth ? (
                        <Home setAuth={setAuth} />
                    ) : (
                        <Login setAuth={setAuth} />
                    )
                }
            />
            <Route path="/login" element={<Login setAuth={setAuth} />} />
            <Route
                path="/user/:id"
                element={
                    auth ? (
                        <Folders setAuth={setAuth} />
                    ) : (
                        <Login setAuth={setAuth} />
                    )
                }
            />
            <Route
                path="/createPost"
                element={auth ? <Post /> : <Login setAuth={setAuth} />}
            />
            <Route
                path="/getPost/:id"
                element={auth ? <GetPost /> : <Login setAuth={setAuth} />}
            />
            <Route
                path="/*"
                element={auth ? <Home /> : <Login setAuth={setAuth} />}
            />
        </Routes>
    );
}

export default App;
