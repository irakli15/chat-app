import React, { useContext } from "react";
import SessionContext from "../../context/session-context";
import ChatCard from "./ChatCard";
import ComposeText from "./ComposeText";
import { getUserNameByUserId, getParticipantUserName} from "./Helper";
import "./MessageList.css";
import "./Helper"

const MessageList = (props) => {
	const currentUserName = useContext(SessionContext).currentUserName;
	return (
		<div className="messages-wrapper">
			<div className="conversation-header">
				{getParticipantUserName(props.conversation.participants, currentUserName)[0].userName}
			</div>
			<div className="message-list-style">
				{props.conversation.messages.map((message) => {
					return (
						<ChatCard
							key={message.id}
							drawRight={
								getUserNameByUserId(
									message.senderId,
									props.conversation.participants
								) === currentUserName
							}
							content={message.content}
							time={message.time}
						/>
					);
				})}
			</div>
			<ComposeText
				sendMessageHandler={props.sendMessageHandler}
				conversationId={props.conversation.id}
			/>
		</div>
	);
};

export default MessageList;
