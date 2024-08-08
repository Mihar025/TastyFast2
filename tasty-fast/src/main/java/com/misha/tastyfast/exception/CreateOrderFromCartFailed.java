package com.misha.tastyfast.exception;

public class CreateOrderFromCartFailed extends RuntimeException {
    public CreateOrderFromCartFailed(String message) {
        super(message);
    }
}
