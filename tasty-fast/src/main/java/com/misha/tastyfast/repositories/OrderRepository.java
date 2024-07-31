package com.misha.tastyfast.repositories;

import com.misha.tastyfast.model.Order;
import com.misha.tastyfast.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    Optional<Order> findByIdAndUser(Integer id, User user);
    Page<Order> findAllByUser(User user, Pageable pageable);

    @Query("""
           SELECT o FROM Order o
           WHERE o.user = :user
           ORDER BY o.orderDate DESC
""")
    Page<Order> findAllOrdersByUserId(@Param("user") User existedUser, Pageable pageable);
}
