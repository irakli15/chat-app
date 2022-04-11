import "./ChatCard.css";
import React from "react";

function ChatCard(props) {
	return (
		<div
			className={
				"chat-card-style" + (props.drawRight ? " current-user-message" : "")
			}
		>
			<div
				className={
					"content-style" + (props.drawRight ? " current-user-content" : "")
				}
			>
				{props.content}
			</div>
			<div className="message-time-style">{new Date(props.time).toLocaleString()}</div>
		</div>
	);
}

export default ChatCard;
