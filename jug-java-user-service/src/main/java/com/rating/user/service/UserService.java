package com.rating.user.service;

import com.rating.user.entity.UserEntity;
import com.rating.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity createUser(UserEntity user) {
        log.info("Creating user: {}", user.getEmail());
        return userRepository.save(user);
    }

    public Optional<UserEntity> getUserById(Long id) {
        log.info("Fetching user by id: {}", id);
        return userRepository.findById(id);
    }

    public Optional<UserEntity> getUserByEmail(String email) {
        log.info("Fetching user by email: {}", email);
        return userRepository.findByEmail(email);
    }

    public List<UserEntity> getAllUsers() {
        log.info("Fetching all users");
        return userRepository.findAll();
    }

    public UserEntity updateUser(Long id, UserEntity updatedUser) {
        log.info("Updating user: {}", id);
        return userRepository.findById(id)
            .map(user -> {
                user.setFirstName(updatedUser.getFirstName());
                user.setLastName(updatedUser.getLastName());
                user.setEmail(updatedUser.getEmail());
                user.setAge(updatedUser.getAge());
                user.setPhoneNumber(updatedUser.getPhoneNumber());
                user.setStatus(updatedUser.getStatus());
                return userRepository.save(user);
            })
            .orElseThrow(() -> new RuntimeException("User not found: " + id));
    }

    public void deleteUser(Long id) {
        log.info("Deleting user: {}", id);
        userRepository.deleteById(id);
    }
}
