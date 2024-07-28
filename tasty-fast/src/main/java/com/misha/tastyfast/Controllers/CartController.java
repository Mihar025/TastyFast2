package com.misha.tastyfast.Controllers;

import com.misha.tastyfast.model.User;
import com.misha.tastyfast.requests.cartRequests.CartItemRequest;
import com.misha.tastyfast.requests.cartRequests.CartRequest;
import com.misha.tastyfast.requests.cartRequests.CartResponse;
import com.misha.tastyfast.services.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("cart")
@RequiredArgsConstructor
@Slf4j
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponse> getCart(Authentication authentication) {
        CartResponse cart = cartService.getCartForUser((User) authentication.getPrincipal());
        return ResponseEntity.ok(cart);
    }

    @PutMapping
    public ResponseEntity<CartResponse> updateCart(@RequestBody CartRequest cartRequest, Authentication authentication) {
        CartResponse updatedCart = cartService.updatedCart(cartRequest, authentication);
        return ResponseEntity.ok(updatedCart);
    }

    @PostMapping("/items")
    public ResponseEntity<?> addItemToCart(@RequestBody CartItemRequest itemRequest, Authentication authentication) {
        log.debug("Received request to add item to cart: {}", itemRequest);
        try {
            CartResponse updatedCart = cartService.addItemToCart(itemRequest, authentication);
            return ResponseEntity.ok(updatedCart);
        } catch (IllegalArgumentException e) {
            log.error("Invalid request to add item to cart", e);
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            log.error("Error adding item to cart", e);
            return ResponseEntity.internalServerError().body("An error occurred while adding item to cart");
        }
    }
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> removeItemFromCart(@PathVariable Integer itemId, Authentication authentication) {
        CartResponse updatedCart = cartService.removeItemFromCart(itemId, authentication);
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        cartService.clearCart(user);
        return ResponseEntity.noContent().build();
    }


}
