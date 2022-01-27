package com.chatapp;

import com.chatapp.storage.data.Conversation;
import com.chatapp.storage.data.FriendRequest;
import com.chatapp.storage.data.Message;
import com.chatapp.storage.data.User;
import com.chatapp.storage.repositories.ConversationRepository;
import com.chatapp.storage.repositories.FriendRequestRepository;
import com.chatapp.storage.repositories.MessageRepository;
import com.chatapp.storage.repositories.UserRepository;
import lombok.extern.java.Log;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import java.util.Date;
import java.util.List;

@SpringBootApplication
@Log
public class ChatAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatAppApplication.class, args);
	}

	@Bean
	@Profile("dev")
	public CommandLineRunner dataLoader(UserRepository userRepository,
										MessageRepository messageRepository,
										ConversationRepository conversationRepository,
										FriendRequestRepository friendRequestRepository) {
		return args -> {
			userRepository.save(
					User.builder()
							.userName("user1")
							.fullName("user full name 1")
							.build());
			userRepository.save(
					User.builder()
							.userName("user2")
							.fullName("user full name 2")
							.build());
			userRepository.save(
					User.builder()
							.userName("user3")
							.fullName("user full name 3")
							.build());

			List<User> users = userRepository.findAll();
			FriendRequest firstToSecond = FriendRequest.builder().from(users.get(0)).to(users.get(1)).build();
			friendRequestRepository.save(firstToSecond);

			Conversation conversation = new Conversation();
			conversation.getParticipants().add(users.get(0));
			conversation.getParticipants().add(users.get(2));

			conversation.getMessages().add(
					Message.builder()
							.content("message1")
							.sender(users.get(0))
							.time(new Date())
							.build());

			conversation.getMessages().add(
					Message.builder()
							.content("message2")
							.sender(users.get(2))
							.time(new Date())
							.build());

			conversation.getMessages().add(
					Message.builder()
							.content("message3")
							.sender(users.get(0))
							.time(new Date())
							.build());

			messageRepository.saveAll(conversation.getMessages());
			conversationRepository.save(conversation);
			log.info("Finished inserting test data.");
		};
	}

}
