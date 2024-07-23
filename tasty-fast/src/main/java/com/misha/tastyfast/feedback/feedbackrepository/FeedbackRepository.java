package com.misha.tastyfast.feedback.feedbackrepository;

import com.misha.tastyfast.model.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    @Query("""
            SELECT feedback
            FROM Feedback feedback
            WHERE feedback.product.id =:productId
            """)
    Page<Feedback> findAllByProductId(Integer productId, Pageable pageable);

    @Query("""
            SELECT feedback
            FROM Feedback feedback
            WHERE feedback.dishes.id =:dishesId
            """)
    Page<Feedback> findAllByDishesId(Integer dishesId, Pageable pageable);

    @Query("""
            SELECT feedback
            FROM Feedback feedback
            WHERE feedback.drink.id =:drinkId
            """)
    Page<Feedback> findAllByDrinkId(Integer drinkId, Pageable pageable);

    @Query("""
            SELECT feedback
            FROM Feedback feedback
            WHERE feedback.restaurant.id =:restaurantId
            """)
    Page<Feedback> findAllByRestaurantId(Integer restaurantId, Pageable pageable);

    @Query("""
            SELECT feedback
            FROM Feedback feedback
            WHERE feedback.store.id =:storeId
            """)
    Page<Feedback> findAllByStoreId(Integer storeId, Pageable pageable);






}
