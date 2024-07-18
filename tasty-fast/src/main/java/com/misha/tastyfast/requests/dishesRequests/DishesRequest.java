package com.misha.tastyfast.requests.dishesRequests;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DishesRequest(
        Integer id,
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String dishesName,
        @NotNull(message = "101")
        @NotEmpty(message = "101")
        String dishesDescription,
        @NotNull(message = "102")
        @NotEmpty(message = "102")
        BigDecimal price,
        @NotNull(message = "103")
        @NotEmpty(message = "103")
        BigDecimal calories,

        boolean inStock,

        String category,
        Integer quantity

) {
}
