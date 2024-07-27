package com.misha.tastyfast.requests.storeRequests;

import com.misha.tastyfast.feedback.req.FeedBackResponse;
import com.misha.tastyfast.requests.drinkRequests.DrinksResponse;
import com.misha.tastyfast.requests.orderRequests.OrderResponse;
import com.misha.tastyfast.requests.productRequests.ProductResponse;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StoreResponse {
    private Integer id;
    private String storeName;
    private String address;
    private String phoneNumber;
    private String email;
    private String description;
    private String openingHours;
    private Double rating;
    private boolean isActive;
    private Boolean deliveryAvailable;
    private String websiteUrl;
    private Integer ownerId;
    private byte[] logoUrl;

    private List<ProductResponse> productResponses;
    private List<DrinksResponse> drinksResponses;
    private List<FeedBackResponse> feedBackResponses;
    private List<OrderResponse> orderResponses;

}
