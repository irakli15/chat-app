import "./ConversationCard.css";
import React from "react";

const ConversationCard = (props) => {
	const cardClickHandler = () => {
		props.cardClickHandler(props.conversationId);
	};

	return (
		<div className="card-style" onClick={cardClickHandler}>
			<div>
				<b>{props.participantUserName}</b>
			</div>
			{props.lastMessage}
			{props.lastMessageTime}
		</div>
	);
};

export default ConversationCard;
