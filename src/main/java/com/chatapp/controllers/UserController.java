package com.chatapp.controllers;

import com.chatapp.api.dto.UserDTO;
import com.chatapp.storage.repositories.UserRepository;
import lombok.extern.java.Log;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/user", produces = "application/json")
@CrossOrigin
@Log
public class UserController {
	private final UserRepository userRepository;

	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@GetMapping("/{userId}")
	public UserDTO getUser(@PathVariable Long userId) {
		return UserDTO.toDTO(userRepository.findById(userId).orElseThrow());
	}

	@GetMapping("/currentUser")
	public UserDTO getCurrentUser(Authentication authentication) {
		return UserDTO.toDTO(userRepository.findByUserName(authentication.getName()));
	}
}
