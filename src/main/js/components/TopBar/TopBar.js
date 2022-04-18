import "./TopBar.css"
import React from "react";
import Button from "../General/Button/Button";

const TopBar = (props) => {
    return (
        <div className="top-bar">
            <span className="top-bar-user-name"> {props.userName} </span>
            <Button className="logout-button" onClick={props.onLogout}>Log Out</Button>
        </div>
    );
}

export default TopBar;