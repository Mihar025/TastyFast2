package com.misha.tastyfast.exception;

public class OrderCreatingFailedException extends RuntimeException {
    public OrderCreatingFailedException(String msg) {
        super(msg);
    }
}
