package com.leonofv.scheduleapi.service;

import com.leonofv.scheduleapi.model.Schedule;

import java.util.List;

public interface ScheduleService {

    List<Schedule> getSchedules();

    List<Schedule> getSchedulesContainingText(String text);

    Schedule validateAndGetOrder(String id);

    Schedule saveSchedule(Schedule schedules);

    void deleteSchedule(Schedule schedule);
}
