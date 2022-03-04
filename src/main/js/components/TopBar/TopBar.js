import "./TopBar.css"
import React from "react";

const TopBar = (props) => {
    return (
        <div className="top-bar">
            <span className="top-bar-user-name"> {props.userName} </span>
            <button className="logout-button" onClick={props.onLogout}>Log Out</button>
        </div>
    );
}

export default TopBar;