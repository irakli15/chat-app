package com.chatapp.api.dto;

import com.chatapp.storage.data.Conversation;
import com.chatapp.storage.data.Message;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceivedMessageDTO {
	Message message;
	Conversation conversation;
}

