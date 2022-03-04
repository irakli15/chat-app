package com.chatapp.service;

import com.chatapp.storage.data.User;
import com.chatapp.storage.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public void addNewUser(User user) {
		if (userRepository.existsByUserName(user.getUsername())) {
			throw new IllegalStateException("User with user name " + user.getUsername() + " already exists");
		}
		userRepository.save(user);
	}
}
