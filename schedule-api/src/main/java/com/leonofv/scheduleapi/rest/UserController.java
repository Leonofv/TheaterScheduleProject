package com.leonofv.scheduleapi.rest;

import com.leonofv.scheduleapi.mapper.UserMapper;
import com.leonofv.scheduleapi.model.User;
import com.leonofv.scheduleapi.rest.dto.UserDto;
import com.leonofv.scheduleapi.security.CustomUserDetails;
import com.leonofv.scheduleapi.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/me") // Заменить адрес
    public UserDto getCurrentUser(@AuthenticationPrincipal CustomUserDetails currentUser) {
        return userMapper.toUserDto(userService.validateAndGetUserByUsername(currentUser.getUsername()));
    }

    @GetMapping
    public List<UserDto> getUsers() {
        return userService.getUsers().stream()
                .map(userMapper::toUserDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{username}")
    public UserDto getUser(@PathVariable String username) {
        return userMapper.toUserDto(userService.validateAndGetUserByUsername(username));
    }

    @DeleteMapping("/{username}")
    public UserDto deleteUser(@PathVariable String username) {
        User user = userService.validateAndGetUserByUsername(username);
        userService.deleteUser(user);
        return userMapper.toUserDto(user);
    }

    @PutMapping("/{username}")
    public UserDto updateUser(@PathVariable String username) {
        User user = userService.validateAndGetUserByUsername(username);
        userService.updateUser(user);
        return userMapper.toUserDto(user);
    }

    @PostMapping("/{username}/activate")
    public UserDto activateUserAccount(@PathVariable String username) {
        User user = userService.validateAndGetUserByUsername(username);
        userService.activateUserAccount(user);
        return userMapper.toUserDto(user);
    }

    @PostMapping("/{username}/deactivate")
    public UserDto deactivateUserAccount(@PathVariable String username) {
        User user = userService.validateAndGetUserByUsername(username);
        userService.deactivateUserAccount(user);
        return userMapper.toUserDto(user);
    }


}


