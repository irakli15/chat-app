package com.chatapp.api;

import com.chatapp.storage.data.Conversation;
import com.chatapp.storage.data.Message;
import com.chatapp.storage.repositories.ConversationRepository;
import com.chatapp.storage.repositories.MessageRepository;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "conversation")
@EnableWebMvc
@Log
public class ConversationController {
	private final ConversationRepository conversationRepository;
	private final MessageRepository messageRepository;

	public ConversationController(ConversationRepository conversationRepository,
								  MessageRepository messageRepository) {
		this.conversationRepository = conversationRepository;
		this.messageRepository = messageRepository;
	}


	@GetMapping("/{conversationId}")
	public Conversation getConversation(@PathVariable Long conversationId) {
		Conversation conversation = conversationRepository.findById(conversationId).get();
		log.info(conversation.getMessages().get(0).toString());
		return conversation;
	}

	@GetMapping("/byUser/{userId}")
	public List<Conversation> getConversationByUserId(@PathVariable Long userId) {
		return conversationRepository.findAllByParticipantId(userId);
	}

	@PutMapping("/addMessage")
	public void addMessageToConversation(@RequestBody Message message) {
//		Message message =
//				Message.builder()
//						.conversationId(Long.parseLong(conversationId))
//						.content(content)
//						.time(new Date())
//						.senderId(Long.parseLong(senderUserId))
//						.build();
		message.setTime(new Date());
		log.info("added message: " + message.toString());
		messageRepository.save(message);
	}

}
