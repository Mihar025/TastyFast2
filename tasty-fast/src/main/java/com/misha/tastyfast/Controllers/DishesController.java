package com.misha.tastyfast.Controllers;

import com.misha.tastyfast.model.Dishes;
import com.misha.tastyfast.model.Drink;
import com.misha.tastyfast.model.User;
import com.misha.tastyfast.repositories.DishesRepository;
import com.misha.tastyfast.requests.dishesRequests.DishesRequest;
import com.misha.tastyfast.requests.dishesRequests.DishesResponse;
import com.misha.tastyfast.requests.pageResponse.PageResponse;
import com.misha.tastyfast.services.DishesService;
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
@RequestMapping("dishes")
@RequiredArgsConstructor
public class DishesController {
    private final DishesService dishesService;
    private final DishesRepository dishesRepository;

    @PostMapping(value = "/dishes-logo/{dishesId}", consumes = {"image/webp", "multipart/form-data"})
    public ResponseEntity<?> uploadDishesLogo(
            @PathVariable("dishesId") Integer dishesId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication authentication
    ){
        dishesService.uploadDishesLogo(file,authentication, dishesId);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/logo/{dishesId}")
    public ResponseEntity<Resource> getDishesLogo(@PathVariable Integer dishesId, Authentication authentication) throws IOException {
        User user = ((User) authentication.getPrincipal());

        Dishes dishes = dishesRepository.findById(dishesId)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));

        String logoPath = dishes.getLogo();

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
    public ResponseEntity<Integer> createDish(@RequestBody DishesRequest dishesRequest, Authentication authentication) {
        Integer dishId = dishesService.save(dishesRequest, authentication);
        return ResponseEntity.ok(dishId);
    }

    @GetMapping("/{dishId}")
    public ResponseEntity<DishesResponse> getDishById(@PathVariable Integer dishId, Authentication authentication) {
        DishesResponse dishesResponse = dishesService.findDishesById(dishId, authentication);
        return ResponseEntity.ok(dishesResponse);
    }

    @GetMapping
    public ResponseEntity<PageResponse<DishesResponse>> getAllDishes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        PageResponse<DishesResponse> response = dishesService.findAllDishes(page, size, authentication);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my-dishes")
    public ResponseEntity<PageResponse<DishesResponse>> getMyDishes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        PageResponse<DishesResponse> response = dishesService.findAllDishesByOwner(page, size, authentication);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{dishId}/cover")
    public ResponseEntity<Void> uploadDishCover(
            @PathVariable Integer dishId,
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {
        dishesService.uploadProductCoverPicture(file, authentication, dishId);
        return ResponseEntity.ok().build();
    }


}
