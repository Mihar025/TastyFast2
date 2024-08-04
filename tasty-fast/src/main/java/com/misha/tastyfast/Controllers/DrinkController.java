package com.misha.tastyfast.Controllers;

import com.misha.tastyfast.model.Drink;
import com.misha.tastyfast.model.Restaurant;
import com.misha.tastyfast.model.User;
import com.misha.tastyfast.repositories.DrinkRepository;
import com.misha.tastyfast.requests.drinkRequests.DrinkRequest;
import com.misha.tastyfast.requests.drinkRequests.DrinksResponse;
import com.misha.tastyfast.requests.pageResponse.PageResponse;
import com.misha.tastyfast.requests.restaurantRequests.RestaurantResponse;
import com.misha.tastyfast.services.DrinkService;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("drink")
@RequiredArgsConstructor
public class DrinkController {

    private final DrinkService drinkService;
    private final DrinkRepository drinkRepository;

    @PostMapping(value = "/drink-logo/{drinkId}", consumes = {"image/webp", "multipart/form-data"})
    public ResponseEntity<?> uploadDrinkLogo(
            @PathVariable("drinkId") Integer drinkId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication authentication
    ){
        drinkService.uploadDrinkLogo(file,authentication, drinkId);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/logo/{drinkId}")
    public ResponseEntity<Resource> getDrinkLogo(@PathVariable Integer drinkId, Authentication authentication) throws IOException {
        User user = ((User) authentication.getPrincipal());

        Drink drink = drinkRepository.findById(drinkId)
        .orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));

        String logoPath = drink.getLogo();

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






    @PostMapping
    public ResponseEntity<Integer> createDrink(@RequestBody DrinkRequest drinkRequest, Authentication authentication) {
        Integer drinkId = drinkService.save(drinkRequest, authentication);
        return ResponseEntity.ok(drinkId);
    }

    @GetMapping("/{drinkId}")
    public ResponseEntity<DrinksResponse> getDrinkById(@PathVariable Integer drinkId, Authentication authentication) {
        DrinksResponse drinkResponse = drinkService.findDrinkById(drinkId, authentication);
        return ResponseEntity.ok(drinkResponse);
    }

    @GetMapping
    public ResponseEntity<PageResponse<DrinksResponse>> getAllDrinks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        PageResponse<DrinksResponse> response = drinkService.findAllDrinks(page, size, authentication);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my-drinks")
    public ResponseEntity<PageResponse<DrinksResponse>> getMyDrinks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        PageResponse<DrinksResponse> response = drinkService.findAllDrinkByOwner(page, size, authentication);
        return ResponseEntity.ok(response);
    }


}
