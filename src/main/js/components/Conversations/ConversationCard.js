import "./ConversationCard.css";
import React from "react";

const ConversationCard = (props) => {
	return (
		<div className="card-style" onClick={props.cardClickHandler}>
			<div>
				<b>{props.participantUserName}</b>
			</div>
			{props.lastMessage}
			{props.lastMessageTime}
		</div>
	);
};

export default ConversationCard;
