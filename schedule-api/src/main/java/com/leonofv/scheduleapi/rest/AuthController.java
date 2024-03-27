package com.leonofv.scheduleapi.rest;

import com.leonofv.scheduleapi.mapper.UserMapper;
import com.leonofv.scheduleapi.model.User;
import com.leonofv.scheduleapi.rest.dto.AuthResponse;
import com.leonofv.scheduleapi.rest.dto.CreateUserRequest;
import com.leonofv.scheduleapi.rest.dto.LoginRequest;
import com.leonofv.scheduleapi.rest.dto.UserDto;
import com.leonofv.scheduleapi.security.CustomUserDetails;
import com.leonofv.scheduleapi.security.TokenProvider;
import com.leonofv.scheduleapi.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final UserMapper userMapper;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;

    @PostMapping("/authenticate")
    public AuthResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        String token = authenticateAndGetToken(loginRequest.getUsername(), loginRequest.getPassword());
        return new AuthResponse(token);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    public void createUser(@Valid @RequestBody CreateUserRequest createUserRequest) {

        if (userService.hasUserWithUsername(createUserRequest.getUsername())) {
            log.info(String.format("Username %s already been used", createUserRequest.getUsername()));
        }
        if (userService.hasUserWithEmail(createUserRequest.getEmail())) {
            log.error(String.format("Email %s already been used", createUserRequest.getEmail()));
        }

        userService.saveUser(userMapper.toUser(createUserRequest));
    }

    private String authenticateAndGetToken(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        return tokenProvider.generate(authentication);
    }
}
