package com.misha.tastyfast.mapping;

import com.misha.tastyfast.model.Restaurant;
import com.misha.tastyfast.model.Store;
import com.misha.tastyfast.model.User;
import com.misha.tastyfast.requests.userRequests.UserIdResponse;
import com.misha.tastyfast.requests.userRequests.UserRequest;
import com.misha.tastyfast.requests.userRequests.UserResponse;
import com.misha.tastyfast.requests.userSettingsRequests.*;
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

            public UserIdResponse toUserId(User user){
                return UserIdResponse.builder()
                        .currentId(user.getId())
                        .build();
            }

            public FirstNameRequest toFirstName(User user){
                return FirstNameRequest.builder()
                        .firstName(user.getFirstname())
                        .build();
            }

            public LastNameRequest toLastName(User user){
                return LastNameRequest.builder()
                        .lastName(user.getLastname())
                        .build();
            }
            public DateOfBirthRequest toDateOfBirth(User user){
                return DateOfBirthRequest.builder()
                        .dateOfBirth(user.getDateOfBirth())
                        .build();
            }
            public EmailRequest toEmail(User user){
                return EmailRequest.builder()
                        .email(user.getEmail())
                        .build();
            }

            public StreetRequest toStreet(User user){
                return StreetRequest.builder()
                        .streetRequest(user.getStreet())
                        .build();
            }




}
