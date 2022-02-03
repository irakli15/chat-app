import React, { useEffect, useState } from "react";
import MessageList from "./components/Chat/MessageList";
import SessionContext from "./context/session-context";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import ConversationsClient from "./api/ConversationsClient";


function App() {
	const [conversationToShow, setConversationToShow] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [userName, setUserName] = useState(
		localStorage.getItem("currentUserName")
	);
	const [conversations, setConversations] = useState([]);

	const conversationClickHandler = (conversationId) => {
		setConversationToShow(
			conversations.filter((conversation) => {
				return conversation.id === conversationId;
			})[0]
		);
	};

	const onGoBack = () => {
		setConversationToShow(null);
	};

	const sendMessageHandler = (dataForNewMessage) => {
		ConversationsClient.sendMessage(dataForNewMessage, conversationToShow, setConversationToShow, userName);
	}

	useEffect(() => {
		ConversationsClient.retrieveConversations(userName, setConversations);
	}, [userName]);

	const onLogIn = (userName) => {
		if (userName) {
			setUserName(userName);
		}
	};

	const logOutHandler = () => {
		setUserName(null);
		localStorage.removeItem("currentUserName");
		setConversations(null);
	};

	const searchHandler = (event) => {
		setSearchTerm(event.target.value);
	}

	useEffect(()=>{
		ConversationsClient.searchConversations(userName, setConversations, searchTerm);
	}, [searchTerm, userName]);

	return (
		<SessionContext.Provider value={{ currentUserName: userName }}>
			<div style={{display: "flex", height:"100vh"}}>
				{/*{userName && <button onClick={logOutHandler}>Log Out</button>}*/}

				{!userName && <Login loginHandler={onLogIn} />}

				{userName && conversations !== null && (
					<Sidebar
						conversationsData={conversations}
						onSearchChange = {searchHandler}
						onConversationClick={conversationClickHandler}
					/>
				) }
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
