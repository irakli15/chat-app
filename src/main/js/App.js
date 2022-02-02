import ConversationList from "./components/Conversations/ConversationList";
import React, { useEffect, useState } from "react";
import MessageList from "./components/Chat/MessageList";
import SessionContext from "./context/session-context";
import Login from "./components/Login/Login";

const retrieveConversations = (userName, setConversations) => {
	if (userName) {
		fetch("http://localhost:8080/api/conversation/byUser/" + userName)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setConversations(data);
				localStorage.setItem("currentUserName", userName);
			});
	}
};

function App() {
	const [conversationToShow, setConversationToShow] = useState(null);
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

	const sendMessage = (content) => {
		console.log(content);
	};

	useEffect(() => {
		retrieveConversations(userName, setConversations);
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

	return (
		<SessionContext.Provider value={{ currentUserName: userName }}>
			<div style={{display: "flex", height:"100vh"}}>
				{/*{userName && <button onClick={logOutHandler}>Log Out</button>}*/}

				{!userName && <Login loginHandler={onLogIn} />}

				{userName && conversations !== null && (
				 	<ConversationList
						conversationsData={conversations}
						onConversationClick={conversationClickHandler}
					/>
				) }
				{userName && conversationToShow !== null && conversations !== null && (
					<MessageList
						onGoBackClick={onGoBack}
			 			conversation={conversationToShow}
						sendMessageHandler={sendMessage}
					/>
				)}
			</div>
		</SessionContext.Provider>
	);
}

export default App;
