package com.kanbanboard.exception;

import org.springframework.http.HttpStatus;

public class UserNotFoundException extends BaseException{

    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(String message, HttpStatus status) {
        super(message,status);
    }
}
