package com.kanbanboard.exception;

import org.springframework.http.HttpStatus;

public class CardNotFoundException extends BaseException {

    public CardNotFoundException(String message) {
        super(message);
    }

    public CardNotFoundException(String message, HttpStatus status) {
        super(message, status);
    }
}
