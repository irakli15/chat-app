import "./ConversationCard.css";
import React, {useContext} from "react";
import SessionContext from "../../context/session-context";

const ConversationCard = (props) => {
	const userNameToShow = props.lastMessageFrom === useContext(SessionContext).currentUserName ?
		"You" : props.participantUserName;
	return (
		<div className="card-style" onClick={props.cardClickHandler}>
			<div>
				<div>
					<b>{props.participantUserName}</b>
				</div>
				{props.lastMessageFrom && <span
					style={{
						fontSize: "small",
						color: "grey"
					}}>{userNameToShow + ": " + props.lastMessage + " - " + new Date(props.lastMessageTime).toLocaleString()}</span>}
			</div>
		</div>
	);
};

export default ConversationCard;
