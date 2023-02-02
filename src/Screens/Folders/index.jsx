import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import axios from "axios";
import imageOne from "../../assets/1.png";
import Drawer from "@mui/material/Drawer";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import classes from "./index.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import FolderCard from "../Home/FolderCard";

const Folders = ({ setAuth }) => {
    let navigate = useNavigate();
    const [drawer, setDrawer] = useState(false);
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [editor, setEditor] = useState(false);

    useEffect(() => {
        const checkValidity = async () => {
            const response = await axios.get(
                "http://localhost:4000/checkAccess",
                { withCredentials: true }
            );
            console.log(response.data.success);
            if (response.data.success === 1) {
                localStorage.setItem(
                    "profile",
                    JSON.stringify(response.data.user)
                );
                setUser(response.data.user);
            } else {
                setAuth(false);
            }

            const responseTwo = await axios.get(
                `http://localhost:4000/getNotes?id=${window.localStorage.getItem(
                    "folder"
                )}`,
                { withCredentials: true }
            );

            if (responseTwo.status === 200) {
                setNotes(responseTwo.data.notes);
            } else {
                toast("Cannot fetch folders", {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        };
        checkValidity();
    }, []);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setDrawer(true)}
                        sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}>
                        {`Welcome ${user.name}`}
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit">
                            {Object.keys(user).length === 0 ? (
                                <Avatar alt="Remy Sharp" src={imageOne} />
                            ) : (
                                <Avatar
                                    alt="Remy Sharp"
                                    src={`http://127.0.0.1:8090/api/files/users/${
                                        user.profilePic.split("_")[0]
                                    }/${user.profilePic}`}
                                />
                            )}
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor={"left"}
                open={drawer}
                onClose={() => setDrawer(false)}>
                <List>
                    <ListItem key={"Logout"} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <div
                onClick={() => navigate("/createPost")}
                className={classes.add_folder}>
                <div className={classes.add_folder_drop}>
                    <AddIcon />
                </div>
            </div>
            <div className={classes.cards_layout}>
                {notes.map((note) => (
                    <FolderCard name={note.title} id={note.id} />
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Folders;
