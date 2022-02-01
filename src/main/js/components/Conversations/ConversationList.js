import React, { useContext } from "react";
import SessionContext from "../../context/session-context";
import ConversationCard from "./ConversationCard";
import "./ConversationList.css";

const ConversationList = (props) => {
	console.log(props.conversationsData);
	const currentUserName = useContext(SessionContext).currentUserName;
	return (
		<div className="list-style">
			{props.conversationsData.map((convData) => {
				return (
					<ConversationCard
						key={convData.id}
						participantUserName={
							convData.participants.filter(
								(user) => currentUserName !== user.userName
							)[0].userName
						}
						lastMessage={
							convData.messages[convData.messages.length - 1].content
						}
						lastMessageTime={
							convData.messages[convData.messages.length - 1].time
						}
						cardClickHandler={() => props.onConversationClick(convData.id)}
					/>
				);
			})}
		</div>
	);
};

export default ConversationList;
