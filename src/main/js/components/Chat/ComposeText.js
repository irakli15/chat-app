import React, { useRef } from "react";
import "./ComposeText.css";

const ComposeText = (props) => {
	const messageTextRef = useRef();
	const onSendClick = () => {
		if (messageTextRef.current.value.length > 0) {
			props.sendMessageHandler({
				content: messageTextRef.current.value,
				conversationId: props.conversationId,
			});
			messageTextRef.current.value = "";
		}
	};

	return (
		<div className="compose-text">
			<div className="compose-text-wrapper">
				<textarea style={{margin: "0 10px"}} ref={messageTextRef}/>
				<button onClick={onSendClick}>Send</button>
			</div>
		</div>
	);
};

export default ComposeText;
