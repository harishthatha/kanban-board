package com.kanbanboard.exception;

import org.springframework.http.HttpStatus;

public class BaseException extends RuntimeException{
    private final HttpStatus status;

    public BaseException(String message) {
        super(message);
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public BaseException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
