package com.misha.tastyfast.config;


import com.github.benmanes.caffeine.cache.Caffeine;

import lombok.RequiredArgsConstructor;

import org.springframework.cache.CacheManager;

import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.springframework.http.HttpHeaders.*;

@Configuration
@RequiredArgsConstructor
public class BeansConfig {

    private final UserDetailsService userDetailsService;

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncode());
        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncode() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public AuditorAware<Integer> auditorAware() {
        return new ApplicationAuditAware();
    }


    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        List<CaffeineCache> caches = Arrays.asList(
                buildCache("store_byId", 500, 60),
                buildCache("store_allProducts", 100, 30),
                buildCache("store_product_update", 200, 15),
                buildCache("store_drink_byId", 300, 20),
                buildCache("store_product_byId", 300, 20),
                buildCache("store_allDrinks", 200, 30),
                buildCache("store_drinks_update", 300, 30),
                buildCache("store_update", 200, 15),
                buildCache("store_allStores", 200, 15),
                buildCache("store_allStoresWithoutDelivery", 200, 15),
                buildCache("restaurant_byId", 300, 20),
                buildCache("restaurant_allRestaurants", 500, 30),
                buildCache("restaurant_dish_byId", 600, 30),
                buildCache("restaurant_allDish", 600, 30),
                buildCache("restaurant_dish_update", 300, 30),
                buildCache("restaurant_drink_byId", 300, 20),
                buildCache("restaurant_allDrinks", 200, 30),
                buildCache("restaurant_drinks_update", 300, 30),
                buildCache("restaurant_allRestaurantsNoDelivery", 300, 30),
                buildCache("restaurant:drinks_update", 600, 30),
                buildCache("user_findById", 300, 30),
                buildCache("user_firstName", 300, 30),
                buildCache("users" , 300, 30),
                buildCache("restaurants" , 300, 30)
                );

        cacheManager.setCaches(caches);
        return cacheManager;
    }

    private CaffeineCache buildCache(String name, int maxSize, int expireAfter) {
        return new CaffeineCache(name, Caffeine.newBuilder()
                .maximumSize(maxSize)
                .expireAfterWrite(expireAfter, TimeUnit.MINUTES)
                .build());
    }

    @Bean
    public CorsFilter corsFilter(){
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
        configuration.setAllowedHeaders(Arrays.asList(
                ORIGIN,
                CONTENT_TYPE,
                ACCEPT,
                AUTHORIZATION
        ));
        configuration.setAllowedMethods(Arrays.asList(
                "GET",
                "POST",
                "DELETE",
                "PUT",
                "PATCH"
        ));
        source.registerCorsConfiguration("/**", configuration);
        return new CorsFilter(source);
    }













}