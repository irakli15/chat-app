package com.chatapp.api;

import com.chatapp.api.dto.ConversationDTO;
import com.chatapp.api.dto.ReceivedMessageDTO;
import com.chatapp.storage.data.Conversation;
import com.chatapp.storage.data.Message;
import com.chatapp.storage.data.User;
import com.chatapp.storage.repositories.ConversationRepository;
import com.chatapp.storage.repositories.MessageRepository;
import com.chatapp.storage.repositories.UserRepository;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/conversation", produces = "application/json")
@CrossOrigin
@Log
public class ConversationController {
	private final ConversationRepository conversationRepository;
	private final MessageRepository messageRepository;
	private final UserRepository userRepository;

	public ConversationController(ConversationRepository conversationRepository,
								  MessageRepository messageRepository,
								  UserRepository userRepository) {
		this.conversationRepository = conversationRepository;
		this.messageRepository = messageRepository;
		this.userRepository = userRepository;
	}


	@GetMapping("/getConversationById/{conversationId}")
	public Conversation getConversation(@PathVariable Long conversationId) {
		return conversationRepository.getConversationWithMessages(conversationId);
	}

	@GetMapping("/byUser/{userName}")
	public List<ConversationDTO> getConversationByUserName(@PathVariable String userName) {
		List<Conversation> allByParticipantUserName = conversationRepository.findAllByParticipantUserName(userName);
		return allByParticipantUserName.stream().map(conversation -> {
			Message message = conversation.getMessages().get(conversation.getMessages().size() - 1);
			return new ConversationDTO(
					conversation.getId(),
					conversation.getParticipants(),
					null,
					message.getContent(),
					message.getTime());
		}).collect(Collectors.toList());
	}


	@GetMapping("/searchConversations")
	public List<Conversation> searchConversations(@RequestParam String userName,
												  @RequestParam String searchTerm) {
		User currentUser = userRepository.getByUserName(userName);
		List<Conversation> conversations = conversationRepository.searchAllByParticipantUserName(userName, searchTerm);
		Set<Long> allParticipants =
				conversations.stream()
						.map(Conversation::getParticipants)
						.flatMap(List::stream)
						.map(User::getId)
						.collect(Collectors.toSet());
		allParticipants.add(currentUser.getId());
		List<User> notContactedUsers = userRepository.findNotContactedUsers(allParticipants, searchTerm);
		conversations.addAll(notContactedUsers.stream().map(user -> {
			Conversation conversation = new Conversation();
			conversation.getParticipants().add(currentUser);
			conversation.getParticipants().add(user);
			return conversation;
		}).collect(Collectors.toList()));

		return conversations;
	}


	@PutMapping("/addMessage")
	public void addMessageToConversation(@RequestBody ReceivedMessageDTO receivedMessage) {
		Message message = receivedMessage.getMessage();
		message.setTime(new Date());
		messageRepository.save(message);
	}

}
