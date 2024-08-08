package com.misha.tastyfast.requests.userRequests;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserIdResponse {
    private Integer currentId;
}
