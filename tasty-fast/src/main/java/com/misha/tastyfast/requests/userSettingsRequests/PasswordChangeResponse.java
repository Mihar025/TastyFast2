package com.misha.tastyfast.requests.userSettingsRequests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PasswordChangeResponse {
    private String message;
    private LocalDateTime timestamp;
}