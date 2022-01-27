package com.chatapp.storage.repositories;

import com.chatapp.storage.data.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {

}
