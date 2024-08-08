package com.misha.tastyfast.exception;

public class OrderFindFailedException extends RuntimeException {
    public OrderFindFailedException(String msg) {
        super(msg);
    }
}
