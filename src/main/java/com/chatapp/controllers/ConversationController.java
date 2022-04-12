package com.chatapp.controllers;

import com.chatapp.api.dto.ConversationDTO;
import com.chatapp.api.dto.MessageDTO;
import com.chatapp.api.dto.ReceivedMessageDTO;
import com.chatapp.service.ConversationService;
import lombok.extern.java.Log;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/conversation", produces = "application/json")
@CrossOrigin
@Log
public class ConversationController {

	private final ConversationService conversationService;

	public ConversationController(ConversationService conversationService) {
		this.conversationService = conversationService;
	}

	@GetMapping("/getConversationById/{conversationId}")
	public ConversationDTO getConversation(@PathVariable Long conversationId) {
		return conversationService.getFullConversation(conversationId);
	}

	@GetMapping("/getAll")
	public List<ConversationDTO> getConversations(Authentication authentication) {
		return conversationService.getConversationByUserName(authentication.getName());
	}

	@GetMapping("/searchConversations")
	public List<ConversationDTO> searchConversations(Authentication authentication,
													 @RequestParam String searchTerm) {

		return conversationService.searchOldAndNewConversations(authentication.getName(), searchTerm);
	}


	@PutMapping("/addMessage")
	public MessageDTO addMessageToConversation(@RequestBody ReceivedMessageDTO receivedMessage) {
		return MessageDTO.toDTO(conversationService.addMessageToConversation(receivedMessage));
	}


}
