package com.leonofv.scheduleapi.rest.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateScheduleRequest {

    @NotBlank
    private String description;
}
