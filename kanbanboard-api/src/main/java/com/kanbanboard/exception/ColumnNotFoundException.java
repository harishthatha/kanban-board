package com.kanbanboard.exception;

import org.springframework.http.HttpStatus;

public class ColumnNotFoundException extends BaseException {

    public ColumnNotFoundException(String message) {
        super(message);
    }

    public ColumnNotFoundException(String message, HttpStatus status) {
        super(message, status);
    }
}
