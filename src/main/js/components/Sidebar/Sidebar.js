import React from "react";
import "./Sidebar.css";
import ConversationList from "../Conversations/ConversationList";

const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <input onChange={props.onSearchChange} className="friend-search-bar" type="text"/>

            <ConversationList
                conversationsData={props.conversationsData}
                onConversationClick={props.onConversationClick}/>
        </div>
    );
}

export default Sidebar;