package com.misha.tastyfast.exception;

public class BusinessNotFoundException extends RuntimeException {
    public BusinessNotFoundException(String msg) {
        super(msg);
    }
}
