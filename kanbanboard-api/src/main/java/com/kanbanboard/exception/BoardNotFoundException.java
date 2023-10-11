package com.kanbanboard.exception;

import org.springframework.http.HttpStatus;

public class BoardNotFoundException extends BaseException {

    public BoardNotFoundException(String message) {
        super(message);
    }

    public BoardNotFoundException(String message, HttpStatus status) {
        super(message, status);
    }
}
