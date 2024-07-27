package com.misha.tastyfast.requests.userSettingsRequests;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class EmailRequest {
    private String email;

    public EmailRequest(String email) {
        this.email = email;
    }
}
