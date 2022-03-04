package com.chatapp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/")
public class HomeController {
	@GetMapping()
	public String redirectToChat() {
		return "redirect:chat";
	}

	@GetMapping("chat")
	public String index() {
		return "chat";
	}
}
