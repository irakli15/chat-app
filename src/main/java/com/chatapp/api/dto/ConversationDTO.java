package com.chatapp.api.dto;

import com.chatapp.storage.data.Message;
import com.chatapp.storage.data.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConversationDTO {

	private Long id;

	private List<User> participants = new ArrayList<>();

	private List<Message> messages = new ArrayList<>();

	private String lastMessage;

	private Date lastMessageTime;
}
