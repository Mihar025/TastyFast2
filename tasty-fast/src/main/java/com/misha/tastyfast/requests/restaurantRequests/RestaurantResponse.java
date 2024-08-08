package com.misha.tastyfast.requests.restaurantRequests;
import com.misha.tastyfast.feedback.req.FeedBackResponse;
import com.misha.tastyfast.requests.dishesRequests.DishesResponse;
import com.misha.tastyfast.requests.drinkRequests.DrinksResponse;
import com.misha.tastyfast.requests.orderRequests.OrderResponse;
import lombok.*;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RestaurantResponse {

    private Integer restaurantId;
    private String restaurantName;
    private String address;
    private String phoneNumber;
    private String email;
    private String description;
    private String openingHours;
    private Double rating;
    private String cuisineType;
    private boolean isActive;
    private Integer seatingCapacity;
    private Boolean deliveryAvailable;
    private String websiteUrl;
    private Integer ownerId;
    private String logoUrl;

    private List<DishesResponse> dishesResponses;
    private List<DrinksResponse> drinksResponses;
    private List<FeedBackResponse> feedBackResponses;
    private List<OrderResponse> orderResponses;

}
