package com.chatapp.service;

import com.chatapp.api.dto.ConversationDTO;
import com.chatapp.api.dto.ReceivedMessageDTO;
import com.chatapp.api.dto.UserDTO;
import com.chatapp.storage.data.Conversation;
import com.chatapp.storage.data.Message;
import com.chatapp.storage.data.User;
import com.chatapp.storage.repositories.ConversationRepository;
import com.chatapp.storage.repositories.MessageRepository;
import com.chatapp.storage.repositories.UserRepository;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Log
public class ConversationService {

	private final ConversationRepository conversationRepository;
	private final MessageRepository messageRepository;
	private final UserRepository userRepository;

	public ConversationService(ConversationRepository conversationRepository,
							   MessageRepository messageRepository,
							   UserRepository userRepository) {
		this.conversationRepository = conversationRepository;
		this.messageRepository = messageRepository;
		this.userRepository = userRepository;
	}


	public ConversationDTO getFullConversation(Long conversationId) {
		Conversation conversation = conversationRepository.getConversationWithMessages(conversationId);
		String lastMessage = null;
		Date lastMessageTime = null;
		if (conversation.getMessages().size() > 0) {
			int lastIndex = conversation.getMessages().size() - 1;
			lastMessage = conversation.getMessages().get(lastIndex).getContent();
			lastMessageTime = conversation.getMessages().get(lastIndex).getTime();
		}

		return ConversationDTO.builder()
				.id(conversation.getId())
				.participants(UserDTO.toDTOs(conversation.getParticipants()))
				.messages(conversation.getMessages())
				.lastMessage(lastMessage)
				.lastMessageTime(lastMessageTime)
				.build();
	}

	public List<ConversationDTO> getConversationByUserName(@PathVariable String userName) {
		List<Conversation> allByParticipantUserName = conversationRepository.findAllByParticipantUserName(userName);
		return allByParticipantUserName.stream().map(this::getConversationDTO).collect(Collectors.toList());
	}

	public List<ConversationDTO> searchOldAndNewConversations(String userName, String searchTerm) {
		UserDTO currentUser = UserDTO.toDTO(userRepository.getByUserName(userName));
		List<ConversationDTO> conversations =
				conversationRepository.searchAllByParticipantUserName(userName, searchTerm)
						.stream().map(this::getConversationDTO).collect(Collectors.toList());
		Set<Long> allParticipants =
				conversations.stream()
						.map(ConversationDTO::getParticipants)
						.flatMap(List::stream)
						.map(UserDTO::getId)
						.collect(Collectors.toSet());
		allParticipants.add(currentUser.getId());
		List<User> notContactedUsers = userRepository.findNotContactedUsers(allParticipants, searchTerm);
		conversations.addAll(notContactedUsers.stream().map(user -> {
			ConversationDTO conversation = new ConversationDTO();
			conversation.getParticipants().add(currentUser);
			conversation.getParticipants().add(UserDTO.toDTO(user));
			return conversation;
		}).collect(Collectors.toList()));
		return conversations;
	}

	public Long addMessageToConversation(@RequestBody ReceivedMessageDTO receivedMessage) {
		Message message = receivedMessage.getMessage();
		Long conversationId = receivedMessage.getMessage().getConversationId();
		message.setTime(new Date());
		if (conversationId == null) {
			receivedMessage.getConversation().setMessages(new ArrayList<>());
			Conversation savedConversation = conversationRepository.save(receivedMessage.getConversation());
			message.setConversationId(savedConversation.getId());
			conversationId = savedConversation.getId();
		}
		messageRepository.save(message);
		return conversationId;
	}

	private ConversationDTO getConversationDTO(Conversation conversation) {
		Message message = conversation.getMessages().get(conversation.getMessages().size() - 1);
		return new ConversationDTO(
				conversation.getId(),
				UserDTO.toDTOs(conversation.getParticipants()),
				null,
				message.getContent(),
				message.getTime());
	}
}
