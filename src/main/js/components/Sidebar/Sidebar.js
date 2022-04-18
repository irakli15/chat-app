import React from "react";
import classes from "./Sidebar.module.css";
import ConversationList from "../Conversations/ConversationList";

const Sidebar = (props) => {
    return (
        <div className={classes.sidebar}>
            <input onChange={props.onSearchChange} className={classes.searchBar} placeholder="Search..." type="text"/>

            <ConversationList
                conversationsData={props.conversationsData}
                onConversationClick={props.onConversationClick}/>
        </div>
    );
}

export default Sidebar;