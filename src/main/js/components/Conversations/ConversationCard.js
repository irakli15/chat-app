import "./ConversationCard.css";
import React, {useContext} from "react";
import SessionContext from "../../context/session-context";

const ConversationCard = (props) => {
	console.log(props.participantUserName)
	const userNameToShow = props.participantUserName === useContext(SessionContext).currentUserName ?
		"You" : props.participantUserName;
	return (
		<div className="card-style" onClick={props.cardClickHandler}>
			<div>
				<div>
					<b>{props.participantUserName}</b>
				</div>
				<span
					style={{fontSize: "small", color: "grey"}}>{userNameToShow + ": " + props.lastMessage + " - " + new Date(props.lastMessageTime).toLocaleString()}</span>
			</div>
		</div>
	);
};

export default ConversationCard;
