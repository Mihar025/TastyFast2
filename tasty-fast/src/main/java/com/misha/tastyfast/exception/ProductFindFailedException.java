package com.misha.tastyfast.exception;

public class ProductFindFailedException extends RuntimeException {
    public ProductFindFailedException(String msg) {
        super(msg);
    }
}
