package com.misha.tastyfast.requests.favoriteRequests;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FavoriteItemResponse {
    private Integer id;
    private String type;
    private Integer itemId;
    private String name;



}
