package com.misha.tastyfast.services;

import com.misha.tastyfast.exception.InternalServerErrorException;
import com.misha.tastyfast.mapping.DishesMapper;
import com.misha.tastyfast.mapping.DrinkMapper;
import com.misha.tastyfast.mapping.RestaurantMapper;
import com.misha.tastyfast.model.Dishes;
import com.misha.tastyfast.model.Drink;
import com.misha.tastyfast.model.Restaurant;
import com.misha.tastyfast.model.User;
import com.misha.tastyfast.repositories.DishesRepository;
import com.misha.tastyfast.repositories.DrinkRepository;
import com.misha.tastyfast.repositories.RestaurantRepository;
import com.misha.tastyfast.requests.dishesRequests.DishesRequest;
import com.misha.tastyfast.requests.dishesRequests.DishesResponse;
import com.misha.tastyfast.requests.drinkRequests.DrinkRequest;
import com.misha.tastyfast.requests.drinkRequests.DrinksResponse;
import com.misha.tastyfast.requests.pageResponse.PageResponse;
import com.misha.tastyfast.requests.restaurantRequests.RestaurantRequest;
import com.misha.tastyfast.requests.restaurantRequests.RestaurantResponse;
import com.misha.tastyfast.transactionHistory.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RestaurantService {
private final RestaurantRepository restaurantRepository;
private final RestaurantTransactionHistoryRepository restaurantTransactionHistoryRepository;
private final RestaurantMapper restaurantMapper;
private final DishesRepository dishesRepository;
private final DrinkRepository drinkRepository;
private final DishesMapper dishesMapper;
private final DrinkMapper drinkMapper;
private final DrinksTransactionHistoryRepository drinksTransactionHistoryRepository;
private final DishesTransactionRepository dishesTransactionRepository;

    @PreAuthorize("hasRole('BUSINESS_OWNER')") //updated
    public Restaurant createNewRestaurant(RestaurantRequest request, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Restaurant restaurant = restaurantMapper.toRestaurant(request, user);
        restaurant = restaurantRepository.save(restaurant);

        RestaurantTransactionHistory history = RestaurantTransactionHistory.builder()
                .restaurant(restaurant)
                .user(user)
                .transactionType("CREATED")
                .transactionDate(LocalDateTime.now())
                .details("Creating new restaurant")
                .createdBy(user.getId())
                .createdDate(LocalDateTime.now())
                .lastModifiedDate(LocalDateTime.now())
                .build();

        log.debug("Saving transaction history: {}", history);
        restaurantTransactionHistoryRepository.save(history);
        log.debug("Saved transaction history: {}", history);

        return restaurant;
    }
    @Cacheable(value = "restaurant_byId", key = "#restaurantId") //updated
    public RestaurantResponse findRestaurantById (Integer restaurantId, Authentication connectedUser){
        User user = ((User) connectedUser.getPrincipal());
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("RestaurantController with provided ID::" + restaurantId + " wasn't founded"));

        boolean isOwner = restaurant.getOwner().getId().equals(user.getId());
        boolean isBusinessOwner = user.getRoles().stream()
                .anyMatch(role -> role.getName().equals("BUSINESS_OWNER"));
        if(isOwner || isBusinessOwner){
            return  restaurantMapper.toRestaurantResponse(restaurant);
        }
        else {
            return restaurantMapper.toPublicRestaurantResponse(restaurant);
        }
    }
    @Cacheable(value = "restaurant_allDish", key = "#restaurantId") //updated
    public PageResponse<DishesResponse> findAllDishesInRestaurant(int page, int size, Integer restaurantId) {
        log.info("Fetching dishes for restaurant with ID: {}", restaurantId);

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Dishes> dishes = dishesRepository.findAllDishesInRestaurant(pageable, restaurantId);

        List<DishesResponse> dishesResponses = dishes.getContent().stream()
                .map(dishesMapper::toDishesResponse)
                .collect(Collectors.toList());

        log.info("Found {} dishes for restaurant with ID: {}", dishesResponses.size(), restaurantId);

        return new PageResponse<>(
                dishesResponses,
                dishes.getNumber(),
                dishes.getSize(),
                dishes.getTotalElements(),
                dishes.getTotalPages(),
                dishes.isFirst(),
                dishes.isLast()
        );
    }
    @Cacheable(value = "restaurant_allDrinks", key = "#restaurantId + '_' + #page + '_' + #size") //updated
    public PageResponse<DrinksResponse> findAllDrinksInRestaurant(int page, int size, Integer restaurantId) {
        log.info("Fetching drinks for restaurant with ID: {}", restaurantId);
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Drink> drinks = drinkRepository.findAllDrinksInRestaurant(pageable, restaurantId);
        List<DrinksResponse> responses = drinks.getContent().stream()
                .map(drinkMapper::toDrinkResponse)
                .collect(Collectors.toList());
        log.info("Found {} drinks for restaurant with ID: {}", responses.size(), restaurantId);
        return new PageResponse<>(
                responses,
                drinks.getNumber(),
                drinks.getSize(),
                drinks.getTotalElements(),
                drinks.getTotalPages(),
                drinks.isFirst(),
                drinks.isLast()
        );
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "restaurant_drink_byId", key = "#restaurantId + '_' + #drinkId") // updated
    public DrinksResponse findDrinkByIdInRestaurant(Integer drinkId, Integer restaurantId) {

        Drink drink = drinkRepository.findByIdAndRestaurantId(drinkId, restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find drink with restaurantId: " + drinkId));
        return drinkMapper.toDrinkResponse(drink);

    }

    @Transactional(readOnly = true)
    @Cacheable(value = "restaurant_dish_byId", key = "#restaurantId + '_' + #dishId") //updated
    public DishesResponse findDishByIdInRestaurant(Integer dishId, Integer restaurantId) {

        Dishes dishes = dishesRepository.findByIdAndRestaurantId(dishId, restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find dish w ith provided restaurantId: " + dishId));
        return dishesMapper.toDishesResponse(dishes);

    }
    @Cacheable(value = "restaurant_allRestaurants", key = "#page + '_' + #size + '_' + #connectedUser") //updated
    public PageResponse<RestaurantResponse> findAllRestaurants(int page, int size, Authentication connectedUser){
        User user = ((User) connectedUser.getPrincipal());
        boolean isBusinessOwner = user.getRoles().stream()
                .anyMatch(role -> role.getName().equals("BUSINESS_OWNER"));
        var owId = user.getId();
        System.out.println("Owner restaurantId: " + owId);

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page <Restaurant> restaurants = restaurantRepository.findAllDisplayedRestaurants(pageable, user.getId());
        List<RestaurantResponse> restaurantResponses = restaurants.getContent().stream()
                        .map(restaurant -> {
                            if(isBusinessOwner || restaurant.getOwner().getId().equals(user.getId())){
                                return restaurantMapper.toRestaurantResponse(restaurant);
                            }
                            else {
                                return restaurantMapper.toPublicRestaurantResponse(restaurant);
                            }
                        })
                                .collect(Collectors.toList());
        System.out.println("Restaurants had been received: " + restaurantResponses.size());
        return new PageResponse<>(
          restaurantResponses,
          restaurants.getNumber(),
          restaurants.getSize(),
          restaurants.getTotalElements(),
          restaurants.getTotalPages(),
          restaurants.isFirst(),
          restaurants.isLast()
        );
    }
    @Cacheable(value = "restaurant_allRestaurantsNoDelivery", key = "#page + '_' + #size + '_' + #connectedUser")
    public PageResponse<RestaurantResponse> findAllRestaurantsWithoutDelivery(int page, int size, Authentication connectedUser){
        User user = ((User) connectedUser.getPrincipal());
        var Id = user.getId();
        System.out.println("User is here:" +Id);

        Pageable pageable = PageRequest.of(page, size , Sort.by("createdDate").descending());
        Page<Restaurant> restaurants = restaurantRepository.findAllDisplayedRestaurantsWithoutDelivery(pageable, user.getId());
        List<RestaurantResponse> responses = restaurants.map(restaurantMapper::toRestaurantResponse).stream().toList();
        System.out.println("Restaurants without delivery had been received" + responses.size());

        return new PageResponse<>(
                responses,
                restaurants.getNumber(),
                restaurants.getSize(),
                restaurants.getTotalElements(),
                restaurants.getTotalPages(),
                restaurants.isFirst(),
                restaurants.isLast()
        );
    }



   @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Cacheable(value = "restaurant:drinks_update", key = "#id + '_' + #updateRequest + '_' + #authentication") //updated
    public RestaurantResponse updateRestaurant(Integer id, RestaurantRequest updateRequest, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Restaurant existingRestaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find restaurant with provided restaurantId: " + id));

        if (!existingRestaurant.getOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("You don't have permission to update this restaurant");
        }
        existingRestaurant.setName(updateRequest.getRestaurantName());
        existingRestaurant.setAddress(updateRequest.getAddress());
        existingRestaurant.setPhoneNumber(updateRequest.getPhoneNumber());
        existingRestaurant.setEmail(updateRequest.getEmail());
        existingRestaurant.setDescription(updateRequest.getDescription());
        existingRestaurant.setOpeningHours(updateRequest.getOpeningHours());
        existingRestaurant.setCuisineType(updateRequest.getCuisineType());
        existingRestaurant.setAddress(updateRequest.getAddress());
        existingRestaurant.setSeatingCapacity(updateRequest.getSeatingCapacity());
        existingRestaurant.setDeliveryAvailable(updateRequest.isDeliveryAvailable());
        existingRestaurant.setWebsiteUrl(updateRequest.getWebsiteUrl());
         existingRestaurant.setLogoUrl(updateRequest.getLogoUrl());
        Restaurant updatedRestaurant = restaurantRepository.save(existingRestaurant);

        return restaurantMapper.toRestaurantResponse(updatedRestaurant);
    }


    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Transactional
    @CacheEvict(value = "restaurant_delete" , key = "#id + '_' + #connectedUser")
    public void deleteRestaurant(Integer id,  Authentication connectedUser){
        User user = ((User) connectedUser.getPrincipal());
        Restaurant existingRest = restaurantRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find restaurant with provided restaurantId:" + id))     ;
        if(!existingRest.getOwner().getId().equals(user.getId())){
            throw new AccessDeniedException("You don't have permission to delete the restaurant");
        }
        RestaurantTransactionHistory transactionHistory = RestaurantTransactionHistory
                .builder()
             //   .restaurant(existingRest)
                .user(user)
                .transactionType("DELETE")
                .transactionDate(LocalDateTime.now())
                .details("RestaurantController deleting")
                .build();
        restaurantTransactionHistoryRepository.save(transactionHistory);
        restaurantRepository.deleteById(id);
    }


    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Transactional
    @Cacheable(value = "restaurant_allDish", key = "#restaurantId + '_' + #request + '_' + #authentication")
    public DishesResponse addDishesToRestaurant (Integer restaurantId, DishesRequest request, Authentication authentication) throws InternalServerErrorException {
        User user = ((User) authentication.getPrincipal());
        Restaurant existingRest = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find restaurant with provided restaurantId:" + restaurantId));
        if (!existingRest.getOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("You don't have permission to add dishes to this restaurant");
        }
        try {
            Dishes dishes = createDishesFromRequest(request, existingRest, user);
            Dishes savedDish = dishesRepository.save(dishes);
            return dishesMapper.toDishesResponse(savedDish);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("Cannot add dish to the restaurant!");
        }
    }



    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Transactional
    @Cacheable(value = "restaurant_allDrinks", key = "#restaurantId + '_' + #request + '_' + #authentication")
    public DrinksResponse addDrinkToTheRestaurant(Integer restaurantId, DrinkRequest request, Authentication authentication){
        User user = ((User) authentication.getPrincipal());
        Restaurant existingRest = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new
                        EntityNotFoundException(
                                "Cannot find restaurant with provided restaurantId:" + restaurantId));
        if(!existingRest.getOwner().getId().equals(user.getId())){
            throw new AccessDeniedException("You don't have permission to adding this drink in the store");
        }
        try {
            Drink drink = createDrinkFromRequest(request, existingRest, user);
            Drink savedDrink = drinkRepository.save(drink);
            return drinkMapper.toDrinkResponse(savedDrink);
        }
        catch (EntityNotFoundException e){
            throw new EntityNotFoundException("Cannot add drink to the restaurant");
        }
    }



    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Transactional
    @CachePut(value = "restaurant_drinks_update", key = "#restaurantId + '_' + #drinkId + '_' + #request")
    public DrinksResponse updateDrinkInRestaurant(Integer restaurantId, Integer drinkId, DrinkRequest request, Authentication connectedUser) throws BadRequestException, InternalServerErrorException {
        User user = (User) connectedUser.getPrincipal();
        Restaurant existingRestaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find restaurant with provided restaurantId: " + restaurantId));

        if (!existingRestaurant.getOwner().getId().equals(user.getId())) {
            log.warn("User {} does not have permission to update drinks in restaurant {}", user.getId(), restaurantId);
            throw new AccessDeniedException("You don't have permission to update this drink in the restaurant");
        }

        Drink existingDrink = drinkRepository.findByIdAndRestaurantId(drinkId, restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find drink in restaurant with provided restaurantId: " + drinkId));

        try {
            updateDrinkProperties(existingDrink, request);
            Drink updatedDrink = drinkRepository.save(existingDrink);
            createTransactionHistory(updatedDrink, existingRestaurant, user);
            log.info("Drink with restaurantId {} in restaurant {} successfully updated", drinkId, restaurantId);
            return drinkMapper.toDrinkResponse(updatedDrink);
        } catch (IllegalArgumentException e) {
            log.error("Invalid data provided for drink update: {}", e.getMessage());
            throw new BadRequestException("Invalid data provided for drink update: " + e.getMessage());
        } catch (Exception e) {
            log.error("An error occurred while updating the drink: {}", e.getMessage(), e);
            throw new InternalServerErrorException("An error occurred while updating the drink: " + e.getMessage());
        }
    }
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Transactional
    @Cacheable(value = "restaurant_dish_update", key = "#restaurantId + '_' + #dishId + '_' + #request")
    public DishesResponse updateDishInRestaurant(Integer restaurantId, Integer dishId, DishesRequest request, Authentication connectedUser) throws BadRequestException, InternalServerErrorException {
        User user = (User) connectedUser.getPrincipal();
        Restaurant existingRestaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find restaurant with provided restaurantId: " + restaurantId));

        if (!existingRestaurant.getOwner().getId().equals(user.getId())) {
            log.warn("User {} does not have permission to update dish in restaurant {}", user.getId(), restaurantId);
            throw new AccessDeniedException("You don't have permission to update this dish in the restaurant");
        }

        Dishes existingDish = dishesRepository.findByIdAndRestaurantId(dishId, restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find dish with restaurantId " + dishId + " in restaurant with restaurantId: " + restaurantId));

        try {
            updateDishProperties(existingDish, request);
            Dishes updatedDish = dishesRepository.save(existingDish);
            createTransactionHistoryForDishes(updatedDish, existingRestaurant, user);
            log.info("Dish with restaurantId {} in restaurant {} successfully updated", dishId, restaurantId);
            return dishesMapper.toDishesResponse(updatedDish);
        } catch (IllegalArgumentException e) {
            log.error("Invalid data provided for dish update: {}", e.getMessage());
            throw new BadRequestException("Invalid data provided for dish update: " + e.getMessage());
        }  catch (Exception e) {
            log.error("An error occurred while updating the drink: {}", e.getMessage(), e);
            throw new InternalServerErrorException("An error occurred while updating the drink: " + e.getMessage());
        }
    }
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Transactional
  //  @CacheEvict(value = "restaurant_delete", key = "#dishesId + '_' + restaurantId + '_' + #connectedUser")
    public void deleteDishInsideRestaurant(Integer dishesId, Integer restaurantId, Authentication connectedUser) throws InternalServerErrorException {
        User user = ((User) connectedUser.getPrincipal());
        Restaurant existingRestaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find restaurant with provided restaurantId: " + restaurantId));
        if (!existingRestaurant.getOwner().getId().equals(user.getId())) {
            log.warn("User {} does not have permission to update dish in restaurant {}", user.getId(), restaurantId);
            throw new AccessDeniedException("You don't have permission to delete this dish in the restaurant");
        }
        Dishes deleteDish =  dishesRepository.findByIdAndRestaurantId(dishesId, restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find dish with provided restaurantId: " + dishesId));

          try{
              deletingTransactionHistoryForDishes(deleteDish, existingRestaurant, user);
              deleteDish.getHistories().clear();
              dishesRepository.delete(deleteDish);
              log.info("Dish with restaurantId {} successfully deleted from restaurant {}", dishesId, restaurantId);
          } catch (Exception e) {
              log.error("An error occurred while updating the drink: {}", e.getMessage(), e);
              throw new InternalServerErrorException("An error occurred while updating the drink: " + e.getMessage());
          }
    }
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Transactional
    //  @CacheEvict(value = "restaurant_delete", key = "#dishesId + '_' + restaurantId + '_' + #connectedUser")
    public void deleteDrinkInsideRestaurant(Integer drinkId, Integer restaurantId, Authentication connectedUser) throws InternalServerErrorException {
        User user = ((User) connectedUser.getPrincipal());
        Restaurant existingRestaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find restaurant with provided restaurantId: " + restaurantId));
        if (!existingRestaurant.getOwner().getId().equals(user.getId())) {
            log.warn("User {} does not have permission to update dish in restaurant {}", user.getId(), restaurantId);
            throw new AccessDeniedException("You don't have permission to delete this dish in the restaurant");
        }
        Drink deleteDrink =  drinkRepository.findByIdAndRestaurantId(drinkId, restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find dish with provided restaurantId: " + drinkId));

        try{
            deletingTransactionHistoryForDrinks(deleteDrink, existingRestaurant, user);
            deleteDrink.getHistories().clear();
            drinkRepository.delete(deleteDrink);
            log.info("Dish with restaurantId {} successfully deleted from restaurant {}", drinkId, restaurantId);
        } catch (Exception e) {
            log.error("An error occurred while updating the drink: {}", e.getMessage(), e);
            throw new InternalServerErrorException("An error occurred while updating the drink: " + e.getMessage());
        }
    }


    private void updateDrinkProperties(Drink drink, DrinkRequest request) {
        drink.setDrinksName(request.drinkName());
        drink.setDrinksDescription(request.drinkDescription());
        drink.setPrice(request.price());
        drink.setCalories(request.calories());
        drink.setCategory(request.category());
        drink.setInStock(request.inStock());
        drink.setAlcohol(request.isAlcohol());
    }

    private void updateDishProperties(Dishes dishes, DishesRequest request){
        dishes.setDishesName(request.dishesName());
        dishes.setDishesDescription(request.dishesDescription());
        dishes.setPrice(request.price());
        dishes.setCategory(request.category());
        dishes.setCalories(request.calories());
        dishes.setInStock(request.inStock());
    }

    private void createTransactionHistory(Drink drink, Restaurant restaurant, User user) {
        DrinksTransactionHistory transactionHistory = DrinksTransactionHistory.builder()
                .drink(drink)
                .restaurant(restaurant)
                .user(user)
                .transactionType("UPDATE")
                .transactionDate(LocalDateTime.now())
                .createdBy(user.getId())
                .createdDate(LocalDateTime.now())
                .lastModifiedBy(user.getId())
                .lastModifiedDate(LocalDateTime.now())
                .details("Updating drink")
                .build();
        drinksTransactionHistoryRepository.save(transactionHistory);
    }

    public void createTransactionHistoryForDishes(Dishes dishes, Restaurant restaurant, User user){
        DishesTransactionHistory dishesTransactionHistory = DishesTransactionHistory.builder()
                .dishes(dishes)
                .restaurant(restaurant)
                .user(user)
                .transactionType("UPDATE")
                .transactionDate(LocalDateTime.now())
                .createdBy(user.getId())
                .createdDate(LocalDateTime.now())
                .lastModifiedBy(user.getId())
                .lastModifiedDate(LocalDateTime.now())
                .already_ordered(false)
                .returned(false)
                .already_returned(false)
                .details("Updating dish")
                .build();
        dishesTransactionRepository.save(dishesTransactionHistory);
    }

    private void deletingTransactionHistoryForDishes(Dishes dishes, Restaurant restaurant, User user){
        DishesTransactionHistory dishesTransactionHistory = DishesTransactionHistory.builder()
                .dishes(dishes)
                .restaurant(restaurant)
                .user(user)
                .transactionType("DELETE")
                .transactionDate(LocalDateTime.now())
                .createdBy(user.getId())
                .createdDate(LocalDateTime.now())
                .lastModifiedBy(user.getId())
                .lastModifiedDate(LocalDateTime.now())
                .details("Deleting dish from restaurant")
                .build();
        dishesTransactionRepository.save(dishesTransactionHistory);
    }

    private void deletingTransactionHistoryForDrinks(Drink drink, Restaurant restaurant, User user){
        DrinksTransactionHistory drinksTransactionHistory = DrinksTransactionHistory.builder()
                .drink(drink)
                .restaurant(restaurant)
                .user(user)
                .transactionType("DELETING")
                .transactionDate(LocalDateTime.now())
                .createdBy(user.getId())
                .createdDate(LocalDateTime.now())
                .lastModifiedBy(user.getId())
                .lastModifiedDate(LocalDateTime.now())
                .details("Deleting drink")
                .build();
        drinksTransactionHistoryRepository.save(drinksTransactionHistory);
    }

    public Dishes createDishesFromRequest(DishesRequest request, Restaurant restaurant, User user){
        Dishes dishes = new Dishes();
        updateDishFromRequest(dishes, request);
        dishes.setRestaurant(restaurant);
        dishes.setOwner(user);
        return dishes;
    }

    public void updateDishFromRequest(Dishes dishes, DishesRequest request){
        dishes.setDishesName(request.dishesName());
        dishes.setDishesDescription(request.dishesDescription());
        dishes.setPrice(request.price());
        dishes.setCalories(request.calories());
        dishes.setInStock(request.inStock());
        dishes.setCategory(request.category());
    }


    public Drink createDrinkFromRequest(DrinkRequest request, Restaurant restaurant, User user){
        Drink drink = new Drink();
        updateDrinkRequest(drink, request);
        drink.setRestaurant(restaurant);
        drink.setOwner(user);
        return drink;
    }
    public void updateDrinkRequest(Drink drink, DrinkRequest drinkRequest){
        drink.setDrinksName(drinkRequest.drinkName());
        drink.setDrinksDescription(drinkRequest.drinkDescription());
        drink.setPrice(drinkRequest.price());
        drink.setCalories(drinkRequest.calories());
        drink.setInStock(drinkRequest.inStock());
        drink.setCategory(drink.getCategory());
        drink.setAlcohol(drinkRequest.isAlcohol());
    }


    // i want to provide for entity, separate settings for change!
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Cacheable(value = "restaurants", key = "#restaurantId")
    public RestaurantResponse showAllRestaurantInformation(Integer restaurantId, Authentication connectedUser) {
        User currentUser = ((User) connectedUser.getPrincipal());
        if (!currentUser.getId().equals(restaurantId)) {
            throw new AccessDeniedException("You dont have an access ti change restaurant information!");
        }
        var existedRestaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));
        return restaurantMapper.toRestaurantResponse(existedRestaurant);
    }



        @PreAuthorize("hasRole('BUSINESS_OWNER')")
        @CachePut(value = "restaurants", key = "#restaurantId")
        public RestaurantResponse changeRestaurantName(Integer restaurantId, String restaurantName){
        Restaurant existedRest = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find Restaurant with provided id: " + restaurantId));
       if(restaurantName != null && !restaurantName.isEmpty()){
           existedRest.setName(restaurantName);
       }
       Restaurant updatedRestaurant = restaurantRepository.save(existedRest);
       return restaurantMapper.toRestaurantResponse(updatedRestaurant);
    }

    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @CachePut(value = "restaurants", key = "#restaurantId")
    public RestaurantResponse changeAddress(Integer restaurantId, String address){
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find Restaurant with provided id: " + restaurantId));
    if(address != null && !address.isEmpty()){
        restaurant.setAddress(address);
    }
    return restaurantMapper.toRestaurantResponse(restaurant);
    }

    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @CachePut(value = "restaurants", key = "#restaurantId")
    public RestaurantResponse changePhoneNumber(Integer restaurantId, String phoneNumber){
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find Restaurant with provided id: " + restaurantId));
        if(phoneNumber != null && !phoneNumber.isEmpty()){
            restaurant.setPhoneNumber(phoneNumber);
        }
        return restaurantMapper.toRestaurantResponse(restaurant);
    }
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @CachePut(value = "restaurants", key = "#restaurantId")
    public RestaurantResponse changeEmail(Integer restaurantId, String email){
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find Restaurant with provided id: " + restaurantId));
        if(email != null && !email.isEmpty()){
            restaurant.setEmail(email);
        }
        return restaurantMapper.toRestaurantResponse(restaurant);
    }

    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @CachePut(value = "restaurants", key = "#restaurantId")
    public RestaurantResponse changeDescription(Integer restaurantId, String description){
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find Restaurant with provided id: " + restaurantId));
        if(description != null && !description.isEmpty()){
            restaurant.setDescription(description);
        }
        return restaurantMapper.toRestaurantResponse(restaurant);
    }
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @CachePut(value = "restaurants", key = "#restaurantId")
    public RestaurantResponse changeOpenedHours(Integer restaurantId, String openedHours){
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find Restaurant with provided id: " + restaurantId));
        if(openedHours != null && !openedHours.isEmpty()){
            restaurant.setOpeningHours(openedHours);
        }
        return restaurantMapper.toRestaurantResponse(restaurant);
    }

    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @CachePut(value = "restaurants", key = "#restaurantId")
    public RestaurantResponse changeCusineType(Integer restaurantId, String cusineType){
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find Restaurant with provided id: " + restaurantId));
        if(cusineType != null && !cusineType.isEmpty()){
            restaurant.setCuisineType(cusineType);
        }
        return restaurantMapper.toRestaurantResponse(restaurant);
    }


    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @CachePut(value = "restaurants", key = "#restaurantId")
    public RestaurantResponse changeSeatingCapacity(Integer restaurantId, String seatingCapacity){
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find Restaurant with provided id: " + restaurantId));
        if(seatingCapacity != null && !seatingCapacity.isEmpty()){
            restaurant.setSeatingCapacity(Integer.valueOf(seatingCapacity));
        }
        return restaurantMapper.toRestaurantResponse(restaurant);
    }

    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @CachePut(value = "restaurants", key = "#restaurantId")
    public RestaurantResponse changeWebSiteUrl(Integer restaurantId, String webSiteUrl){
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find Restaurant with provided id: " + restaurantId));
        if(webSiteUrl != null && !webSiteUrl.isEmpty()){
            restaurant.setWebsiteUrl(webSiteUrl);
        }
        return restaurantMapper.toRestaurantResponse(restaurant);
    }

    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @CachePut(value = "restaurants", key = "#restaurantId")
    public RestaurantResponse changeAvailableDelivery(Integer restaurantId, boolean availableDelivery){
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find Restaurant with provided id: " + restaurantId));
       restaurant.setDeliveryAvailable(availableDelivery);
        return restaurantMapper.toRestaurantResponse(restaurant);
    }



























}
