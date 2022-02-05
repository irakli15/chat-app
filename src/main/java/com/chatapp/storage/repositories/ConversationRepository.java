package com.chatapp.storage.repositories;

import com.chatapp.storage.data.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ConversationRepository extends JpaRepository<Conversation, Long>, CustomConversationRepository {

	@Query("SELECT c from Conversation c WHERE " +
			" EXISTS (SELECT 1 FROM c.participants p WHERE p.userName = :userName)")
	List<Conversation> findAllByParticipantUserName(String userName);

	@Query("SELECT c from Conversation c WHERE " +
			"(SELECT u.id FROM User u WHERE u.userName = :currentUserName) " +
			"IN (SELECT p.id FROM c.participants p) " +
			"AND EXISTS (SELECT 1 FROM c.participants p WHERE p.userName <> :currentUserName AND p.userName LIKE %:searchTerm%)")
	List<Conversation> searchAllByParticipantUserName(String currentUserName, String searchTerm);
}
