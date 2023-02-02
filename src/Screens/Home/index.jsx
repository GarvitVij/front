import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import axios from "axios";
import imageOne from "../../assets/1.png";
import Drawer from "@mui/material/Drawer";
import SearchField from "react-search-field";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import classes from "./index.module.css";
import FolderCard from "./FolderCard";

const Home = ({ setAuth }) => {
    const [drawer, setDrawer] = useState(false);
    const [user, setUser] = useState({});
    const [searchText, setSearchText] = useState("");
    const [open, setOpen] = useState(false);
    const [folderName, setFolderName] = useState("");
    const [folders, setFolders] = useState([]);

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
                "http://localhost:4000/getFolders",
                { withCredentials: true }
            );

            if (responseTwo.data.success === 1) {
                setFolders(responseTwo.data.folders.file);
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

    const createFolder = async () => {
        console.log(folderName);
        var data = JSON.stringify({
            folderName: folderName,
        });
        var config = {
            method: "post",
            url: "http://localhost:4000/addFolder",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
            withCredentials: true,
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
        console.log(response);
        if (response.status === 200) {
            toast("New folder created", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setFolders(response.data.folders.file);
            setFolderName("");
        } else {
        }
    };

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
            <div className={classes.search_area}>
                <SearchField
                    placeholder="Search..."
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                    searchText={searchText}
                    classNames={classes.search}
                />
            </div>
            <div onClick={() => setOpen(true)} className={classes.add_folder}>
                <div className={classes.add_folder_drop}>
                    <AddIcon />
                </div>
            </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create a new folder</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To organize your notes, create a folder, give it a
                        relatable name so that you can remember which note stays
                        where
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Folder name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setFolderName(e.target.value);
                        }}
                        value={folderName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => createFolder()}>Create</Button>
                </DialogActions>
            </Dialog>
            <div className={classes.cards_layout}>
                {folders.map((folder) => (
                    <FolderCard
                        name={folder.name}
                        id={folder.uuid}
                        type="note"
                    />
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Home;
