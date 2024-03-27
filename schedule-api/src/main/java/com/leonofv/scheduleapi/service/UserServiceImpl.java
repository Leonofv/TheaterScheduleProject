package com.leonofv.scheduleapi.service;

import com.leonofv.scheduleapi.model.User;
import com.leonofv.scheduleapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean hasUserWithUsername(String username) {
        return userRepository.existsByUsername(username);
    }


    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User validateAndGetUserByUsername(String username) {
        return getUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User with username %s not found", username)));
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User activateUserAccount(User user) {
        user.setActive(true);
        return userRepository.save(user);
    }

    @Override
    public User deactivateUserAccount(User user) {
        user.setActive(false);
        return userRepository.save(user);
    }

    @Override
    public User activateEmailNotification(User user) {
        user.setEmailSubscribed(true);
        return userRepository.save(user);
    }

    @Override
    public User deactivateEmailNotification(User user) {
        user.setEmailSubscribed(false);
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public User updateUser(User user) {
        user.setEmail(user.getEmail());
        user.setPhoneNumber(user.getPhoneNumber());
        user.setPassword(user.getPassword());
       return userRepository.save(user);
    }

}
