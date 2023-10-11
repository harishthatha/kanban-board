package com.kanbanboard.controller;

import com.kanbanboard.config.UserAuthenticationProvider;
import com.kanbanboard.dto.UserDto;
import com.kanbanboard.exception.UserNotFoundException;
import com.kanbanboard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private  UserAuthenticationProvider userAuthenticationProvider;

    @GetMapping
    public ResponseEntity<List<UserDto>> getUsers(){
        List<UserDto> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable int id) throws UserNotFoundException {
       Optional<UserDto> user = userService.getUser(id);
        return ResponseEntity.ok(user.orElse(null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable int id, @RequestBody UserDto updatedUserDto) throws UserNotFoundException {
        Optional<UserDto> updatedUser = userService.updateUser(id, updatedUserDto);
        return ResponseEntity.ok(updatedUser.orElse(null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) throws UserNotFoundException {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto) {
        UserDto newUser = userService.addUser(userDto);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody UserDto userDto) {
        UserDto user = userService.login(userDto);
        user.setToken(userAuthenticationProvider.createToken(userDto.getEmail(),user.getUserId()));
        return ResponseEntity.ok(user);
    }

}
