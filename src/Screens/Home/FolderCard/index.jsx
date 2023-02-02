import FolderIcon from "@mui/icons-material/Folder";
import NoteIcon from "@mui/icons-material/Note";
import classes from "./index.module.css";
import { useNavigate } from "react-router-dom";

const FolderCard = ({ name, id, type }) => {
    let navigate = useNavigate();
    return (
        <div
            onClick={() => {
                if (type !== "note") {
                    console.log("clicked on note");
                    navigate(`/getpost/${id}`);
                } else {
                    window.localStorage.setItem("folder", id);
                    navigate(`/user/${id}`);
                }
            }}
            className={classes.box}>
            {type !== "note" ? (
                <NoteIcon
                    style={{ color: "rgb(139, 135, 135)" }}
                    sx={{ fontSize: "180px" }}
                />
            ) : (
                <FolderIcon
                    style={{ color: "rgb(139, 135, 135)" }}
                    sx={{ fontSize: "180px" }}
                />
            )}
            <h4>{name}</h4>
        </div>
    );
};

export default FolderCard;
