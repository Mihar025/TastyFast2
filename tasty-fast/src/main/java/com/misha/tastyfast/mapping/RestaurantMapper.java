package com.misha.tastyfast.mapping;

import com.misha.tastyfast.model.Restaurant;
import com.misha.tastyfast.model.User;
import com.misha.tastyfast.requests.restaurantRequests.RestaurantRequest;
import com.misha.tastyfast.requests.restaurantRequests.RestaurantResponse;
import org.springframework.stereotype.Service;

@Service
public class RestaurantMapper {
    public Restaurant toRestaurant(RestaurantRequest request, User user) {
        return Restaurant.builder()
                .name(request.getRestaurantName())
                .address(request.getAddress())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .description(request.getDescription())
                .openingHours(request.getOpeningHours())
                .isActive(request.isActive())
                .seatingCapacity(request.getSeatingCapacity())
                .deliveryAvailable(request.isDeliveryAvailable())
                .websiteUrl(request.getWebsiteUrl())
                .owner(user)
                .cuisineType(request.getCuisineType())
                .build();
    }

    public RestaurantResponse toRestaurantResponse(Restaurant restaurant) {
        return RestaurantResponse.builder()
                .restaurantId(restaurant.getId())
                .restaurantName(restaurant.getName())
                .address(restaurant.getAddress())
                .phoneNumber(restaurant.getPhoneNumber())
                .email(restaurant.getEmail())
                .description(restaurant.getDescription())
                .openingHours(restaurant.getOpeningHours())
                .rating(restaurant.getRating())
                .cuisineType(restaurant.getCuisineType())
                .isActive(restaurant.isActive())
                .seatingCapacity(restaurant.getSeatingCapacity())
                .deliveryAvailable(restaurant.isDeliveryAvailable())
                .websiteUrl(restaurant.getWebsiteUrl())
                .logoUrl(restaurant.getLogoUrl())
                .ownerId(restaurant.getOwner().getId())
                .build();
    }

    public RestaurantResponse toPublicRestaurantResponse(Restaurant restaurant) {
        return RestaurantResponse.builder()
                .restaurantName(restaurant.getName())
                .address(restaurant.getAddress())
                .phoneNumber(restaurant.getPhoneNumber())
                .email(restaurant.getEmail())
                .description(restaurant.getDescription())
                .openingHours(restaurant.getOpeningHours())
                .rating(restaurant.getRating())
                .cuisineType(restaurant.getCuisineType())
                .seatingCapacity(restaurant.getSeatingCapacity())
                .deliveryAvailable(restaurant.isDeliveryAvailable())
                .websiteUrl(restaurant.getWebsiteUrl())
                .build();
    }
}
