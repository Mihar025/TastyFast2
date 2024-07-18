package com.misha.tastyfast.mapping;

import com.misha.tastyfast.model.Restaurant;
import com.misha.tastyfast.model.Store;
import com.misha.tastyfast.model.User;
import com.misha.tastyfast.requests.userRequests.UserRequest;
import com.misha.tastyfast.requests.userRequests.UserResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserMapper {

            public User toUser(UserRequest request){
                return User.builder()
                        .firstname(request.getFirstName())
                        .lastname(request.getLastName())
                        .dateOfBirth(request.getDateOfBirth())
                        .email(request.getEmail())
                        .street(request.getStreet())
                        .password(request.getPassword())
                        .build();
            }

            public UserResponse userResponse (User user){
                List<String> allBusinesses = new ArrayList<>();
                if(user.getRestaurants() != null){
                    allBusinesses.addAll(user.getRestaurants().stream()
                            .map(Restaurant::getName)
                            .toList());
                }

                if(user.getStores() != null){
                    allBusinesses.addAll(user.getStores().stream()
                            .map(Store::getName)
                            .toList());
                }
                return UserResponse.builder()
                        .firstName(user.getFirstname())
                        .lastName(user.getLastname())
                        .dateOfBirth(user.getDateOfBirth())
                        .email(user.getEmail())
                        .street(user.getStreet())
                        .allBusinesses(allBusinesses)
                        .build();
            }


}
