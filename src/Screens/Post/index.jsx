import MUIRichTextEditor from "mui-rte";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classes from "./index.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Post = () => {
    const navigate = useNavigate();
    const [noteName, setNoteName] = useState("");
    const [noteData, setNoteData] = useState({});

    const myTheme = createTheme({
        // Set up your custom MUI theme here
    });

    const save = async (text) => {
        const folderId = window.localStorage.getItem("folder");

        const response = await axios
            .post("http://localhost:4000/createPost", {
                title: noteName,
                folderid: folderId,
                noteData: text,
            })
            .catch((err) => {
                toast("Cannot save note right now", {
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
            toast("Note saved", {
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

    return (
        <div className={classes.margin}>
            <div className={classes.pointer} onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{ fontSize: "40px" }} />
            </div>

            <input
                type="text"
                className={classes.noteName}
                placeholder="Title here"
                value={noteName}
                onChange={(e) => {
                    console.log(setNoteName(e.target.value));
                }}
            />
            <div className={classes.textArea}>
                <ThemeProvider theme={myTheme}>
                    <MUIRichTextEditor
                        label="Start typing..."
                        onSave={(text) => {
                            save(text);
                        }}
                    />
                </ThemeProvider>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Post;
