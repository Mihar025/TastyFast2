package com.misha.tastyfast.services;

import com.misha.tastyfast.model.*;
import com.misha.tastyfast.repositories.*;
import com.misha.tastyfast.requests.favoriteRequests.FavoriteItemResponse;
import com.misha.tastyfast.requests.favoriteRequests.FavoriteRequest;
import com.misha.tastyfast.requests.favoriteRequests.FavoriteResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final RestaurantRepository restaurantRepository;
    private final StoreRepository storeRepository;
    private final ProductRepository productRepository;
    private  final DrinkRepository drinkRepository;
    private final UserRepository userRepository;
    private  final DishesRepository dishesRepository;

    private final Map<String, JpaRepository<?, Integer>> repositories;

    public FavoriteResponse addToFavoriteList(FavoriteRequest request){
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        if(request.getProductId() != null){
            Product product = productRepository.findById(request.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            favorite.setProduct(product);
            favorite.setFavorite("PRODUCT");
        }
        else if(request.getDishesId() != null){
            Dishes dishes = dishesRepository.findById(request.getDishesId())
                    .orElseThrow(() -> new RuntimeException("Dishes not found"));
            favorite.setDishes(dishes);
            favorite.setFavorite("DISHES");
        }
        else if(request.getDrinkId() != null){
            Drink drink = drinkRepository.findById(request.getDrinkId())
                    .orElseThrow(() -> new RuntimeException("Drink not found"));
            favorite.setDrink(drink);
            favorite.setFavorite("DRINK");
        }
        else if(request.getRestaurantId() != null){
            Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                    .orElseThrow(() -> new RuntimeException("Restaurant not found"));
            favorite.setRestaurant(restaurant);
            favorite.setFavorite("RESTAURANT");
        }
        else if(request.getStoreId() != null){
            Store store = storeRepository.findById(request.getStoreId())
                    .orElseThrow(() -> new RuntimeException("Store not found"));
            favorite.setStore(store);
            favorite.setFavorite("STORE");
        }

        favoriteRepository.save(favorite);
        List<Favorite> favorites = favoriteRepository.findAllByUser(user);
        return new FavoriteResponse(favorites);
    }


    public List<FavoriteItemResponse> getUserFavorite(Authentication authentication){
        User user = ((User) authentication.getPrincipal());
        List<Favorite> favorites = favoriteRepository.findAllByUser(user);
        return favorites.stream()
                .map(this::mapFavoriteToResponse)
                .collect(Collectors.toList());
    }

    private FavoriteItemResponse mapFavoriteToResponse(Favorite favorite) {
        JpaRepository<? ,Integer> repository = repositories.get(favorite.getFavorite());
        Object item = repository.findById(favorite.getId())
                .orElseThrow(() -> new EntityNotFoundException(favorite.getFavorite() + " not found"));

        return FavoriteItemResponse.builder()
                .id(favorite.getId())
                .type(favorite.getFavorite())
                .itemId(favorite.getId())
                .name(getItemName(item))
                .build();
    }

    private String getItemName(Object item) {
        if (item instanceof Product) return ((Product) item).getProductName();
        if (item instanceof Dishes) return ((Dishes) item).getDishesName();
        if (item instanceof Drink) return ((Drink) item).getDrinksName();
        if (item instanceof Restaurant) return ((Restaurant) item).getName();
        if (item instanceof Store) return ((Store) item).getName();
        return "Unknown";
    }
}
