package com.misha.tastyfast.Controllers;

import com.misha.tastyfast.model.User;
import com.misha.tastyfast.requests.userRequests.UserIdResponse;
import com.misha.tastyfast.requests.userRequests.UserResponse;
import com.misha.tastyfast.requests.userSettingsRequests.*;
import com.misha.tastyfast.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.utils.PropertyResolverUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("user-settings")
@RequiredArgsConstructor
public class UserController {

        private final UserService userService;
    private final PropertyResolverUtils propertyResolverUtils;

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
        @GetMapping("currentId/{userId}")
        public ResponseEntity<UserIdResponse> getCurrentUserId(@PathVariable("userId") Integer userId, Authentication authentication) throws java.nio.file.AccessDeniedException {
                var user = userService.getUserById(userId, authentication);
            return ResponseEntity.ok(user);
        }

        @PatchMapping("/{userId}/firstName")
        public ResponseEntity<FirstNameRequest> changeFirstName(@PathVariable Integer userId,
                                                            @RequestBody FirstNameRequest firstName,
                                                            Authentication authentication) {
            try {
                FirstNameRequest firstNameRequest = userService.changeFirstName(userId, firstName.getFirstName(), authentication);
                return ResponseEntity.ok(firstNameRequest);
            } catch (AccessDeniedException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } catch (EntityNotFoundException e) {
                return ResponseEntity.notFound().build();
            } catch (java.nio.file.AccessDeniedException e) {
                throw new RuntimeException(e);
            }
        }

        @PatchMapping("/{userId}/lastName")
        public ResponseEntity<LastNameRequest> changeLastName(@PathVariable Integer userId,
                                                           @RequestBody LastNameRequest lastName,
                                                           Authentication authentication) {
            try {
                LastNameRequest lastNameRequest = userService.changeLastName(userId, lastName.getLastName(), authentication);
                return ResponseEntity.ok(lastNameRequest);
            } catch (AccessDeniedException | java.nio.file.AccessDeniedException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } catch (EntityNotFoundException e) {
                return ResponseEntity.notFound().build();
            }
        }

        @PatchMapping("/{userId}/dateOfBirth")
        public ResponseEntity<DateOfBirthRequest> changeDateOfBirth(@PathVariable Integer userId,
                                                              @RequestBody DateOfBirthRequest dateOfBirth,
                                                              Authentication authentication) throws java.nio.file.AccessDeniedException {
            try {
                DateOfBirthRequest dateOfBirthRequest = userService.changeDateOfBirth(userId, dateOfBirth.getDateOfBirth(), authentication);
                return ResponseEntity.ok(dateOfBirthRequest);
            } catch (AccessDeniedException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } catch (EntityNotFoundException e) {
                return ResponseEntity.notFound().build();
            }
        }

        @PatchMapping("/{userId}/email")
        public ResponseEntity<EmailRequest> changeEmail(@PathVariable Integer userId,
                                                        @RequestBody EmailRequest email,
                                                        Authentication authentication) {
            try {
                EmailRequest emailRequest = userService.changeEmail(userId, email.getEmail(), authentication);
                return ResponseEntity.ok(emailRequest);
            } catch (AccessDeniedException | java.nio.file.AccessDeniedException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } catch (EntityNotFoundException e) {
                return ResponseEntity.notFound().build();
            }
        }

        @PatchMapping("/{userId}/street")
        public ResponseEntity<StreetRequest> changeStreet(@PathVariable Integer userId,
                                                         @RequestBody StreetRequest street,
                                                         Authentication authentication) throws java.nio.file.AccessDeniedException {
            try {
                StreetRequest streetRequest = userService.changeStreet(userId, street.getStreetRequest(), authentication);
                return ResponseEntity.ok(streetRequest);
            } catch (AccessDeniedException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } catch (EntityNotFoundException e) {
                return ResponseEntity.notFound().build();
            }
        }

    @PatchMapping("/{userId}/password")
    public ResponseEntity<PasswordChangeResponse> changePassword(@PathVariable Integer userId,
                                                                 @RequestBody @Valid PasswordChangeRequest password,
                                                                 Authentication authentication) {
        try {
            PasswordChangeResponse response = userService.changePassword(userId, password.getNewPassword(), authentication);
            return ResponseEntity.ok(response);
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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



