package com.chatapp.storage.repositories;

import com.chatapp.storage.data.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
