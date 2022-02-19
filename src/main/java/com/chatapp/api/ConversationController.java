package com.chatapp.api;

import com.chatapp.api.dto.ConversationDTO;
import com.chatapp.api.dto.ReceivedMessageDTO;
import com.chatapp.service.ConversationService;
import lombok.extern.java.Log;
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

	@GetMapping("/byUser/{userName}")
	public List<ConversationDTO> getConversationByUserName(@PathVariable String userName) {
		return conversationService.getConversationByUserName(userName);
	}

	@GetMapping("/searchConversations")
	public List<ConversationDTO> searchConversations(@RequestParam String userName,
													 @RequestParam String searchTerm) {

		return conversationService.searchOldAndNewConversations(userName, searchTerm);
	}


	@PutMapping("/addMessage")
	public Long addMessageToConversation(@RequestBody ReceivedMessageDTO receivedMessage) {
		return conversationService.addMessageToConversation(receivedMessage);
	}


}
