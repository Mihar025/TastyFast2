package com.misha.tastyfast.mapping;

import com.misha.tastyfast.feedback.req.FeedBackResponse;
import com.misha.tastyfast.model.*;
import com.misha.tastyfast.requests.drinkRequests.DrinksResponse;
import com.misha.tastyfast.requests.orderRequests.OrderItemResponse;
import com.misha.tastyfast.requests.orderRequests.OrderResponse;
import com.misha.tastyfast.requests.productRequests.ProductResponse;
import com.misha.tastyfast.requests.storeRequests.StoreRequest;
import com.misha.tastyfast.requests.storeRequests.StoreResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StoreMapper {

    public Store toStore(StoreRequest request, User user){
        return Store.builder()
                .name(request.getStoreName())
                .address(request.getAddress())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .description(request.getDescription())
                .openingHours(request.getOpeningHours())
                .isActive(request.isActive())
                .deliveryAvailable(request.isDeliveryAvailable())
                .websiteUrl(request.getWebsiteUrl())
                .owner(user)
                .logoUrl(request.getLogoUrl())
                .build();
    }

    public StoreResponse toStoreResponse(Store store){
        return StoreResponse.builder()
                .id(store.getId())
                .storeName(store.getName())
                .address(store.getAddress())
                .phoneNumber(store.getPhoneNumber())
                .email(store.getEmail())
                .description(store.getDescription())
                .openingHours(store.getOpeningHours())
                .rating(store.getRating())
                .isActive(store.isActive())
                .deliveryAvailable(store.isDeliveryAvailable())
                .websiteUrl(store.getWebsiteUrl())
                .ownerId(store.getOwner().getId())
                .logoUrl(store.getLogoUrl())
                .productResponses(mapToProductResponses(store.getProducts()))
                .drinksResponses(mapToDrinkResponses(store.getDrinks()))
                .orderResponses(mapToOrderResponses(store.getOrders()))
                .feedBackResponses(mapToFeedbackResponses(store.getFeedbacks()))
                .build();

    }

    private List<OrderResponse> mapToOrderResponses(List<Order> orders) {
        return orders.stream()
                .map(order -> OrderResponse.builder()
                        .id(order.getId())
                        .status(order.getStatus())
                        .orderDate(order.getOrderDate())
                        .totalAmount(order.getTotalAmount())
                        .items(order.getOrderItems().stream().map(items -> OrderItemResponse.builder()
                                .itemName(items.getItemName())
                                .itemType(items.getItemType())
                                .price(items.getPrice())
                                .quantity(items.getQuantity())
                                .build()).collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());

    }

    private List<FeedBackResponse> mapToFeedbackResponses(List<Feedback> feedbacks) {
        return feedbacks.stream().map(feedback -> FeedBackResponse.builder()
                        .note(feedback.getNote())
                        .comment(feedback.getComment())
                .build())
                .collect(Collectors.toList());
    }

    private List<DrinksResponse> mapToDrinkResponses(List<Drink> drinks) {
        return drinks.stream().map(drink -> DrinksResponse.builder()
                .drinkName(drink.getDrinksName())
                .drinkDescription(drink.getDrinksDescription())
                .price(drink.getPrice())
                .calories(drink.getCalories())
                .quantity(drink.getQuantity())
                .rate(drink.getRate())
                .build()).collect(Collectors.toList());
    }

    private List<ProductResponse> mapToProductResponses(List<Product> products) {
        return products.stream().map(
                product -> ProductResponse.builder()
                        .productName(product.getProductName())
                        .productDescription(product.getProductDescription())
                        .price(product.getPrice())
                        .calories(product.getCalories())
                        .quantity(product.getQuantity())
                        .rating(product.getRate())
                        .build())
                .collect(Collectors.toList());
    }

    public StoreResponse toPublicStoreResponse(Store store){
        return StoreResponse.builder()
                .storeName(store.getName())
                .address(store.getAddress())
                .phoneNumber(store.getPhoneNumber())
                .email(store.getEmail())
                .description(store.getDescription())
                .openingHours(store.getOpeningHours())
                .rating(store.getRating())
                .deliveryAvailable(store.isDeliveryAvailable())
                .websiteUrl(store.getWebsiteUrl())
                .build();


    }

}
