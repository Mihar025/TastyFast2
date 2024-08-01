package com.misha.tastyfast.requests.userSettingsRequests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class PasswordChangeRequest {


    @NotBlank(message = "New password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String newPassword;

    public PasswordChangeRequest(String newPassword) {
        this.newPassword = newPassword;
    }
}
