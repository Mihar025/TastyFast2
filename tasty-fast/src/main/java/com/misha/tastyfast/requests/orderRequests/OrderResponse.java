package com.misha.tastyfast.requests.orderRequests;

import com.misha.tastyfast.requests.orderRequests.OrderItemResponse;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
@Data
@Builder
public class OrderResponse {
    private Integer id;
    private LocalDateTime orderDate;
    private String status;
    private BigDecimal totalAmount;
    private List<OrderItemResponse> items;
}
