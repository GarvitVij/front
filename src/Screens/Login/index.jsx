import classes from "./index.module.css";

import imageTwo from "../../assets/2.png";
import imageThree from "../../assets/3.png";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setAuth }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const checkValidity = async () => {
            const response = await axios.get(
                "http://localhost:4000/checkAccess",
                { withCredentials: true }
            );
            console.log(response.data.success);
            if (response.data.success === 1) {
                setAuth(true);
                localStorage.setItem(
                    "profile",
                    JSON.stringify(response.data.user)
                );
            }
        };
        checkValidity();
    }, []);

    const onSumbit = async () => {
        if (isLogin) {
            var data = JSON.stringify({
                username: username,
                password: password,
            });
            var config = {
                method: "post",
                url: "http://localhost:4000/login",
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
                data: data,
            };

            const response = await axios(config).catch((err) => {
                toast(err.response.data?.message, {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            });
            if (response.status === 200) {
                setAuth(true);
            } else {
            }
        } else {
            var data = JSON.stringify({
                name: name,
                username: username,
                password: password,
            });
            var config = {
                method: "post",
                url: "http://localhost:4000/createUser",
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
                data: data,
            };

            const response = await axios(config).catch((err) => {
                toast(err.response.data?.message, {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            });
            if (response.status === 200) {
                setAuth(true);
            } else {
            }
        }
    };

    return (
        <div theme className={classes.container}>
            <div className={classes.box}>
                <h1 className={classes.selectedFont}>Welcome to Tactic.</h1>
                <h3 className={classes.light_text}>Your AIO notes app.</h3>
                <div className={classes.center_div}>
                    <img src={imageThree} className={classes.image} />
                </div>
                <h3 className={classes.selectedFont}>
                    {isLogin ? "Login" : "Sign Up"}
                </h3>
                <div className={classes.signUp}>
                    {isLogin ? null : (
                        <TextField
                            id="filled-basic"
                            label="Name"
                            variant="standard"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    )}
                    <TextField
                        id="filled-basic"
                        label="User name"
                        variant="standard"
                        value={username}
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />
                    <TextField
                        type="password"
                        id="filled-adornment-password"
                        label="Password"
                        variant="standard"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <Button
                        style={{ marginTop: "8px" }}
                        variant="contained"
                        onClick={onSumbit}>
                        {isLogin ? "Login" : "Sign Up"}
                    </Button>
                </div>
                <div
                    style={{
                        marginTop: "8px",
                        display: "flex",
                        justifyContent: "end",
                    }}
                    className={classes.onHover}
                    onClick={() => setIsLogin(!isLogin)}>
                    <h4> {!isLogin ? "Login" : "Sign Up"}</h4>
                    <LoginIcon></LoginIcon>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
