package com.leonofv.scheduleapi.rest.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateUserRequest {

    @NotBlank
    private String firstName;

    @NotBlank
    private String fatherName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String username;

    @NotBlank
    private String phoneNumber;

    @Email
    private String email;

    @NotBlank
    private String password;
}
