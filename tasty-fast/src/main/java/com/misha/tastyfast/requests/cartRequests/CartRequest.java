package com.misha.tastyfast.requests.cartRequests;

import com.misha.tastyfast.requests.cartRequests.CartItemRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CartRequest {
    @NotEmpty(message = "Cart items list must not be empty")
    @Valid
    private List<CartItemRequest> items;
}