package com.chatapp.storage.repositories;

import com.chatapp.storage.data.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Long> {

	@Query("SELECT u FROM User u WHERE u.id NOT IN :allParticipants AND u.userName LIKE %:searchTerm%")
	List<User> findNotContactedUsers(Set<Long> allParticipants, String searchTerm);

	@Query("SELECT u FROM User u WHERE u.userName = :userName")
	User getByUserName(String userName);

	boolean existsByUserName(String userName);
}
