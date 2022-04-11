import React, {useEffect, useState} from "react";
import MessageList from "./components/Chat/MessageList";
import SessionContext from "./context/session-context";
import Sidebar from "./components/Sidebar/Sidebar";
import ConversationsClient from "./api/ConversationsClient";
import TopBar from "./components/TopBar/TopBar";
import Login from "./components/Login/Login";


function App() {
    const [conversationToShow, setConversationToShow] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [userName, setUserName] = useState(localStorage.getItem("currentUserName"));
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        ConversationsClient.checkAuth(setUserName);
    }, []);

    useEffect(() => {
        if (userName) {
            ConversationsClient.searchConversations(userName, setConversations, searchTerm);
        }
    }, [searchTerm, userName]);

    const conversationClickHandler = (conversation) => {
        if (conversation.id) {
            ConversationsClient.retrieveFullConversation(conversation.id, setConversationToShow);
        } else {
            setConversationToShow(conversation);
        }
    };

    const onGoBack = () => {
        setConversationToShow(null);
    };

    const sendMessageHandler = (dataForNewMessage) => {
        ConversationsClient.sendMessage(
            dataForNewMessage,
            conversationToShow,
            setConversationToShow,
            userName,
            setConversations);
    }

    const logOutHandler = () => {
        setUserName(null);
        localStorage.removeItem("currentUserName");
        localStorage.removeItem("jwtToken");
        setConversations(null);
    };

    const logInHandler = async (userName, password) => {
        const credentials = btoa(userName + ":" + password);
        const response = await fetch("http://localhost:8080/token",
            {
                method: "POST",
                headers: {"Authorization": `Basic ${credentials}`}
            });
        if (response.status === 200) {
            const jwtToken = await response.text();
            localStorage.setItem("currentUserName", userName);
            localStorage.setItem("jwtToken", jwtToken);
            setUserName(userName);
        }
    }

    const searchHandler = (event) => {
        setSearchTerm(event.target.value);
    }

    return (
        <SessionContext.Provider value={{currentUserName: userName}}>
            {userName && conversations !== null && (<TopBar onLogout={logOutHandler} userName={userName}/>)}

            <div style={{display: "flex", height: "100vh"}}>
                {!userName && <Login loginHandler = {logInHandler}/>}

                {userName && conversations !== null && (
                    <Sidebar
                        conversationsData={conversations}
                        onSearchChange={searchHandler}
                        onConversationClick={conversationClickHandler}
                    />
                )}
                {userName && conversationToShow !== null && conversations !== null && (
                    <MessageList
                        onGoBackClick={onGoBack}
                        conversation={conversationToShow}
                        sendMessageHandler={sendMessageHandler}
                    />
                )}
            </div>
        </SessionContext.Provider>
    );
}

export default App;
