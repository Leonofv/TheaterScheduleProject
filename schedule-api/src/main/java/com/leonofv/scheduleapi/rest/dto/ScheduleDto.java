package com.leonofv.scheduleapi.rest.dto;

import java.time.ZonedDateTime;

public record ScheduleDto(String id, String description, ScheduleDto.UserDto user, ZonedDateTime createdAt) {

    public record UserDto(String username) {
    }
}
