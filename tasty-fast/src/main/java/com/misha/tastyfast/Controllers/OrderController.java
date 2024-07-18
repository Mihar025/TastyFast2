package com.misha.tastyfast.Controllers;

import com.misha.tastyfast.model.Order;
import com.misha.tastyfast.model.User;
import com.misha.tastyfast.requests.orderRequests.OrderDetailsResponse;
import com.misha.tastyfast.requests.orderRequests.OrderItemResponse;
import com.misha.tastyfast.requests.orderRequests.OrderRequest;
import com.misha.tastyfast.requests.orderRequests.OrderResponse;
import com.misha.tastyfast.requests.pageResponse.PageResponse;
import com.misha.tastyfast.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest, Authentication authentication) {
        OrderResponse createdOrder = orderService.createOrder(orderRequest, authentication);
        return ResponseEntity.ok(createdOrder);
    }

    @PostMapping("/from-cart")
    public ResponseEntity<OrderResponse> createOrderFromCart(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        OrderResponse orderResponse = orderService.createOrderFromCart(user);
        return ResponseEntity.ok(orderResponse);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Integer orderId, Authentication authentication) {
        Order order = orderService.getOrderById(orderId, authentication);
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public ResponseEntity<PageResponse<OrderResponse>> getUserOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        PageResponse<OrderResponse> response = orderService.getUserOrders(page, size, authentication);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/{orderId}/details")
    public ResponseEntity<OrderDetailsResponse> getOrderDetails(@PathVariable Integer orderId) {
        OrderDetailsResponse orderDetails = orderService.getOrderDetails(orderId);
        return ResponseEntity.ok(orderDetails);
    }
}