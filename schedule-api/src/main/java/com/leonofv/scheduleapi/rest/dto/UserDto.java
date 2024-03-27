package com.leonofv.scheduleapi.rest.dto;

import java.time.ZonedDateTime;
import java.util.List;

public record UserDto(Long id, String username, String firstName, String fatherName, String lastName, String phoneNumber, String email, boolean isEmailSubscribed,
                      String password, String role, boolean isActive, List<ScheduleDto> schedules) {

    public record ScheduleDto(String id, String description, ZonedDateTime createdAt) {
    }
}
