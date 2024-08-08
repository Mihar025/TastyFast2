package com.misha.tastyfast.requests.productRequests;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {
    private Integer id;
    private String productName;
    private String productDescription;
    private BigDecimal price;
    private BigDecimal calories;
    private boolean inStock;
    private Integer storeId;
    private Integer ownerId;
    private double rating;
    private String logo;
    private Integer quantity;

}
