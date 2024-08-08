package com.misha.tastyfast.exception;

public class CreateOrderFailedException extends RuntimeException {
    public CreateOrderFailedException(String msg) {
        super(msg);
    }
}
