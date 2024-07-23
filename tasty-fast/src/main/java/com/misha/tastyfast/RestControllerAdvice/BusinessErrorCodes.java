package com.misha.tastyfast.RestControllerAdvice;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum BusinessErrorCodes {

    NO_CODE(0, HttpStatus.NOT_IMPLEMENTED, "No code"),
    INCORECT_CURRENT_PASSWORD(300, HttpStatus.BAD_REQUEST, "Current password is incorrect"),
    NEW_PASSWORD_DOESNT_MATCH(301, HttpStatus.BAD_REQUEST, "The new password does not match"),
    ACCOUNT_LOCKED(302, HttpStatus.FORBIDDEN, "User account is locked"),
    ACCOUNT_DISABLED(303, HttpStatus.FORBIDDEN, "User account is disabled"),
    BAD_CREDENTIALS(304, HttpStatus.FORBIDDEN, "Login and / or password is incorrect"),
    //Cart service!
    CART_UPDATE_FORBIDDEN(305, HttpStatus.FORBIDDEN, "Not allowed to update items in cart"),
    CART_ITEM_REMOVE_FAILED(306, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to remove item from cart"),
    CART_ITEM_ADD_FAILED(307, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to add item to cart"),
    CART_CLEAR_FAILED(308, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to clear items from cart"),
    ORDER_CREATION_FAILED(309, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to create order"),
//  Dishes service
    DISHES_SAVE_FAILED(310, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to save dish"),
    DISHES_FIND_FAILED(311, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to find dish"),
    DISHES_FIND_BY_OWNER_FAILED(312, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to find dish by owner"),
    DISHES_PICTURE_UPLOADING_FAILED(313, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to upload dish picture"),
// DRINK SERVICE
    DRINK_SAVE_FAILED(314, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to save drink"),
    DRINK_FIND_FAILED(315, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to find drink"),
    DRINK_FIND_BY_OWNER_FAILED(316, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to find drink by owner"),
    DRINK_PICTURE_UPLOADING_FAILED(317, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to upload drink picture"),
// favorite service
    FAVORITE_ADD_FAILED(318, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to add favorite item"),
    FAVORITE_SHOW_FAILED(319, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to show favorite item"),
// notification service
    CREATE_NOTIFICATION_FAILED(320, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to create notification"),
    GET_UNREAD_NOTIFICATION_FAILED(321, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to get notification"),
    MARK_AS_READ_FAILED(322, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to mark as read"),
    // ORDER SERVICE
    CREATE_ORDER_FAILED(323, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to create order"),
    CREATE_ORDER_ITEM_FAILED(324, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to create order item"),
    ORDER_FIND_FAILED(325, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to find order"),
    GET_ALL_ORDERS_FAILED(326, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to get all orders"),
    CREATE_ORDER_FROM_CART_FAILED(327, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to create order from cart"),
    ORDER_DETAILS_FAILED(325, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to find order details"),
    // Product Service
    PRODUCT_SAVING_FAILED(326, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to save product"),
    PRODUCT_FIND_FAILED(327, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to find product"),
    ALL_PRODUCTS_FAILED(328, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to find all products"),
    ALL_PRODUCTS_BY_OWNER(329, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to find all products by owner"),
    UPLOADING_PRODUCT_PICTURE_FAILED(330, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to upload product picture"),
    // USER SERVICE

    SHOW_ALL_USER_INFORMATION(331, HttpStatus.FORBIDDEN, "Failed to show all user information"),
    USER_UPDATING_FAILED(332, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to update user"),
    DELETING_USER_FAILED(333, HttpStatus.FORBIDDEN, "Failed to delete user"),
    // BUSINESSES_SERVICES
    BUSINESSES_NOT_FOUND(334, HttpStatus.NOT_FOUND, "Restaurant not found"),
    BUSINESSES_CREATING_FAILED(335, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to create restaurant"),
    BUSINESS_FIND_ID_FAILED(336, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to find id"),
    BUSINESSES_FIND_DISHES_FAILED(337, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to find dish"),
    BUSINESSES_FIND_PRODUCT_FAILED(338, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to find product"),
    BUSINESSES_FIND_DRINKS_FAILED(339, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to find drink"),
    FIND_ALL_BUSINESSES_FAILED(340, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to find all businesses"),
    FIND_ALL_BUSINESSES_WITHOUT_DELIVERY_FAILED(341, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to find all businesses"),
    BUSINESSES_UPDATE_FAILED(342, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to update restaurant"),
    BUSINESSES_DELETE_FAILED(343, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to delete restaurant"),
    FOOD_ADDING_FAILED(344, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to add food"),
    FOOD_UPDATING_FAILED(345, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to update food"),
    DELETING_INSIDE_BUSINESSES_FAILED(346, HttpStatus.UNPROCESSABLE_ENTITY, "Failed to delete inside"),


    ;

    @Getter
    private final int code;
    @Getter
    private final String description;
    @Getter
    private final HttpStatus httpStatus;

    BusinessErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.description = description;
        this.httpStatus = httpStatus;
    }
}
