package com.chatapp.storage.data;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Conversation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToMany(fetch = FetchType.EAGER)
	private List<User> participants = new ArrayList<>();

	@OneToMany(mappedBy = "conversationId", fetch = FetchType.LAZY)
	private List<Message> messages = new ArrayList<>();
}
