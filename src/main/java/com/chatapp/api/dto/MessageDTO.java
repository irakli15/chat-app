package com.chatapp.api.dto;

import com.chatapp.storage.data.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageDTO {
	private Long id;
	private String content;
	private Long time;
	private Long senderId;
	private Long conversationId;


	public static MessageDTO toDTO(Message message) {
		return new MessageDTO(
				message.getId(),
				message.getContent(),
				message.getTime().getTime(),
				message.getSenderId(),
				message.getConversationId()
		);
	}

	public static Message fromDTO(MessageDTO dto) {
		return new Message(
				dto.getId(),
				dto.getContent(),
				new Date(dto.getTime()),
				dto.getSenderId(),
				dto.getConversationId()
		);
	}

	public static List<MessageDTO> toDTOs(List<Message> messages) {
		return messages.stream().map(MessageDTO::toDTO).collect(Collectors.toList());
	}

	public static List<Message> fromDTOs(List<MessageDTO> messageDTOS) {
		return messageDTOS.stream().map(MessageDTO::fromDTO).collect(Collectors.toList());
	}
}

