package com.chatapp.api.dto;

import com.chatapp.storage.data.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
	private Long id;
	private String userName;
	private String fullName;
	private String email;

	public static UserDTO toDTO(User user) {
		return new UserDTO(user.getId(), user.getUsername(), user.getFullName(), user.getEmail());
	}

	public static List<UserDTO> toDTOs (List<User> user) {
		return user.stream().map(UserDTO::toDTO).collect(Collectors.toList());
	}
}
