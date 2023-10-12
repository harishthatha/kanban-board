package com.kanbanboard.serviceimpl;

import com.kanbanboard.config.UserAuthenticationProvider;
import com.kanbanboard.dto.UserDto;
import com.kanbanboard.exception.BaseException;
import com.kanbanboard.exception.UserNotFoundException;
import com.kanbanboard.repository.UserRepository;
import com.kanbanboard.entity.UserEntity;
import com.kanbanboard.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private  PasswordEncoder passwordEncoder;


    @Override
    public List<UserDto> getUsers() {
        List<UserEntity> users = userRepository.findAll();
        return users.stream().map(userEntity -> modelMapper.map(userEntity, UserDto.class)).collect(Collectors.toList());
    }

    @Override
    public Optional<UserDto> getUser(int id) throws UserNotFoundException {
        Optional<UserEntity> userEntity = userRepository.findById(id);
        if (userEntity.isEmpty()) throw new UserNotFoundException("User not found");
        else {
            return Optional.of(modelMapper.map(userEntity, UserDto.class));
        }
    }

    @Override
    public UserDto addUser(UserDto userDto) {
        userDto.setRole("ROLE_USER");
        UserEntity userEntity = modelMapper.map(userDto, UserEntity.class);
        UserEntity savedUserEntity = userRepository.save(userEntity);
        return modelMapper.map(savedUserEntity, UserDto.class);
    }

    @Override
    public Optional<UserDto> updateUser(int id, UserDto updatedUserDto) throws UserNotFoundException {
        Optional<UserEntity> existingUserEntity = userRepository.findById(id);
        if (existingUserEntity.isEmpty()) throw new UserNotFoundException("User not found");

        UserEntity updatedUserEntity = modelMapper.map(updatedUserDto, UserEntity.class);
        updatedUserEntity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        userRepository.save(updatedUserEntity);

        return Optional.of(modelMapper.map(updatedUserEntity, UserDto.class));
    }

    @Override
    public void deleteUser(int id) throws UserNotFoundException {
        Optional<UserEntity> existingUserEntity = userRepository.findById(id);
        if (existingUserEntity.isEmpty()) throw new UserNotFoundException("User not found");

        userRepository.deleteById(id);
    }

    @Override
    public UserDto login(UserDto userDto) {
        UserEntity user = userRepository.findByEmail(userDto.getEmail())
                .orElseThrow(()-> new UserNotFoundException("not found",HttpStatus.NOT_FOUND));
        System.out.println(user.getPassword().equals(userDto.getPassword()));
        if(user.getPassword().equals(userDto.getPassword())){
            UserDto finalUserDetails = modelMapper.map(user, UserDto.class);
            finalUserDetails.setPassword(null);
            return finalUserDetails;
        }
        throw new UserNotFoundException("Invalid password",HttpStatus.BAD_REQUEST);
    }

    @Override
    public UserDto findByEmail(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BaseException("Unknown user", HttpStatus.NOT_FOUND));

            return modelMapper.map(user, UserDto.class);
    }
}
