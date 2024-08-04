package com.misha.tastyfast.requests.drinkRequests;

import java.math.BigDecimal;

public record DrinkRequestForRestaurant(
        String  drinkName,

        String drinkDescription,
        String logo,
        BigDecimal price,
        BigDecimal calories,
        String category,
        boolean inStock,
        boolean isAlcohol
) {


}
