package com.misha.tastyfast.Controllers;


import com.misha.tastyfast.exception.InternalServerErrorException;
import com.misha.tastyfast.model.Restaurant;
import com.misha.tastyfast.model.User;
import com.misha.tastyfast.repositories.RestaurantRepository;
import com.misha.tastyfast.requests.dishesRequests.DishesRequest;
import com.misha.tastyfast.requests.dishesRequests.DishesResponse;
import com.misha.tastyfast.requests.drinkRequests.DrinkRequest;
import com.misha.tastyfast.requests.drinkRequests.DrinksResponse;
import com.misha.tastyfast.requests.pageResponse.PageResponse;
import com.misha.tastyfast.requests.restaurantRequests.RestaurantRequest;
import com.misha.tastyfast.requests.restaurantRequests.RestaurantResponse;
import com.misha.tastyfast.services.RestaurantService;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.EntityNotFoundException;
import java.io.IOException;

@RestController
@RequestMapping("restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;
    private final RestaurantRepository restaurantRepository;


    @PostMapping(value = "/restaurant-logo/{restaurantId}", consumes = {"image/webp", "multipart/form-data"})
    public ResponseEntity<?> uploadRestaurantLogo(
            @PathVariable("restaurantId") Integer restaurantId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication authentication
    ){
        restaurantService.uploadRestaurantLogo(file,authentication, restaurantId);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/logo/{restaurantId}")
    public ResponseEntity<Resource> getRestaurantLogo(@PathVariable Integer restaurantId, Authentication authentication) throws IOException {
        User user = ((User) authentication.getPrincipal());

        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));
        String logoPath = restaurant.getLogo();

        if (logoPath == null || logoPath.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Удаляем начальный './' из пути, если он есть
        if (logoPath.startsWith("./")) {
            logoPath = logoPath.substring(2);
        }

        Resource resource = new ClassPathResource(logoPath);
        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(resource);
    }

    @GetMapping// working
    public ResponseEntity<PageResponse<RestaurantResponse>> getAllRestaurants(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        PageResponse<RestaurantResponse> response = restaurantService.findAllRestaurants(page, size, authentication);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/business-restaurant-owner/{ownerId}")// working
    public ResponseEntity<PageResponse<RestaurantResponse>> getAllRestaurantsByOwner(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @PathVariable("ownerId") Integer ownerId,
            Authentication authentication) {
        PageResponse<RestaurantResponse> response = restaurantService.findAllRestaurantsBusinessOwner(page, size,ownerId, authentication);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{restaurantId}") // working
    public ResponseEntity<RestaurantResponse> getRestaurantById(@PathVariable Integer restaurantId, Authentication authentication) {
        RestaurantResponse response = restaurantService.findRestaurantById(restaurantId, authentication);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{restaurantId}/dishes") // working
    public ResponseEntity<PageResponse<DishesResponse>> getAllDishesInRestaurant(
            @PathVariable(name = "restaurantId") Integer restaurantId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageResponse<DishesResponse> response = restaurantService.findAllDishesInRestaurant(page, size, restaurantId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{restaurantId}/drinks") //working
    public ResponseEntity<PageResponse<DrinksResponse>> getAllDrinksInRestaurant(
            @PathVariable(name = "restaurantId") Integer restaurantId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageResponse<DrinksResponse> response = restaurantService.findAllDrinksInRestaurant(page, size, restaurantId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{restaurantId}/drinks/{drinkId}") // working
    public ResponseEntity<DrinksResponse> getDrinkByIdInRestaurant(
            @PathVariable Integer restaurantId,
            @PathVariable Integer drinkId) {
        DrinksResponse response = restaurantService.findDrinkByIdInRestaurant(drinkId, restaurantId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{restaurantId}/dishes/{dishId}") // working
    public ResponseEntity<DishesResponse> getDishByIdInRestaurant(
            @PathVariable Integer restaurantId,
            @PathVariable Integer dishId) {
        DishesResponse response = restaurantService.findDishByIdInRestaurant(dishId, restaurantId);
        return ResponseEntity.ok(response);
    }



    @GetMapping("/no-delivery") // working
    public ResponseEntity<PageResponse<RestaurantResponse>> getAllRestaurantsWithoutDelivery(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        PageResponse<RestaurantResponse> response = restaurantService.findAllRestaurantsWithoutDelivery(page, size, authentication);
        return ResponseEntity.ok(response);
    }



    @PostMapping("/{restaurantId}/dishes") // working
    public ResponseEntity<DishesResponse> addDishToRestaurant(
            @PathVariable Integer restaurantId,
            @RequestBody DishesRequest request,
            Authentication authentication) throws InternalServerErrorException {
        DishesResponse dish = restaurantService.addDishesToRestaurant(restaurantId, request, authentication);
        return ResponseEntity.ok(dish);
    }

    @PostMapping("/{restaurantId}/drinks") //working
    public ResponseEntity<DrinksResponse> addDrinkToRestaurant(
            @PathVariable Integer restaurantId,
            @RequestBody DrinkRequest request,
            Authentication authentication) {
        DrinksResponse drink = restaurantService.addDrinkToTheRestaurant(restaurantId, request, authentication);
        return ResponseEntity.ok(drink);
    }

    @PostMapping("create-restaurant/{ownerId}")
    public ResponseEntity<RestaurantResponse> createRestaurant(
            @RequestBody RestaurantRequest request,
            @PathVariable("ownerId") Integer ownerId,
            Authentication authentication) {
        RestaurantResponse response = restaurantService.createNewRestaurant(request, ownerId, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{restaurantId}/drinks/{drinkId}")
   // @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<DrinksResponse> updateDrinkInRestaurant(
            @PathVariable Integer restaurantId,
            @PathVariable Integer drinkId,
            @RequestBody DrinkRequest request,
            Authentication authentication) throws BadRequestException, InternalServerErrorException {
        DrinksResponse updatedDrink = restaurantService.updateDrinkInRestaurant(restaurantId, drinkId, request, authentication);
        return ResponseEntity.ok(updatedDrink);
    }
/*

 */

    @PutMapping("/{restaurantId}")
   // @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<?> updateRestaurant(
            @PathVariable Integer restaurantId,
            @RequestBody RestaurantRequest updateRequest,
            Authentication authentication) {
        try {
            RestaurantResponse updatedRestaurant = restaurantService.updateRestaurant(restaurantId, updateRequest, authentication);
            return ResponseEntity.ok(updatedRestaurant);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the restaurant");
        }
    }

    @PutMapping("/{restaurantId}/dishes/{dishId}")

    public ResponseEntity<DishesResponse> updateDishInRestaurant(
            @PathVariable Integer restaurantId,
            @PathVariable Integer dishId,
            @RequestBody DishesRequest request,
            Authentication authentication) throws BadRequestException, InternalServerErrorException {
        DishesResponse updatedDish = restaurantService.updateDishInRestaurant(restaurantId, dishId, request, authentication);
        return ResponseEntity.ok(updatedDish);
    }

    @DeleteMapping("/{restaurantId}/drinks/{drinkId}")
   // @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<Void> deleteDrinkFromRestaurant(
            @PathVariable Integer restaurantId,
            @PathVariable Integer drinkId,
            Authentication authentication) throws InternalServerErrorException {
        restaurantService.deleteDrinkInsideRestaurant(drinkId, restaurantId, authentication);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{restaurantId}/dish/{dishId}")
    // @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<Void> deleteDishFromRestaurant(
            @PathVariable Integer restaurantId,
            @PathVariable Integer dishId,
            Authentication authentication) throws InternalServerErrorException {
        restaurantService.deleteDishInsideRestaurant(dishId, restaurantId, authentication);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{restaurantId}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Integer restaurantId, Authentication authentication) {
        restaurantService.deleteRestaurant(restaurantId, authentication);
        return ResponseEntity.noContent().build();
    }

}