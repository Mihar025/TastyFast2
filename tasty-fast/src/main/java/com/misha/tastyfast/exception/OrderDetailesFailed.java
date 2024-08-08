package com.misha.tastyfast.exception;

public class OrderDetailesFailed extends RuntimeException {
    public OrderDetailesFailed(String message) {
        super(message);
    }
}
