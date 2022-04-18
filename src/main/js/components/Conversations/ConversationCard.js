import "./ConversationCard.css";
import React, {useContext} from "react";
import SessionContext from "../../context/session-context";
import getTimeString from "../../Utils/DateUtils";

const ConversationCard = (props) => {
	const userNameToShow = props.lastMessageFrom === useContext(SessionContext).currentUserName ?
		"You" : props.participantUserName;

	const lastMessage =
		props.lastMessageFrom ?
			userNameToShow + ": " + props.lastMessage : null;

	const lastMessageTime = props.lastMessageFrom ? getTimeString(props.lastMessageTime) : null;

	return (
		<div className="card-style" onClick={props.cardClickHandler}>
			<div className="participant-name-style">
				{props.participantUserName}
			</div>
			<div className="last-message-style">
				{lastMessage}
			</div>
			<div className="last-message-time-style">
				{lastMessageTime}
			</div>
		</div>
	);
};

export default ConversationCard;
