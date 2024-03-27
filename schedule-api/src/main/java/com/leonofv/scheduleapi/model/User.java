package com.leonofv.scheduleapi.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "phone_number")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String fatherName;
    private String lastName;
    private String username;
    private String phoneNumber;
    private String email;
    private boolean isEmailSubscribed;
    private String password;
    private String role;
    private boolean isActive;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Schedule> schedules = new ArrayList<>();

    public User(
            String firstName,
            String fatherName,
            String lastName,
            String username,
            String phoneNumber,
            String email,
            boolean isEmailSubscribed,
            String password,
            String role,
            boolean isActive) {
        this.firstName = firstName;
        this.fatherName = fatherName;
        this.lastName = lastName;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.isEmailSubscribed = isEmailSubscribed;
        this.password = password;
        this.role = role;
        this.isActive = isActive;
    }
}
