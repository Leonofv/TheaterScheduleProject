package com.leonofv.scheduleapi.mapper;

import com.leonofv.scheduleapi.model.Schedule;
import com.leonofv.scheduleapi.rest.dto.CreateScheduleRequest;
import com.leonofv.scheduleapi.rest.dto.ScheduleDto;
import org.springframework.stereotype.Service;

@Service
public class ScheduleMapperImpl implements ScheduleMapper {

    @Override
    public Schedule toSchedule(CreateScheduleRequest createScheduleRequest) {
        if (createScheduleRequest == null) {
            return null;
        }
        return new Schedule(createScheduleRequest.getDescription());
    }

    @Override
    public ScheduleDto toScheduleDto(Schedule schedule) {
        if (schedule == null) {
            return null;
        }
        ScheduleDto.UserDto userDto = new ScheduleDto.UserDto(schedule.getUser().getUsername());
        return new ScheduleDto(schedule.getId(), schedule.getDescription(), userDto, schedule.getCreatedAt());
    }
}
