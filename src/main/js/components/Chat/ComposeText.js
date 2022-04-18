import React, { useRef } from "react";
import classes from "./ComposeText.module.css";
import Button from "../General/Button/Button";

const ComposeText = (props) => {
	const messageTextRef = useRef();
	const onSendClick = () => {
		if (messageTextRef.current.value.trim().length > 0) {
			props.sendMessageHandler({
				content: messageTextRef.current.value,
				conversation: props.conversation,
			});
			messageTextRef.current.value = "";
		}
	};

	const onKeyPress = (event) => {
		if (event.ctrlKey && event.code === "Enter") {
			onSendClick();
		}
	}

	return (
			<div className={classes.compose}>
				<textarea className={classes['text-field']} ref={messageTextRef} onKeyPress={onKeyPress}/>
				<Button className={classes['send-button']} onClick={onSendClick}>Send</Button>
			</div>
	);
};

export default ComposeText;
