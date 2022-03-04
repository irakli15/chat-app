package com.chatapp.controllers;

import com.chatapp.security.RegistrationForm;
import com.chatapp.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/register")
public class RegistrationController {

	private final UserService userService;
	private final PasswordEncoder passwordEncoder;

	public RegistrationController(UserService userService, PasswordEncoder passwordEncoder) {
		this.userService = userService;
		this.passwordEncoder = passwordEncoder;
	}

	@GetMapping
	public String getRegistrationForm() {
		return "registrationForm";
	}

	@PostMapping
	public String registerUser(RegistrationForm form) {
		if (form.getUserName().isEmpty() || form.getPassword().isEmpty()) {
			throw new IllegalStateException("Required fields are not filled");
		}
		userService.addNewUser(form.toUser(passwordEncoder));

		return "redirect:chat";
	}
}
