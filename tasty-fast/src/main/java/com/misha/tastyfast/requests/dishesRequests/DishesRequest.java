package com.misha.tastyfast.requests.dishesRequests;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DishesRequest(
        Integer id,

        String dishesName,

        String dishesDescription,

        BigDecimal price,

        BigDecimal calories,

        boolean inStock,
        String logo,
        String category,
        Integer quantity

) {
}
