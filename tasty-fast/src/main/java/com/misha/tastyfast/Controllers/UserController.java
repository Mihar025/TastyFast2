package com.misha.tastyfast.Controllers;

import com.misha.tastyfast.requests.userRequests.UserResponse;
import com.misha.tastyfast.requests.userSettingsRequests.*;
import com.misha.tastyfast.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user-settings")
@RequiredArgsConstructor
public class UserController {

        private final UserService userService;

        @GetMapping("/{userId}")
        public ResponseEntity<UserResponse> showAllUserInformation(@PathVariable Integer userId,
                                                                   Authentication authentication) {
            try {
                UserResponse userResponse = userService.showAllUserInformation(userId, authentication);
                return ResponseEntity.ok(userResponse);
            } catch (AccessDeniedException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } catch (EntityNotFoundException e) {
                return ResponseEntity.notFound().build();
            } catch (java.nio.file.AccessDeniedException e) {
                throw new RuntimeException(e);
            }
        }

        @PatchMapping("/{userId}/firstName")
        public ResponseEntity<UserResponse> changeFirstName(@PathVariable Integer userId,
                                                            @RequestBody FirstNameRequest firstName,
                                                            Authentication authentication) {
            try {
                UserResponse userResponse = userService.changeFirstName(userId, firstName.getFirstName(), authentication);
                return ResponseEntity.ok(userResponse);
            } catch (AccessDeniedException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } catch (EntityNotFoundException e) {
                return ResponseEntity.notFound().build();
            } catch (java.nio.file.AccessDeniedException e) {
                throw new RuntimeException(e);
            }
        }

        @PatchMapping("/{userId}/lastName")
        public ResponseEntity<UserResponse> changeLastName(@PathVariable Integer userId,
                                                           @RequestBody LastNameRequest lastName,
                                                           Authentication authentication) {
            try {
                UserResponse userResponse = userService.changeLastName(userId, lastName.getLastName(), authentication);
                return ResponseEntity.ok(userResponse);
            } catch (AccessDeniedException | java.nio.file.AccessDeniedException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } catch (EntityNotFoundException e) {
                return ResponseEntity.notFound().build();
            }
        }

        @PatchMapping("/{userId}/dateOfBirth")
        public ResponseEntity<UserResponse> changeDateOfBirth(@PathVariable Integer userId,
                                                              @RequestBody DateOfBirthRequest dateOfBirth,
                                                              Authentication authentication) throws java.nio.file.AccessDeniedException {
            try {
                UserResponse userResponse = userService.changeDateOfBirth(userId, dateOfBirth.getDateOfBirth(), authentication);
                return ResponseEntity.ok(userResponse);
            } catch (AccessDeniedException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } catch (EntityNotFoundException e) {
                return ResponseEntity.notFound().build();
            }
        }

        @PatchMapping("/{userId}/email")
        public ResponseEntity<UserResponse> changeEmail(@PathVariable Integer userId,
                                                        @RequestBody EmailRequest email,
                                                        Authentication authentication) {
            try {
                UserResponse userResponse = userService.changeEmail(userId, email.getEmail(), authentication);
                return ResponseEntity.ok(userResponse);
            } catch (AccessDeniedException | java.nio.file.AccessDeniedException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } catch (EntityNotFoundException e) {
                return ResponseEntity.notFound().build();
            }
        }

        @PatchMapping("/{userId}/street")
        public ResponseEntity<UserResponse> changeStreet(@PathVariable Integer userId,
                                                         @RequestBody StreetRequest street,
                                                         Authentication authentication) throws java.nio.file.AccessDeniedException {
            try {
                UserResponse userResponse = userService.changeStreet(userId, street.getStreetRequest(), authentication);
                return ResponseEntity.ok(userResponse);
            } catch (AccessDeniedException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } catch (EntityNotFoundException e) {
                return ResponseEntity.notFound().build();
            }
        }

        @PatchMapping("/{userId}/password")
        public ResponseEntity<UserResponse> changePassword(@PathVariable Integer userId,
                                                           @RequestBody @Valid PasswordChangeRequest password,
                                                           Authentication authentication) throws java.nio.file.AccessDeniedException {
            try {
                if(!password.getNewPassword().equals(password.getConfirmPassword())){
                    return ResponseEntity.badRequest().body(new UserResponse("New password and confirm password do not match"));
                }

                UserResponse userResponse = userService
                        .changePassword(userId,
                                        password.getCurrentPassword(),
                                         password.getNewPassword(),
                                         authentication);
                return ResponseEntity.ok(userResponse);
            } catch (AccessDeniedException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } catch (EntityNotFoundException e) {
                return ResponseEntity.notFound().build();
            }
        }

        @DeleteMapping("/{userId}")
        public ResponseEntity<Void> deleteAccount(@PathVariable Integer userId,
                                                  Authentication authentication) {
            try {
                userService.deleteAccount(userId, authentication);
                return ResponseEntity.noContent().build();
            } catch (AccessDeniedException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } catch (EntityNotFoundException e) {
                return ResponseEntity.notFound().build();
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }



