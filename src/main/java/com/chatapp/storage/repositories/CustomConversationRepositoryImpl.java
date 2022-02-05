package com.chatapp.storage.repositories;

import com.chatapp.storage.data.Conversation;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class CustomConversationRepositoryImpl implements CustomConversationRepository {

	@PersistenceContext
	private EntityManager em;

	public Conversation getConversationWithMessages(Long conversationId) {
		Conversation conversation = em.find(Conversation.class, conversationId);
		conversation.getMessages().size();
		return conversation;
	}
}
