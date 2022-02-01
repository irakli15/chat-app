import React, { useContext } from "react";
import SessionContext from "../../context/session-context";
import ChatCard from "./ChatCard";
import ComposeText from "./ComposeText";
import { getUserNameByUserId } from "./Helper";
import "./MessageList.css";

const MessageList = (props) => {
	const currentUserName = useContext(SessionContext).currentUserName;
	return (
		<div>
			<div className="conversation-header">
				<button className="back-button" onClick={props.onGoBackClick}>
					Go Back
				</button>
				<h3 className="conversee-title">User2</h3>
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
