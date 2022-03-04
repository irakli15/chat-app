package com.chatapp.security;

import com.chatapp.storage.data.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationForm {
	private String userName;
	private String fullName;
	private String email;
	private String password;

	public User toUser(PasswordEncoder passwordEncoder) {
		return User.builder()
				.userName(userName)
				.fullName(fullName)
				.email(email)
				.password(passwordEncoder.encode(password))
				.build();
	}
}
