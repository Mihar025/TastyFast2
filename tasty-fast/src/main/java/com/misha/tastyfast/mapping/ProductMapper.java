package com.misha.tastyfast.mapping;

import com.misha.tastyfast.model.Product;
import com.misha.tastyfast.requests.productRequests.ProductRequest;
import com.misha.tastyfast.requests.productRequests.ProductResponse;
import org.springframework.stereotype.Service;

@Service
public class ProductMapper {


    public Product toProduct(ProductRequest request) {
        return Product.builder()
                .id(request.id())
                .productName(request.productName())
                .productDescription(request.productDescription())
                .price(request.price())
                .calories(request.calories())
                .inStock(request.inStock())
                .quantity(request.quantity())
                .logo(request.logo())
                .build();
    }


    public ProductResponse toProductResponse(Product product) {
            return  ProductResponse.builder()
                    .id(product.getId())
                    .productName(product.getProductName())
                    .productDescription(product.getProductDescription())
                    .price(product.getPrice())
                    .calories(product.getCalories())
                    .ownerId(product.getOwner().getId())
                    .inStock(product.isInStock())
                    .rating(product.getRate())
                    .storeId(product.getStore().getId())
                    .quantity(product.getQuantity())
                    .logo(product.getLogo())
                    .build();
    }


}
