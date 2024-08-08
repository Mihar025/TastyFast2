package com.misha.tastyfast.requests.productRequests;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ProductRequest (
        Integer id,
         @NotNull(message = "100")
         @NotEmpty(message = "100")
         String productName,
        @NotNull(message = "101")
        @NotEmpty(message = "101")
        String productDescription,
        @NotNull(message = "102")
        @NotEmpty(message = "102")
        BigDecimal price,
        @NotNull(message = "103")
        @NotEmpty(message = "103")
        BigDecimal calories,
         boolean inStock,
        Integer quantity,
         String logo


) {
}
