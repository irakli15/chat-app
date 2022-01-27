package com.chatapp.storage.repositories;

import com.chatapp.storage.data.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
