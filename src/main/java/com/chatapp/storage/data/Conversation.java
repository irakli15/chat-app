package com.chatapp.storage.data;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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

	@OneToMany
	private List<User> participants = new ArrayList<>();

	@OneToMany(mappedBy = "conversationId", fetch = FetchType.EAGER)
	private List<Message> messages = new ArrayList<>();
}
