import classes from "./ChatCard.module.css";
import React from "react";
import getTimeString from "../../Utils/DateUtils";

function ChatCard(props) {
	const position = (props.drawRight ? "right" : "left");
	const cardPositionClass = "chat-card-" + position;
	const messageTimePositionClass = "message-time-" + position;
	const contentPositionClass = "content-" + position;
	return (
		<div className={`${classes['chat-card']} ${classes[cardPositionClass]}`}>
			<div className={`${classes.content} ${classes[contentPositionClass]}`}>
				<span className={`${classes.content}`}>{props.content}</span>
			</div>
			<span className={`${classes['message-time']} ${classes[messageTimePositionClass]}`}>{getTimeString(props.time)}</span>
		</div>
	);
}

export default ChatCard;
