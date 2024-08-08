package com.misha.tastyfast.exception;

public class UserUpdatingFailedException extends RuntimeException {
    public UserUpdatingFailedException(String msg) {
        super(msg);
    }
}
