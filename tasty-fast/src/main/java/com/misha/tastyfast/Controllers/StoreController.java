package com.misha.tastyfast.Controllers;

import com.misha.tastyfast.exception.InternalServerErrorException;
import com.misha.tastyfast.model.Store;
import com.misha.tastyfast.requests.drinkRequests.DrinkRequest;
import com.misha.tastyfast.requests.drinkRequests.DrinkRequestForStore;
import com.misha.tastyfast.requests.drinkRequests.DrinksResponse;
import com.misha.tastyfast.requests.pageResponse.PageResponse;
import com.misha.tastyfast.requests.productRequests.ProductRequest;
import com.misha.tastyfast.requests.productRequests.ProductResponse;
import com.misha.tastyfast.requests.storeRequests.StoreRequest;
import com.misha.tastyfast.requests.storeRequests.StoreResponse;
import com.misha.tastyfast.services.StoreService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @PostMapping
    public ResponseEntity<Store> createStore(@RequestBody StoreRequest request, Authentication authentication) {
        Store store = storeService.createNewStore(request, authentication);
        return ResponseEntity.ok(store);
    }

    @GetMapping("/{storeId}")
    public ResponseEntity<StoreResponse> getStoreById(@PathVariable Integer storeId, Authentication authentication) {
        StoreResponse response = storeService.findStoreById(storeId, authentication);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{storeId}/products")
    public ResponseEntity<PageResponse<ProductResponse>> getProductsInStore(
            @PathVariable Integer storeId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageResponse<ProductResponse> response = storeService.findAllProductInStore(page, size, storeId);
        return ResponseEntity.ok(response);
    }



    @GetMapping("/{storeId}/drinks")
    public ResponseEntity<PageResponse<DrinksResponse>> getDrinksInStore(
            @PathVariable Integer storeId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageResponse<DrinksResponse> response = storeService.findAllDrinksInStore(page, size, storeId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{storeId}/drinks/{drinkId}")
    public ResponseEntity<DrinksResponse> getDrinkByIdInStore(
            @PathVariable Integer storeId,
            @PathVariable Integer drinkId) {
        DrinksResponse response = storeService.findDrinkByIdInStore(drinkId, storeId);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/{storeId}/products/{productId}")
    public ResponseEntity<ProductResponse> getProductByIdInStore(
            @PathVariable Integer storeId,
            @PathVariable Integer productId) {
        ProductResponse response = storeService.findProductByIdInStore(productId, storeId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<PageResponse<StoreResponse>> getAllStores(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        PageResponse<StoreResponse> response = storeService.findAllStores(page, size, authentication);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/no-delivery")
    public ResponseEntity<PageResponse<StoreResponse>> getAllStoresWithoutDelivery(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        PageResponse<StoreResponse> response = storeService.findAllStoresWithoutDelivery(page, size, authentication);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{storeId}")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<Store> updateStore(
            @PathVariable Integer storeId,
            @RequestBody StoreRequest updateRequest,
            Authentication authentication) {
        Store updatedStore = storeService.updateStore(storeId, updateRequest, authentication);
        return ResponseEntity.ok(updatedStore);
    }

    @DeleteMapping("/{storeId}")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<Void> deleteStore(@PathVariable Integer storeId, Authentication authentication) {
        storeService.deleteStore(storeId, authentication);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{storeId}/products")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<ProductResponse> addProductToStore(
            @PathVariable Integer storeId,
            @RequestBody ProductRequest request,
            Authentication authentication) {
        ProductResponse product = storeService.addProductToStore(storeId, request, authentication);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/{storeId}/drinks")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<DrinksResponse> addDrinkToStore(
            @PathVariable Integer storeId,
            @RequestBody DrinkRequestForStore request,
            Authentication authentication) {
        DrinksResponse drink = storeService.addDrinkToTheStore(storeId, request, authentication);
        return ResponseEntity.ok(drink);
    }

    @PutMapping("/{storeId}/drinks/{drinkId}")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<DrinksResponse> updateDrinkInStore(
            @PathVariable Integer storeId,
            @PathVariable Integer drinkId,
            @RequestBody DrinkRequest request,
            Authentication authentication) throws BadRequestException, InternalServerErrorException {
        DrinksResponse updatedDrink = storeService.updateDrinkInStore(storeId, drinkId, request, authentication);
        return ResponseEntity.ok(updatedDrink);
    }
    @PutMapping("/{storeId}/products/{productId}")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<ProductResponse> updateProductInStore(
            @PathVariable Integer storeId,
            @PathVariable Integer productId,
            @RequestBody ProductRequest request,
            Authentication authentication) throws BadRequestException, InternalServerErrorException {
        ProductResponse updatedProduct = storeService.updateProductForStore(storeId, productId, request, authentication);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{storeId}/drinks/{drinkId}")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<Void> deleteDrinkFromStore(
            @PathVariable Integer storeId,
            @PathVariable Integer drinkId,
            Authentication authentication) throws InternalServerErrorException {
        storeService.deleteDrinkInsideStore(drinkId, storeId, authentication);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{storeId}/products/{productId}")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<Void> deleteProductFromStore(
            @PathVariable Integer storeId,
            @PathVariable Integer productId,
            Authentication authentication) throws InternalServerErrorException {
        storeService.deleteProductInsideStore(productId, storeId, authentication);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{storeId}/all-info")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<StoreResponse> getAllStoreInformation(@PathVariable Integer storeId, Authentication authentication) {
        StoreResponse response = storeService.findAllStoresInformation(storeId, authentication);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{storeId}/name")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<StoreResponse> changeStoreName(@PathVariable Integer storeId, @RequestBody String storeName) {
        StoreResponse response = storeService.changeStoreName(storeId, storeName);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{storeId}/address")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<StoreResponse> changeStoreAddress(@PathVariable Integer storeId, @RequestBody String address) {
        StoreResponse response = storeService.changeAddress(storeId, address);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{storeId}/phone")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<StoreResponse> changeStorePhoneNumber(@PathVariable Integer storeId, @RequestBody String phoneNumber) {
        StoreResponse response = storeService.changePhoneNumber(storeId, phoneNumber);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{storeId}/email")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<StoreResponse> changeStoreEmail(@PathVariable Integer storeId, @RequestBody String email) {
        StoreResponse response = storeService.changeEmail(storeId, email);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{storeId}/description")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<StoreResponse> changeStoreDescription(@PathVariable Integer storeId, @RequestBody String description) {
        StoreResponse response = storeService.changeDescription(storeId, description);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{storeId}/opening-hours")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<StoreResponse> changeStoreOpeningHours(@PathVariable Integer storeId, @RequestBody String openingHours) {
        StoreResponse response = storeService.changeOpeningHours(storeId, openingHours);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{storeId}/website")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<StoreResponse> changeStoreWebsite(@PathVariable Integer storeId, @RequestBody String websiteUrl) {
        StoreResponse response = storeService.changeWebSiteUrl(storeId, websiteUrl);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{storeId}/delivery")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<StoreResponse> changeStoreDeliveryAvailability(@PathVariable Integer storeId, @RequestBody boolean deliveryAvailable) {
        StoreResponse response = storeService.changeDeliveryAvailable(storeId, deliveryAvailable);
        return ResponseEntity.ok(response);
    }


}