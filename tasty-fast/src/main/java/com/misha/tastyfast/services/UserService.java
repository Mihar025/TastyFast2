package com.misha.tastyfast.services;

import com.misha.tastyfast.mapping.UserMapper;
import com.misha.tastyfast.model.User;
import com.misha.tastyfast.repositories.UserRepository;
import com.misha.tastyfast.requests.userRequests.UserIdResponse;
import com.misha.tastyfast.requests.userRequests.UserResponse;
import com.misha.tastyfast.requests.userSettingsRequests.*;
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

  //  @Cacheable(value = "users", key = "#userId")
    public UserResponse showAllUserInformation(Integer userId, Authentication connectedUser) throws AccessDeniedException {
        log.debug("Entering showAllUserInformation for userId: {}", userId);
        User currentUser = ((User) connectedUser.getPrincipal());
        if (!currentUser.getId().equals(userId)) {
            log.warn("Access denied for user {} trying to access information for user {}", currentUser.getId(), userId);
            throw new AccessDeniedException("You don't have permission to change this user's information");
        }
        var existedUser = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.error("User not found with id: {}", userId);
                    return new EntityNotFoundException("User not found");
                });
        log.debug("User found, mapping to UserResponse");
        UserResponse response = userMapper.userResponse(existedUser);
        log.debug("Returning UserResponse for userId: {}", userId);
        return response;
    }

    @Transactional
    @CachePut(value = "users", key = "#userId")
    public FirstNameRequest changeFirstName(Integer userId, String firstName, Authentication connectedUser) throws AccessDeniedException {
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
        return userMapper.toFirstName(updatedUser);
    }
        @Transactional
        @CachePut(value = "users", key = "#userId")
        public LastNameRequest changeLastName(Integer userId, String lastName, Authentication connectedUser) throws AccessDeniedException {
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
            return userMapper.toLastName(updatedUser);
    }
            @Transactional
            @CachePut(value = "users", key = "#userId")
            public DateOfBirthRequest changeDateOfBirth(Integer userId, LocalDateTime dateOfBirth, Authentication connectedUser) throws AccessDeniedException{
             User currentUser = ((User) connectedUser.getPrincipal());
                if(!currentUser.getId().equals(userId)){
                    throw new AccessDeniedException("You don't have permission to change this user's information" + userId);
                }
                User existedUser = userRepository.findById(userId)
                        .orElseThrow(() -> new EntityNotFoundException("Cannot find user with provided id" + userId));
                existedUser.setDateOfBirth(dateOfBirth);
                User updatedUser = userRepository.save(existedUser);
                return userMapper.toDateOfBirth(updatedUser);
    }
                @Transactional
                @CachePut(value = "users", key = "#userId")
                public EmailRequest changeEmail(Integer userId, String email, Authentication connectedUser) throws AccessDeniedException{
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
                    return userMapper.toEmail(updatedUser);
                }
                    @Transactional
                    @CachePut(value = "users", key = "#userId")
                    public StreetRequest changeStreet(Integer userId, String street, Authentication connectedUser) throws AccessDeniedException{
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
                            return userMapper.toStreet(updatedUser);
                    }
    @Transactional
    @CachePut(value = "users", key = "#userId")
    public PasswordChangeResponse changePassword(Integer userId,
                                                 String newPassword,
                                                 Authentication connectedUser) throws AccessDeniedException {
        User currentUser = ((User) connectedUser.getPrincipal());
        if (!currentUser.getId().equals(userId)) {
            throw new AccessDeniedException("You don't have permission to change this user's information" + userId);
        }
        User existedUser = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find user with provided id" + userId));
        existedUser.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(existedUser);
        return new PasswordChangeResponse("Password changed successfully", LocalDateTime.now());
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


        public UserIdResponse getUserById(Integer currentId, Authentication connectedUser) throws AccessDeniedException {
        User currentUser = ((User) connectedUser.getPrincipal());
        if(!currentUser.getId().equals(currentId)){
            throw new AccessDeniedException("Cannot find user with provided ID" + currentId);
        }
        User user = userRepository.findById(currentId).orElseThrow(
                () -> new EntityNotFoundException("Cannot find user with provided id" + currentId)
        );
        return userMapper.toUserId(user);
        }






}
