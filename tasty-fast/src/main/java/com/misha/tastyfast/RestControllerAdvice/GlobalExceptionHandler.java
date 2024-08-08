package com.misha.tastyfast.RestControllerAdvice;

import com.misha.tastyfast.exception.*;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashSet;
import java.util.Set;

import static com.misha.tastyfast.RestControllerAdvice.BusinessErrorCodes.*;
import static org.springframework.http.HttpStatus.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(LockedException.class)
    public ResponseEntity<ExceptionResponse> handleException(LockedException ex) {
        return ResponseEntity
                .status(UNAUTHORIZED)
                .body(
                  ExceptionResponse.builder()
                          .businessErrorCode(ACCOUNT_LOCKED.getCode())
                          .businessErrorDescription(ACCOUNT_LOCKED.getDescription())
                          .error(ex.getMessage())
                          .build()
                );



    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ExceptionResponse> handleException(DisabledException ex) {
        return ResponseEntity
                .status(UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(ACCOUNT_DISABLED.getCode())
                                .businessErrorDescription(ACCOUNT_DISABLED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );

    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleException(BadCredentialsException ex) {
        return ResponseEntity
                .status(UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BAD_CREDENTIALS.getCode())
                                .businessErrorDescription(BAD_CREDENTIALS.getDescription())
                                .error(ex.getMessage())
                                .build()
                );

    }

    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<ExceptionResponse> handleException(MessagingException ex) {
        return ResponseEntity
                .status(INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .error(ex.getMessage())
                                .build()
                );

    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleException(MethodArgumentNotValidException ex) {
        Set<String> errors = new HashSet<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            var errorMessage = error.getDefaultMessage();
            errors.add(errorMessage);
        });
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .validationErrors(errors)
                                .error(ex.getMessage())
                                .build()
                );

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception ex) {
        ex.printStackTrace();
        return ResponseEntity
                .status(INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorDescription("Internal error, contact the support")
                                .error(ex.getMessage())
                                .build()
                );

    }

    @ExceptionHandler(CartUpdateForbidenException.class)
    public ResponseEntity<ExceptionResponse> handleException(CartUpdateForbidenException ex) {
        return ResponseEntity
                .status(FORBIDDEN)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(CART_UPDATE_FORBIDDEN.getCode())
                                .businessErrorDescription(CART_UPDATE_FORBIDDEN.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(CartItemRemoveFailedException.class)
    public ResponseEntity<ExceptionResponse> handleException(CartItemRemoveFailedException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(CART_ITEM_REMOVE_FAILED.getCode())
                                .businessErrorDescription(CART_ITEM_REMOVE_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(CartItemAddFailedException.class)
    public ResponseEntity<ExceptionResponse> handleException(CartItemAddFailedException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(CART_ITEM_ADD_FAILED.getCode())
                                .businessErrorDescription(CART_ITEM_ADD_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(CartClearException.class)
    public ResponseEntity<ExceptionResponse> handleException5(CartClearException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(CART_CLEAR_FAILED.getCode())
                                .businessErrorDescription(CART_CLEAR_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(OrderCreatingFailedException.class)
    public ResponseEntity<ExceptionResponse> handleException6(OrderCreatingFailedException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(ORDER_CREATION_FAILED.getCode())
                                .businessErrorDescription(ORDER_CREATION_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(DishesSaveFailedException.class)
    public ResponseEntity<ExceptionResponse> handleException7(DishesSaveFailedException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(DISHES_SAVE_FAILED.getCode())
                                .businessErrorDescription(DISHES_SAVE_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(DishesFindFailedException.class)
    public ResponseEntity<ExceptionResponse> handleException8(DishesFindFailedException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(DISHES_FIND_FAILED.getCode())
                                .businessErrorDescription(DISHES_FIND_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(DishesFindByOwnerException.class)
    public ResponseEntity<ExceptionResponse> handleException9(DishesFindByOwnerException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(DISHES_FIND_BY_OWNER_FAILED.getCode())
                                .businessErrorDescription(DISHES_FIND_BY_OWNER_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(DishesPictureException.class)
    public ResponseEntity<ExceptionResponse> handleException10(DishesPictureException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(DISHES_PICTURE_UPLOADING_FAILED.getCode())
                                .businessErrorDescription(DISHES_PICTURE_UPLOADING_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(DrinkSaveException.class)
    public ResponseEntity<ExceptionResponse> handleException11(DrinkSaveException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(DRINK_SAVE_FAILED.getCode())
                                .businessErrorDescription(DRINK_SAVE_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(FindDrinkException.class)
    public ResponseEntity<ExceptionResponse> handleException12(FindDrinkException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(DRINK_FIND_FAILED.getCode())
                                .businessErrorDescription(DRINK_FIND_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(DrinkFindByOwnerException.class)
    public ResponseEntity<ExceptionResponse> handleException13(DrinkFindByOwnerException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(DRINK_FIND_BY_OWNER_FAILED.getCode())
                                .businessErrorDescription(DRINK_FIND_BY_OWNER_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(DrinkPictureException.class)
    public ResponseEntity<ExceptionResponse> handleException14(DrinkPictureException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(DRINK_PICTURE_UPLOADING_FAILED.getCode())
                                .businessErrorDescription(DRINK_PICTURE_UPLOADING_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(FavoriteAddFailedException.class)
    public ResponseEntity<ExceptionResponse> handleException15(FavoriteAddFailedException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(FAVORITE_ADD_FAILED.getCode())
                                .businessErrorDescription(FAVORITE_ADD_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(FavoriteShowFailedException.class)
    public ResponseEntity<ExceptionResponse> handleException16(FavoriteShowFailedException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(FAVORITE_SHOW_FAILED.getCode())
                                .businessErrorDescription(FAVORITE_SHOW_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(CreateNotificationException.class)
    public ResponseEntity<ExceptionResponse> handleException17(CreateNotificationException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(CREATE_NOTIFICATION_FAILED.getCode())
                                .businessErrorDescription(CREATE_NOTIFICATION_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(UnreadNotificationException.class)
    public ResponseEntity<ExceptionResponse> handleException18(UnreadNotificationException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(GET_UNREAD_NOTIFICATION_FAILED.getCode())
                                .businessErrorDescription(GET_UNREAD_NOTIFICATION_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(MarkAsReadFailedException.class)
    public ResponseEntity<ExceptionResponse> handleException19(MarkAsReadFailedException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(MARK_AS_READ_FAILED.getCode())
                                .businessErrorDescription(MARK_AS_READ_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(CreateOrderFailedException.class)
    public ResponseEntity<ExceptionResponse> handleException20(CreateOrderFailedException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(CREATE_ORDER_FAILED.getCode())
                                .businessErrorDescription(CREATE_ORDER_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(OrderFindFailedException.class)
    public ResponseEntity<ExceptionResponse> handleException21(OrderFindFailedException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(ORDER_FIND_FAILED.getCode())
                                .businessErrorDescription(ORDER_FIND_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(GetAllOrderException.class)
    public ResponseEntity<ExceptionResponse> handleException22(GetAllOrderException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(GET_ALL_ORDERS_FAILED.getCode())
                                .businessErrorDescription(GET_ALL_ORDERS_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(CreateOrderFromCartFailed.class)
    public ResponseEntity<ExceptionResponse> handleException23(CreateOrderFromCartFailed ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(CREATE_ORDER_FROM_CART_FAILED.getCode())
                                .businessErrorDescription(CREATE_ORDER_FROM_CART_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(OrderDetailesFailed.class)
    public ResponseEntity<ExceptionResponse> handleException24(OrderDetailesFailed ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(ORDER_DETAILS_FAILED.getCode())
                                .businessErrorDescription(ORDER_DETAILS_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(ProuctSavingFailedException.class)
    public ResponseEntity<ExceptionResponse> handleException25(ProuctSavingFailedException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(PRODUCT_SAVING_FAILED.getCode())
                                .businessErrorDescription(PRODUCT_SAVING_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(ProductFindFailedException.class)
    public ResponseEntity<ExceptionResponse> handleException26(ProductFindFailedException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(PRODUCT_FIND_FAILED.getCode())
                                .businessErrorDescription(PRODUCT_FIND_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(AllProductsException.class)
    public ResponseEntity<ExceptionResponse> handleException27(AllProductsException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(ALL_PRODUCTS_FAILED.getCode())
                                .businessErrorDescription(ALL_PRODUCTS_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(AllProductsByOwnerException.class)
    public ResponseEntity<ExceptionResponse> handleException28(AllProductsByOwnerException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(ALL_PRODUCTS_BY_OWNER.getCode())
                                .businessErrorDescription(ALL_PRODUCTS_BY_OWNER.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(UploadingPictureException.class)
    public ResponseEntity<ExceptionResponse> handleException29(UploadingPictureException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(UPLOADING_PRODUCT_PICTURE_FAILED.getCode())
                                .businessErrorDescription(UPLOADING_PRODUCT_PICTURE_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(UserUpdatingFailedException.class)
    public ResponseEntity<ExceptionResponse> handleException30(UserUpdatingFailedException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(USER_UPDATING_FAILED.getCode())
                                .businessErrorDescription(USER_UPDATING_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(DeleteUserException.class)
    public ResponseEntity<ExceptionResponse> handleException31(DeleteUserException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(DELETING_USER_FAILED.getCode())
                                .businessErrorDescription(DELETING_USER_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(BusinessNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleException32(BusinessNotFoundException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BUSINESSES_NOT_FOUND.getCode())
                                .businessErrorDescription(BUSINESSES_NOT_FOUND.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(BusinessCreatingFailedException.class)
    public ResponseEntity<ExceptionResponse> handleException33(BusinessCreatingFailedException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BUSINESSES_CREATING_FAILED.getCode())
                                .businessErrorDescription(BUSINESSES_CREATING_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(BusinessFindIdFailedException.class)
    public ResponseEntity<ExceptionResponse> handleException34(BusinessFindIdFailedException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BUSINESS_FIND_ID_FAILED.getCode())
                                .businessErrorDescription(BUSINESS_FIND_ID_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(BuisinessFindDishesException.class)
    public ResponseEntity<ExceptionResponse> handleException35(BuisinessFindDishesException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BUSINESSES_FIND_DISHES_FAILED.getCode())
                                .businessErrorDescription(BUSINESSES_FIND_DISHES_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(BusinessFindProductException.class)
    public ResponseEntity<ExceptionResponse> handleException36(BusinessFindProductException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BUSINESSES_FIND_PRODUCT_FAILED.getCode())
                                .businessErrorDescription(BUSINESSES_FIND_PRODUCT_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(BusinessFindDrinkException.class)
    public ResponseEntity<ExceptionResponse> handleException37(BusinessFindDrinkException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BUSINESSES_FIND_DRINKS_FAILED.getCode())
                                .businessErrorDescription(BUSINESSES_FIND_DRINKS_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(FindAllBusinessException.class)
    public ResponseEntity<ExceptionResponse> handleException38(FindAllBusinessException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(FIND_ALL_BUSINESSES_FAILED.getCode())
                                .businessErrorDescription(FIND_ALL_BUSINESSES_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(FindAllBusinessesWithoutDeliveryException.class)
    public ResponseEntity<ExceptionResponse> handleException39(FindAllBusinessesWithoutDeliveryException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(FIND_ALL_BUSINESSES_WITHOUT_DELIVERY_FAILED.getCode())
                                .businessErrorDescription(FIND_ALL_BUSINESSES_WITHOUT_DELIVERY_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(BusinessUpdateException.class)
    public ResponseEntity<ExceptionResponse> handleException40(BusinessUpdateException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BUSINESSES_UPDATE_FAILED.getCode())
                                .businessErrorDescription(BUSINESSES_UPDATE_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(BusinessDeleteException.class)
    public ResponseEntity<ExceptionResponse> handleException41(BusinessDeleteException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BUSINESSES_DELETE_FAILED.getCode())
                                .businessErrorDescription(BUSINESSES_DELETE_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(FoodAddingException.class)
    public ResponseEntity<ExceptionResponse> handleException42(FoodAddingException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(FOOD_ADDING_FAILED.getCode())
                                .businessErrorDescription(FOOD_ADDING_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(FoodUpdatingException.class)
    public ResponseEntity<ExceptionResponse> handleException43(FoodUpdatingException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(FOOD_UPDATING_FAILED.getCode())
                                .businessErrorDescription(FOOD_UPDATING_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(DeleteInsideBisonessException.class)
    public ResponseEntity<ExceptionResponse> handleException44(DeleteInsideBisonessException ex) {
        return ResponseEntity
                .status(UNPROCESSABLE_ENTITY)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(DELETING_INSIDE_BUSINESSES_FAILED.getCode())
                                .businessErrorDescription(DELETING_INSIDE_BUSINESSES_FAILED.getDescription())
                                .error(ex.getMessage())
                                .build()
                );
    }




















}
