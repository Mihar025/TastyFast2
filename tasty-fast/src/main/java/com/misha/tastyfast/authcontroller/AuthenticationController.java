package com.misha.tastyfast.authcontroller;

import com.misha.tastyfast.requests.registrationRequests.RegistrationBusinessAccountRequest;
import com.misha.tastyfast.requests.registrationRequests.RegistrationRequest;
import com.misha.tastyfast.security.AuthenticationRequest;
import com.misha.tastyfast.security.AuthenticationResponse;
import com.misha.tastyfast.security.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid RegistrationRequest request) throws MessagingException {
            authenticationService.registerUser(request);
            return ResponseEntity.ok("User register successfully");
    }


    @PostMapping("/register/business")
    public ResponseEntity<?> registerBusinessAccount(@RequestBody @Valid RegistrationBusinessAccountRequest request) throws MessagingException {
        authenticationService.registerBusinessAccount(request);
        return ResponseEntity.ok("User register successfully");
    }

    @PostMapping("/register/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerAdmin(@RequestBody @Valid RegistrationRequest request) throws MessagingException {
        authenticationService.registerAdmin(request);
        return ResponseEntity.ok("User register successfully");
    }

    @GetMapping("/check-restaurant-ownership/{ownerId}/{restaurantId}")
    public ResponseEntity<Boolean> checkRestaurantOwnership(
            @PathVariable("ownerId") Integer ownerId,
            @PathVariable("restaurantId") Integer restaurantId,
            Authentication authentication
    ) {
        try {
            boolean isOwner = authenticationService.checkRestaurantOwnership(ownerId, restaurantId, authentication);
            return ResponseEntity.ok(isOwner);
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(false);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        } catch (java.nio.file.AccessDeniedException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/check-store-ownership/{ownerId}/{storeId}")
    public ResponseEntity<Boolean> checkStoreOwnership(
            @PathVariable("ownerId") Integer ownerId,
            @PathVariable("storeId") Integer storeId,
            Authentication authentication
    ) {
        try {
            boolean isOwner = authenticationService.checkStoreOwnership(ownerId, storeId, authentication);
            return ResponseEntity.ok(isOwner);
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(false);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        } catch (java.nio.file.AccessDeniedException e) {
            throw new RuntimeException(e);
        }
    }



    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody @Valid AuthenticationRequest authenticationRequest
    ){
        return ResponseEntity.ok(authenticationService.authenticate(authenticationRequest));
    }

    @GetMapping("/activate-account")
    public void confirm(
            @RequestParam String token
    ) throws MessagingException {
        authenticationService.activateAccount(token);
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout (@RequestHeader("Authorization") String token){
        authenticationService.logout(token);
        return ResponseEntity.ok("Logout successfully");
    }

    @GetMapping("/check-business-owner/{userId}")
    public ResponseEntity<Boolean> checkBusinessOwner(@PathVariable Integer userId, Authentication authentication) {
        try {
            boolean isBusinessOwner = authenticationService.checkUserOwnership(userId, authentication);
            return ResponseEntity.ok(isBusinessOwner);
        } catch (AccessDeniedException | java.nio.file.AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(false);
        }
    }





}
