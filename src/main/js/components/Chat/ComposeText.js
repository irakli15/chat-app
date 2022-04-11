import React, { useRef } from "react";
import "./ComposeText.css";

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
			<div className="compose-text">
				<textarea className="compose-text-field" ref={messageTextRef} onKeyPress={onKeyPress}/>
				<button onClick={onSendClick}>Send</button>
			</div>
	);
};

export default ComposeText;
