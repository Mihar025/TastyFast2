package com.misha.tastyfast.mapping;

import com.misha.tastyfast.feedback.req.FeedBackResponse;
import com.misha.tastyfast.model.*;
import com.misha.tastyfast.requests.dishesRequests.DishesResponse;
import com.misha.tastyfast.requests.drinkRequests.DrinksResponse;
import com.misha.tastyfast.requests.orderRequests.OrderItemResponse;
import com.misha.tastyfast.requests.orderRequests.OrderResponse;
import com.misha.tastyfast.requests.restaurantRequests.RestaurantRequest;
import com.misha.tastyfast.requests.restaurantRequests.RestaurantResponse;
import com.misha.tastyfast.services.FileUtils;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.util.FileUtil;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class RestaurantMapper {
    public Restaurant toRestaurant(RestaurantRequest request, User user) {
        Restaurant restaurant = Restaurant.builder()
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
                .logo(request.getLogo())
                .build();


        return restaurant;
    }
    public RestaurantResponse toRestaurantResponse(Restaurant restaurant) {
        RestaurantResponse response = RestaurantResponse.builder()
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
                .logoUrl(restaurant.getLogo())
                .ownerId(restaurant.getOwner().getId())
                .dishesResponses(mapToDishesResponse(restaurant.getDishes()))
                .drinksResponses(mapToDrinkResponse(restaurant.getDrinks()))
                .orderResponses(mapToOrderResponse(restaurant.getOrders()))
                .feedBackResponses(mapToFeedBackResponse(restaurant.getFeedbacks()))
                .build();
        return response;
    }


    public RestaurantResponse toCreateRestaurantResponse(Restaurant restaurant) {
        RestaurantResponse response = RestaurantResponse.builder()
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
                .logoUrl(restaurant.getLogo())
                .ownerId(restaurant.getOwner().getId())
                .build();
        return response;
    }










    private List<FeedBackResponse> mapToFeedBackResponse(List<Feedback> feedbacks) {
        return feedbacks.stream().map(feedback -> FeedBackResponse.builder()
                .note(feedback.getNote())
                .comment(feedback.getComment())
                .build()).collect(Collectors.toList());
    }

    private List<OrderResponse> mapToOrderResponse(List<Order> orders) {
        return orders.stream().map(order -> OrderResponse.builder()
                .id(order.getId())
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .items(order.getOrderItems().stream().map(orderItem -> OrderItemResponse.builder()
                        .itemName(orderItem.getItemName())
                        .itemType(orderItem.getItemType())
                        .quantity(orderItem.getQuantity())
                        .price(orderItem.getPrice())
                        .build()).collect(Collectors.toList()))
                .build())
                .collect(Collectors.toList());
    }

    private List<DrinksResponse> mapToDrinkResponse(List<Drink> drinks) {
        return drinks.stream().map(drink -> DrinksResponse.builder()
                .id(drink.getId())
                .drinkName(drink.getDrinksName())
                .drinkDescription(drink.getDrinksName())
                .price(drink.getPrice())
                .calories(drink.getCalories())
                .quantity(drink.getQuantity())
                .rate(drink.getRate())
                .build()).collect(Collectors.toList());
    }

    private List<DishesResponse> mapToDishesResponse(List<Dishes> dishes) {
        return dishes.stream().map(dish -> DishesResponse.builder()
                .id(dish.getId())
                .dishesName(dish.getDishesName())
                .dishesDescription(dish.getDishesDescription())
                .price(dish.getPrice())
                .calories(dish.getCalories())
                .quantity(dish.getQuantity())
                .rate(dish.getRate())
                .build()).collect(Collectors.toList());
    }


    public RestaurantResponse toPublicRestaurantResponse(Restaurant restaurant) {
        RestaurantResponse response = RestaurantResponse.builder()
                .restaurantId(restaurant.getId())
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
                .dishesResponses(mapToDishesResponse(restaurant.getDishes()))
                .drinksResponses(mapToDrinkResponse(restaurant.getDrinks()))
                .orderResponses(mapToOrderResponse(restaurant.getOrders()))
                .feedBackResponses(mapToFeedBackResponse(restaurant.getFeedbacks()))
                .build();
        return response;
    }
}
