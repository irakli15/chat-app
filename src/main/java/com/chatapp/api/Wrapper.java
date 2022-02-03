package com.chatapp.api;

import com.chatapp.storage.data.Conversation;
import com.chatapp.storage.data.Message;

public class Wrapper {
	Message message;
	Conversation conversation;

	public Wrapper(Message message, Conversation conversation) {
		this.message = message;
		this.conversation = conversation;
	}

	public Wrapper() {
	}


	public Message getMessage() {
		return message;
	}

	public void setMessage(Message message) {
		this.message = message;
	}

	public Conversation getConversation() {
		return conversation;
	}

	public void setConversation(Conversation conversation) {
		this.conversation = conversation;
	}
}

