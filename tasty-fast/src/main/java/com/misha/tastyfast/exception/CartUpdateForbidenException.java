package com.misha.tastyfast.exception;

public class CartUpdateForbidenException extends RuntimeException{
    public CartUpdateForbidenException(String msg) {
        super(msg);
    }
}
