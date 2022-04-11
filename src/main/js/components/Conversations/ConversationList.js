import React, {useContext} from "react";
import SessionContext from "../../context/session-context";
import ConversationCard from "./ConversationCard";
import "./ConversationList.css";

const ConversationList = (props) => {
	const currentUserName = useContext(SessionContext).currentUserName;

	return (
		<div className="list-style">
			{props.conversationsData.map((convData, index) => {
				return (
					<ConversationCard
						key={index}
						participantUserName={
							convData.participants.filter(
								(user) => currentUserName !== user.userName
							)[0].userName
						}
						lastMessage={convData.lastMessage}
						lastMessageTime={convData.lastMessageTime}
						cardClickHandler={() => props.onConversationClick(convData)}
						lastMessageFrom={convData.lastMessageFrom ?
							convData.participants.filter((user) => convData.lastMessageFrom === user.id)[0].userName : null}
					/>
				);
			})}
		</div>
	);
};

export default ConversationList;
