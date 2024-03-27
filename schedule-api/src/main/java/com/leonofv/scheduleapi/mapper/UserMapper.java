package com.leonofv.scheduleapi.mapper;

import com.leonofv.scheduleapi.model.User;
import com.leonofv.scheduleapi.rest.dto.CreateUserRequest;
import com.leonofv.scheduleapi.rest.dto.UserDto;

public interface UserMapper {

    UserDto toUserDto(User user);

    User toUser(CreateUserRequest createUserRequest);
}
