package com.chatapp.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConversationDTO {

	private Long id;

	private List<UserDTO> participants = new ArrayList<>();

	private List<MessageDTO> messages = new ArrayList<>();

	private String lastMessage;

	private Long lastMessageTime;

	private Long lastMessageFrom;
}
