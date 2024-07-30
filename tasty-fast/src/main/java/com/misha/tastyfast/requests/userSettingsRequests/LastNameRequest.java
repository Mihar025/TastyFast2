package com.misha.tastyfast.requests.userSettingsRequests;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class LastNameRequest {
    private String lastName;

    public LastNameRequest(String lastName) {
        this.lastName = lastName;
    }
}
