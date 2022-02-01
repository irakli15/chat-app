package com.chatapp.storage.repositories;

import com.chatapp.storage.data.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {

	@Query("SELECT c from Conversation c WHERE " +
			"(SELECT u.id FROM User u WHERE u.userName = :userName) " +
			"IN (SELECT p.id FROM c.participants p)")
	List<Conversation> findAllByParticipantUserName(String userName);
}
