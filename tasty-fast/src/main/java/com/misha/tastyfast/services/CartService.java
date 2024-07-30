package com.misha.tastyfast.services;

import com.misha.tastyfast.mapping.CartMapper;
import com.misha.tastyfast.model.*;
import com.misha.tastyfast.repositories.CartRepository;
import com.misha.tastyfast.repositories.OrderRepository;
import com.misha.tastyfast.requests.cartRequests.CartItemRequest;
import com.misha.tastyfast.requests.cartRequests.CartItemResponse;
import com.misha.tastyfast.requests.cartRequests.CartRequest;
import com.misha.tastyfast.requests.cartRequests.CartResponse;
import com.misha.tastyfast.requests.dishesRequests.DishesResponse;
import com.misha.tastyfast.requests.drinkRequests.DrinksResponse;
import com.misha.tastyfast.requests.productRequests.ProductResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring6.util.SpringSelectedValueComparator;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartService {

    private final CartRepository cartRepository;
    private final CartMapper cartMapper;
    private final ProductService productService;
    private final DrinkService drinkService;
    private final DishesService dishesService;

    public CartResponse getCartForUser(User user) {
        Cart cart = getOrCreateCart(user);
        return cartMapper.toCartResponse(cart);
    }


    public CartResponse updatedCart(CartRequest cartRequest, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Cart cart = getOrCreateCart(user);
        cart.getCartItems().clear();
        for (CartItemRequest itemRequest : cartRequest.getItems()) {
            addItemToCart(itemRequest, connectedUser);
        }
        cart.setUpdatedAt(LocalDateTime.now());
        Cart updatedCart = cartRepository.save(cart);
        return cartMapper.toCartResponse(updatedCart);
    }


    public CartResponse removeItemFromCart(Integer itemId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Cart cart = getOrCreateCart(user);
        cart.getCartItems().removeIf(item -> item.getCartItem_id().equals(itemId));
        cart.setUpdatedAt(LocalDateTime.now());
        Cart updatedCart = cartRepository.save(cart);
        return cartMapper.toCartResponse(updatedCart);
    }

    @Transactional
    public CartResponse addItemToCart(CartItemRequest itemRequest, Authentication connectedUser) {
        log.debug("Adding item to cart: {}", itemRequest);

        if (itemRequest.getItemId() == null || itemRequest.getItemType() == null) {
            log.error("Attempt to add item with null ID or type: {}", itemRequest);
            throw new IllegalArgumentException("Item ID and type must not be null");
        }

        User user = ((User) connectedUser.getPrincipal());
        Cart cart = getOrCreateCart(user);

        CartItem cartItem = findOrCreateCartItem(cart, itemRequest);
        updateCartItemQuantity(cartItem, itemRequest.getQuantity());
        setItemDetails(cartItem, itemRequest, connectedUser);

        cart.setUpdatedAt(LocalDateTime.now());
        Cart updatedCart = cartRepository.save(cart);
        return cartMapper.toCartResponse(updatedCart);
    }

    private CartItem findOrCreateCartItem(Cart cart, CartItemRequest itemRequest) {
        return cart.getCartItems().stream()
                .filter(item -> item.getItemId().equals(itemRequest.getItemId())
                        && item.getItemType().equals(itemRequest.getItemType()))
                .findFirst()
                .orElseGet(() -> {
                    CartItem newItem = new CartItem();
                    newItem.setCart(cart);
                    newItem.setItemType(itemRequest.getItemType());
                    newItem.setItemId(itemRequest.getItemId());
                    cart.getCartItems().add(newItem);
                    return newItem;
                });
    }

    @Transactional
    public void clearCart(User user) {
        Cart cart = getOrCreateCart(user);
        cart.getCartItems().clear();
        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);
    }

    public OrderItem createOrderItemFromCartItem(CartItemResponse cartItemResponse, Order order) {
        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setItemName(cartItemResponse.getItemName());
        orderItem.setItemType(cartItemResponse.getItemType());
        orderItem.setId(cartItemResponse.getItemId());
        orderItem.setQuantity(cartItemResponse.getQuantity());
        orderItem.setPrice(cartItemResponse.getPrice());
        return orderItem;
    }


    private Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setCreatedAt(LocalDateTime.now());
        cart.setUpdatedAt(LocalDateTime.now());
        return cartRepository.save(cart);
    }

    private Cart getOrCreateCart(User user) {
        return user.getCart() != null ? user.getCart() : createCart(user);
    }


    private void setItemDetails(CartItem cartItem, CartItemRequest itemRequest, Authentication connectedUser) {
        try {
            switch (itemRequest.getItemType()) {
                case "PRODUCT":
                    ProductResponse product = productService.findProductById(itemRequest.getItemId(), connectedUser);
                    cartItem.setItemName(product.getProductName());
                    cartItem.setPrice(product.getPrice());
                    break;
                case "DISH":
                    DishesResponse dish = dishesService.findDishesById(itemRequest.getItemId(), connectedUser);
                    cartItem.setItemName(dish.getDishesName());
                    cartItem.setPrice(dish.getPrice());
                    break;
                case "DRINK":
                    DrinksResponse drink = drinkService.findDrinkById(itemRequest.getItemId(), connectedUser);
                    cartItem.setItemName(drink.getDrinkName());
                    cartItem.setPrice(drink.getPrice());
                    break;
                default:
                    throw new IllegalArgumentException("Invalid item type: " + itemRequest.getItemType());
            }
        } catch (Exception e) {
            log.error("Error setting item details for item: {}", itemRequest, e);
            throw new RuntimeException("Failed to set item details", e);
        }
    }


    private CartItem findCartItem(Cart cart, String itemType, Integer itemId) {
        return cart.getCartItems().stream()
                .filter(item -> item.getItemType().equals(itemType) && item.getItemId().equals(itemId))
                .findFirst()
                .orElse(null);
    }

    private void updateCartItemQuantity(CartItem cartItem, int additionalQuantity) {
        cartItem.setQuantity(cartItem.getQuantity() + additionalQuantity);
    }





}
