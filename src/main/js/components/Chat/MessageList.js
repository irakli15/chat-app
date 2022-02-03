import React, {useContext, useEffect, useRef} from "react";
import SessionContext from "../../context/session-context";
import ChatCard from "./ChatCard";
import ComposeText from "./ComposeText";
import { getUserNameByUserId, getParticipantUserName} from "./Helper";
import "./MessageList.css";
import "./Helper"

const MessageList = (props) => {
	const currentUserName = useContext(SessionContext).currentUserName;
	const messagesEnd = useRef();

	useEffect(()=> {
		messagesEnd.current.scrollIntoView({behavior:"smooth"});
	})


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
				<div ref={messagesEnd}/>
			</div>
			<ComposeText
				sendMessageHandler={props.sendMessageHandler}
				conversation={props.conversation}
			/>
		</div>
	);
};

export default MessageList;
