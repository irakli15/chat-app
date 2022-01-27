package com.chatapp.storage.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String userName;
	private String fullName;
	private String email;
	private String password;

	@OneToMany(mappedBy = "id", fetch = FetchType.EAGER)
	private List<FriendRequest> sentFriendRequests;

	@OneToMany(mappedBy = "id", fetch = FetchType.EAGER)
	private List<FriendRequest> receivedFriendRequests;

	@ManyToMany
	private List<User> friends;
}
