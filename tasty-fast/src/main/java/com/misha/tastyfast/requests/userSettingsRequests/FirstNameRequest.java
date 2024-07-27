package com.misha.tastyfast.requests.userSettingsRequests;

import lombok.*;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class FirstNameRequest {

    private String firstName;

    // Публичный конструктор с параметрами для использования билдера
    public FirstNameRequest(String firstName) {
        this.firstName = firstName;
    }
}
