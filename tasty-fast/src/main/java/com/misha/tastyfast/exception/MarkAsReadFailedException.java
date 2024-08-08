package com.misha.tastyfast.exception;

public class MarkAsReadFailedException extends RuntimeException {
    public MarkAsReadFailedException(String msg) {
        super(msg);
    }
}
