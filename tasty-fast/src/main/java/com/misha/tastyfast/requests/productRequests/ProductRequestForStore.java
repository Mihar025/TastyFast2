package com.misha.tastyfast.requests.productRequests;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductRequestForStore {
    private String productName;
    private String productDescription;
    private BigDecimal price;
    private BigDecimal calories;
    private boolean inStock;
    private Integer storeId;

}