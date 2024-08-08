package com.misha.tastyfast.exception;

public class CartItemAddFailedException extends RuntimeException {
    public CartItemAddFailedException(String msg) {
        super(msg);
    }
}
