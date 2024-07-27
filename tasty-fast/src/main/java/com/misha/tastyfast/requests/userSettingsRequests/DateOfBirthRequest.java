package com.misha.tastyfast.requests.userSettingsRequests;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
public class DateOfBirthRequest {
    @JsonFormat(pattern = "yyyy-MM:dd")
    private LocalDateTime dateOfBirth;

    public DateOfBirthRequest(LocalDateTime dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
}
