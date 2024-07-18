package com.misha.tastyfast.requests.storeRequests;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Data
public class StoreRequest {

    @NotBlank(message = "Store name is required")
    @Size(min = 2, max = 100, message = "Store name must be between 2 and 100 characters")
    private String storeName;
    @NotBlank(message = "Address is required")
    private String address;
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[0-9]{10,14}$", message = "Invalid phone number format")
    private String phoneNumber;
    @NotBlank(message = "EmailRequest is required")
    @Email(message = "Invalid email format")
    private String email;
    private String description;
    private String openingHours;
    private boolean isActive;
    private boolean deliveryAvailable;
    private String websiteUrl;
    @NotNull(message = "Owner ID is required! ")
    private Long ownerId;
    private byte[] logoUrl;



}
