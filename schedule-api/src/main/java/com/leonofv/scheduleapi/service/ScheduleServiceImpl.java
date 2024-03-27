package com.leonofv.scheduleapi.service;

import com.leonofv.scheduleapi.model.Schedule;
import com.leonofv.scheduleapi.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;

    @Override
    public List<Schedule> getSchedules() {
        return  scheduleRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public List<Schedule> getSchedulesContainingText(String text) {
        return scheduleRepository.findByIdContainingOrDescriptionContainingIgnoreCaseOrderByCreatedAt(text, text);
    }

    @Override
    public Schedule validateAndGetOrder(String id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Order with id %s not found", id)));
    }

    @Override
    public Schedule saveSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    @Override
    public void deleteSchedule(Schedule schedule) {
        scheduleRepository.delete(schedule);
    }
}
