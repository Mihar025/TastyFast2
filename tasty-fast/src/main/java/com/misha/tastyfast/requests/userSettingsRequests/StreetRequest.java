package com.misha.tastyfast.requests.userSettingsRequests;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class StreetRequest {
    private String streetRequest;

    public StreetRequest(String streetRequest) {
        this.streetRequest = streetRequest;
    }
}
