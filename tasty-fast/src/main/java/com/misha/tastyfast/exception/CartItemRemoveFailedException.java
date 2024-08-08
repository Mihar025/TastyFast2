package com.misha.tastyfast.exception;

public class CartItemRemoveFailedException extends RuntimeException {
    public CartItemRemoveFailedException(String msg) {
        super(msg);
    }
}
