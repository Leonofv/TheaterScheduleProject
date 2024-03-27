package com.leonofv.scheduleapi.mapper;

import com.leonofv.scheduleapi.model.Schedule;
import com.leonofv.scheduleapi.model.User;
import com.leonofv.scheduleapi.rest.dto.CreateUserRequest;
import com.leonofv.scheduleapi.rest.dto.UserDto;
import com.leonofv.scheduleapi.security.config.WebSecurityConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserMapperImpl implements UserMapper {

    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        List<UserDto.ScheduleDto> schedules = user.getSchedules().stream().map(this::toUserDtoScheduleDto).toList();
        return new UserDto(user.getId(), user.getUsername(), user.getFirstName(), user.getFatherName(), user.getLastName(), user.getPhoneNumber(), user.getEmail(), user.isEmailSubscribed(), user.getPassword(), user.getRole(), user.isActive(), schedules);
    }

    @Override
    public User toUser(CreateUserRequest createUserRequest) {
        if (createUserRequest == null) {
            return null;
        }
        return getUser(createUserRequest, passwordEncoder);
    }

    public static User getUser(CreateUserRequest createUserRequest, PasswordEncoder passwordEncoder) {
        User user = new User();
        user.setFirstName(createUserRequest.getFirstName());
        user.setFatherName(createUserRequest.getFatherName());
        user.setLastName(createUserRequest.getLastName());
        user.setUsername(createUserRequest.getUsername());
        user.setPhoneNumber(createUserRequest.getPhoneNumber());
        user.setEmail(createUserRequest.getEmail());
        user.setEmailSubscribed(false);
        user.setPassword(passwordEncoder.encode(createUserRequest.getPassword()));
        user.setRole(WebSecurityConfig.USER);
        user.setActive(true);
        return user;
    }

    private UserDto.ScheduleDto toUserDtoScheduleDto(Schedule schedule) {
        if (schedule == null) {
            return null;
        }
        return new UserDto.ScheduleDto(schedule.getId(), schedule.getDescription(), schedule.getCreatedAt());
    }
}
