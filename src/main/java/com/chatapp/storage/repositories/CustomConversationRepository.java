package com.chatapp.storage.repositories;

import com.chatapp.storage.data.Conversation;

public interface CustomConversationRepository {
	Conversation getConversationWithMessages(Long conversationId);
}
