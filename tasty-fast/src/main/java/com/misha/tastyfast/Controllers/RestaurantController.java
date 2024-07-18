package com.misha.tastyfast.Controllers;

import com.misha.tastyfast.exception.InternalServerErrorException;
import com.misha.tastyfast.model.Restaurant;
import com.misha.tastyfast.requests.dishesRequests.DishesRequest;
import com.misha.tastyfast.requests.dishesRequests.DishesResponse;
import com.misha.tastyfast.requests.drinkRequests.DrinkRequest;
import com.misha.tastyfast.requests.drinkRequests.DrinksResponse;
import com.misha.tastyfast.requests.pageResponse.PageResponse;
import com.misha.tastyfast.requests.restaurantRequests.RestaurantRequest;
import com.misha.tastyfast.requests.restaurantRequests.RestaurantResponse;
import com.misha.tastyfast.services.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping// working
    public ResponseEntity<PageResponse<RestaurantResponse>> getAllRestaurants(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        PageResponse<RestaurantResponse> response = restaurantService.findAllRestaurants(page, size, authentication);
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
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<DishesResponse> addDishToRestaurant(
            @PathVariable Integer restaurantId,
            @RequestBody DishesRequest request,
            Authentication authentication) throws InternalServerErrorException {
        DishesResponse dish = restaurantService.addDishesToRestaurant(restaurantId, request, authentication);
        return ResponseEntity.ok(dish);
    }

    @PostMapping("/{restaurantId}/drinks") //working
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<DrinksResponse> addDrinkToRestaurant(
            @PathVariable Integer restaurantId,
            @RequestBody DrinkRequest request,
            Authentication authentication) {
        DrinksResponse drink = restaurantService.addDrinkToTheRestaurant(restaurantId, request, authentication);
        return ResponseEntity.ok(drink);
    }

    @PostMapping// working
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody RestaurantRequest request, Authentication authentication) {
        Restaurant restaurant = restaurantService.createNewRestaurant(request, authentication);
        return ResponseEntity.ok(restaurant);
    }

    @PutMapping("/{restaurantId}/drinks/{drinkId}")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<DrinksResponse> updateDrinkInRestaurant(
            @PathVariable Integer restaurantId,
            @PathVariable Integer drinkId,
            @RequestBody DrinkRequest request,
            Authentication authentication) throws BadRequestException, InternalServerErrorException {
        DrinksResponse updatedDrink = restaurantService.updateDrinkInRestaurant(restaurantId, drinkId, request, authentication);
        return ResponseEntity.ok(updatedDrink);
    }

    @PutMapping("/{restaurantId}")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<RestaurantResponse> updateRestaurant(
            @PathVariable Integer restaurantId,
            @RequestBody RestaurantRequest updateRequest,
            Authentication authentication) {
        RestaurantResponse updatedRestaurant = restaurantService.updateRestaurant(restaurantId, updateRequest, authentication);
        return ResponseEntity.ok(updatedRestaurant);
    }


    @PutMapping("/{restaurantId}/dishes/{dishId}")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<DishesResponse> updateDishInRestaurant(
            @PathVariable Integer restaurantId,
            @PathVariable Integer dishId,
            @RequestBody DishesRequest request,
            Authentication authentication) throws BadRequestException, InternalServerErrorException {
        DishesResponse updatedDish = restaurantService.updateDishInRestaurant(restaurantId, dishId, request, authentication);
        return ResponseEntity.ok(updatedDish);
    }

    @DeleteMapping("/{restaurantId}/drinks/{drinkId}")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<Void> deleteDrinkFromRestaurant(
            @PathVariable Integer restaurantId,
            @PathVariable Integer drinkId,
            Authentication authentication) throws InternalServerErrorException {
        restaurantService.deleteDrinkInsideRestaurant(drinkId, restaurantId, authentication);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{restaurantId}")
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Integer restaurantId, Authentication authentication) {
        restaurantService.deleteRestaurant(restaurantId, authentication);
        return ResponseEntity.noContent().build();
    }

}