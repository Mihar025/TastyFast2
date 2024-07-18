package com.misha.tastyfast.services;

import com.misha.tastyfast.mapping.UserMapper;
import com.misha.tastyfast.model.User;
import com.misha.tastyfast.repositories.UserRepository;
import com.misha.tastyfast.requests.userRequests.UserResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;


    @Cacheable(value = "users", key = "#userId")
    public UserResponse showAllUserInformation(Integer userId, Authentication connectedUser) throws AccessDeniedException {
        User currentUser = ((User) connectedUser.getPrincipal());
        if (!currentUser.getId().equals(userId)) {
            throw new AccessDeniedException("You don't have permission to change this user's information");
        }
       var existedUser =  userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
            return userMapper.userResponse(existedUser);
    }
    @Transactional
    @CachePut(value = "users", key = "#userId")
    public UserResponse changeFirstName(Integer userId, String firstName, Authentication connectedUser) throws AccessDeniedException {
        User currentUser = ((User) connectedUser.getPrincipal());
        if (!currentUser.getId().equals(userId)) {
            throw new AccessDeniedException("You don't have permission to change this user's information");
        }
        User existedUser = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find user with provided id"+ userId));
        if (firstName != null && !firstName.isEmpty()) {
            existedUser.setFirstname(firstName);
        }
        User updatedUser = userRepository.save(existedUser);
        return userMapper.userResponse(updatedUser);
    }
        @Transactional
        @CachePut(value = "users", key = "#userId")
        public UserResponse changeLastName(Integer userId, String lastName, Authentication connectedUser) throws AccessDeniedException {
            User currentUser = ((User) connectedUser.getPrincipal());
            if(!currentUser.getId().equals(userId)){
                throw new AccessDeniedException("You don't have permission to change this user's information" + userId);
            }
            User existedUser = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("Cannot find user with provided id" + userId));
            if(lastName != null && !lastName.isEmpty()){
                existedUser.setLastname(lastName);
            }
            User updatedUser = userRepository.save(existedUser);
            return userMapper.userResponse(updatedUser);
    }
            @Transactional
            @CachePut(value = "users", key = "#userId")
            public UserResponse changeDateOfBirth(Integer userId, LocalDateTime dateOfBirth, Authentication connectedUser) throws AccessDeniedException{
             User currentUser = ((User) connectedUser.getPrincipal());
                if(!currentUser.getId().equals(userId)){
                    throw new AccessDeniedException("You don't have permission to change this user's information" + userId);
                }
                User existedUser = userRepository.findById(userId)
                        .orElseThrow(() -> new EntityNotFoundException("Cannot find user with provided id" + userId));
                existedUser.setDateOfBirth(dateOfBirth);
                User updatedUser = userRepository.save(existedUser);
                return userMapper.userResponse(updatedUser);
    }
                @Transactional
                @CachePut(value = "users", key = "#userId")
                public UserResponse changeEmail(Integer userId, String email, Authentication connectedUser) throws AccessDeniedException{
                    User currentUser = ((User) connectedUser.getPrincipal());
                    if(!currentUser.getId().equals(userId)){
                        throw new AccessDeniedException("You don't have permission to change this user's information" + userId);
                    }
                    User existedUser = userRepository.findById(userId)
                            .orElseThrow(() -> new EntityNotFoundException("Cannot find user with provided id" + userId));
                    if(email != null && !email.isEmpty()){
                        existedUser.setEmail(email);
                    }
                    User updatedUser = userRepository.save(existedUser);
                    return userMapper.userResponse(updatedUser);
                }
                    @Transactional
                    @CachePut(value = "users", key = "#userId")
                    public UserResponse changeStreet(Integer userId, String street, Authentication connectedUser) throws AccessDeniedException{
                        User currentUser = ((User) connectedUser.getPrincipal());
                        if(!currentUser.getId().equals(userId)){
                            throw new AccessDeniedException("You don't have permission to change this user's information" + userId);
                        }
                        User existedUser
                                = userRepository.findById(userId).orElseThrow(
                                        () -> new EntityNotFoundException("Cannot find user with provided id" + userId)
                        );
                        if(street != null && !street.isEmpty()){
                            existedUser.setStreet(street);
                        }
                            User updatedUser  = userRepository.save(existedUser);
                            return userMapper.userResponse(updatedUser);
                    }
                        @Transactional
                        @CachePut(value = "users", key = "#userId")
                        public UserResponse changePassword (Integer userId,
                                                            String currentPassword,
                                                            String newPassword,
                                                            Authentication connectedUser
                        ) throws AccessDeniedException {
                            User currentUser = ((User) connectedUser.getPrincipal());
                            if(!currentUser.getId().equals(userId)){
                                throw new AccessDeniedException("You don't have permission to change this user's information" + userId);
                            }
                            User existedUser
                                    = userRepository.findById(userId)
                                    .orElseThrow(
                                            () -> new EntityNotFoundException("Cannot find user with provided id" + userId)
                                    );
                            if(!passwordEncoder.matches(currentPassword, existedUser.getPassword())){
                                throw new IllegalArgumentException("Current password is incorect");
                            }
                                    existedUser.setPassword(passwordEncoder.encode(newPassword));
                                    User updatedPassword = userRepository.save(existedUser);
                                    return userMapper.userResponse(updatedPassword);
                    }
    @Transactional
    @CacheEvict(value = "users", key = "#userId")
    public void deleteAccount(Integer userId, Authentication connectedUser) throws Exception {
            User currentUser = ((User) connectedUser.getPrincipal());
            if(!currentUser.getId().equals(userId)){
                throw new AccessDeniedException("You don't have permission to change this user's information" + userId);
            }
            User existedUser
                    = userRepository.findById
                    (userId).orElseThrow(() -> new EntityNotFoundException("Cannot find user with provided id" + userId));
            ;
        userRepository.delete(existedUser);
        log.info("User account deleted: {}", userId);


        }






}
