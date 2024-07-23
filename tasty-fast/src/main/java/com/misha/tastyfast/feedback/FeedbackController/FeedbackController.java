package com.misha.tastyfast.feedback.FeedbackController;

import com.misha.tastyfast.feedback.FeedbackService.FeedbackService;
import com.misha.tastyfast.feedback.req.FeedBackRequest;
import com.misha.tastyfast.feedback.req.FeedBackResponse;
import com.misha.tastyfast.requests.pageResponse.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("feedbacks")
@RequiredArgsConstructor
@Tag(name = "Feedback")
public class FeedbackController {

    private final FeedbackService service;

    @PostMapping
    public ResponseEntity<Integer> saveFeedBack(
            @Valid @RequestBody FeedBackRequest request,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.save(request, connectedUser));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<PageResponse<FeedBackResponse>> findAllFeedBacksByProduct(
            @PathVariable("productId") Integer productId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.findAllFeedBacksByProduct(productId, page, size, connectedUser));
    }

    @GetMapping("/dishes/{dishesId}")
    public ResponseEntity<PageResponse<FeedBackResponse>> findAllFeedBacksByDishes(
            @PathVariable("dishesId") Integer dishesId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.findAllFeedBacksByDishes(dishesId, page, size, connectedUser));
    }

    @GetMapping("/drink/{drinkId}")
    public ResponseEntity<PageResponse<FeedBackResponse>> findAllFeedBacksByDrink(
            @PathVariable("drinkId") Integer drinkId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.findAllFeedBacksByDrink(drinkId, page, size, connectedUser));
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<PageResponse<FeedBackResponse>> findAllFeedBacksByRestaurant(
            @PathVariable("restaurantId") Integer restaurantId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.findAllFeedBacksByRestaurant(restaurantId, page, size, connectedUser));
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<PageResponse<FeedBackResponse>> findAllFeedBacksByStore(
            @PathVariable("storeId") Integer storeId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.findAllFeedBacksByStore(storeId, page, size, connectedUser));
    }

    @DeleteMapping("/{businessId}")
    public void deleteFeedback(
            @PathVariable("businessId") Integer businessId,
            Authentication connectedUser
    ) throws Exception {
        service.deleteFeedBackById(businessId, connectedUser);
    }




}
