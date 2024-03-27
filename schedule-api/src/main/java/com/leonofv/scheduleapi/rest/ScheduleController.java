package com.leonofv.scheduleapi.rest;

import com.leonofv.scheduleapi.mapper.ScheduleMapper;
import com.leonofv.scheduleapi.model.Schedule;
import com.leonofv.scheduleapi.model.User;
import com.leonofv.scheduleapi.rest.dto.CreateScheduleRequest;
import com.leonofv.scheduleapi.rest.dto.ScheduleDto;
import com.leonofv.scheduleapi.security.CustomUserDetails;
import com.leonofv.scheduleapi.service.ScheduleService;
import com.leonofv.scheduleapi.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final UserService userService;
    private final ScheduleService scheduleService;
    private final ScheduleMapper orderMapper;

    @GetMapping
    public List<ScheduleDto> getOrders(@RequestParam(value = "text", required = false) String text) {
        List<Schedule> schedules = (text == null) ? scheduleService.getSchedules() : scheduleService.getSchedulesContainingText(text);
        return schedules.stream()
                .map(orderMapper::toScheduleDto)
                .collect(Collectors.toList());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ScheduleDto createSchedule(@AuthenticationPrincipal CustomUserDetails currentUser,
                                   @Valid @RequestBody CreateScheduleRequest createScheduleRequest) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Schedule schedule = orderMapper.toSchedule(createScheduleRequest);
        schedule.setId(UUID.randomUUID().toString());
        schedule.setUser(user);
        return orderMapper.toScheduleDto(scheduleService.saveSchedule(schedule));
    }

    @DeleteMapping("/{id}")
    public ScheduleDto deleteOrders(@PathVariable UUID id) {
        Schedule order = scheduleService.validateAndGetOrder(id.toString());
        scheduleService.deleteSchedule(order);
        return orderMapper.toScheduleDto(order);
    }
}
