import MUIRichTextEditor from "mui-rte";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classes from "./index.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
const GetPost = () => {
    const navigate = useNavigate();
    const loc = useLocation();
    const [noteName, setNoteName] = useState("");
    const [noteData, setNoteData] = useState(null);
    const [found, setFound] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const data = await axios
                .get(
                    `http://localhost:4000/getNote/${
                        loc.pathname.split("/")[2]
                    }`
                )
                .catch((err) => {
                    setFound(false);
                });
            console.log(data.data.note.data);
            setNoteName(data.data.note.title);
            setNoteData(JSON.stringify(data.data.note.data));
        };
        getData();
    }, []);

    const myTheme = createTheme({
        // Set up your custom MUI theme here
    });

    const toShow =
        found === true ? (
            <>
                <div className={classes.pointer} onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{ fontSize: "40px" }} />
                </div>

                <input
                    type="text"
                    className={classes.noteName}
                    placeholder="fetching ..."
                    value={noteName}
                    disabled={true}
                />
                <div className={classes.textArea}>
                    <ThemeProvider theme={myTheme}>
                        {noteData ? (
                            <MUIRichTextEditor
                                defaultValue={noteData}
                                toolbar={false}
                            />
                        ) : null}
                    </ThemeProvider>
                </div>
            </>
        ) : (
            <div>404 note not found</div>
        );

    return (
        <div className={classes.margin}>
            {toShow}
            <ToastContainer />
        </div>
    );
};

export default GetPost;
