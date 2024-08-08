package com.misha.tastyfast.repositories;

import com.misha.tastyfast.model.Restaurant;
import com.misha.tastyfast.model.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> , JpaSpecificationExecutor<Restaurant> {
    @Query
            ("""
                SELECT restaurant
                FROM Restaurant restaurant
                WHERE  restaurant.isActive = true
                AND restaurant.deliveryAvailable = true
                """)
    Page<Restaurant> findAllDisplayedRestaurants(Pageable pageable, Integer id);


    @Query
            ("""
                SELECT restaurant
                FROM Restaurant restaurant
                WHERE  restaurant.isActive = true
                AND restaurant.deliveryAvailable = false
                """)
    Page<Restaurant> findAllDisplayedRestaurantsWithoutDelivery(Pageable pageable, Integer id);

    @Query("""
    SELECT r FROM Restaurant r WHERE r.owner.id= :ownerId

            """)
    Page<Restaurant> findAllDisplayedRestaurantsByOwner(Pageable pageable, @Param("ownerId") Integer ownerId);

}
