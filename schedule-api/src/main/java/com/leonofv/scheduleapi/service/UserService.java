package com.leonofv.scheduleapi.service;

import com.leonofv.scheduleapi.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> getUsers();

    Optional<User> getUserByUsername(String username);

    boolean hasUserWithUsername(String username);

    boolean hasUserWithEmail(String email);

    User validateAndGetUserByUsername(String username);

    User saveUser(User user);

    User activateUserAccount(User user);

    User deactivateUserAccount(User user);

    User activateEmailNotification(User user);

    User deactivateEmailNotification(User user);

    User updateUser(User user);

    void deleteUser(User user);

}
