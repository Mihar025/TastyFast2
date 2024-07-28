package com.misha.tastyfast.requests.cartRequests;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class CartItemRequest {

    @NotNull(message = "Item type must not be null")
    private String itemType;

    @NotNull(message = "Item ID must not be null")
    private Integer itemId;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
}