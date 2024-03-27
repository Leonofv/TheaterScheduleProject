package com.leonofv.scheduleapi.mapper;

import com.leonofv.scheduleapi.model.Schedule;
import com.leonofv.scheduleapi.rest.dto.CreateScheduleRequest;
import com.leonofv.scheduleapi.rest.dto.ScheduleDto;

public interface ScheduleMapper {

    ScheduleDto toScheduleDto(Schedule Schedule);

    Schedule toSchedule(CreateScheduleRequest createScheduleRequest);
}
