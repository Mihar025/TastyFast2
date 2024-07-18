package com.misha.tastyfast.repositories;

import com.misha.tastyfast.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> , JpaSpecificationExecutor<Product> {
    @Query("""
        SELECT product
        FROM Product  product
        WHERE product.inStock = true 
""")
    Page<Product> findAllDisplayableProducts(Pageable pageable, Integer id);
    @Query("SELECT p FROM Product p WHERE p.store.id = :storeId")
    Page<Product> findAllProductsInStore(Pageable pageable, @Param("storeId") Integer storeId);

    Optional<Product> findByIdAndStoreId(Integer productId, Integer storeId);
}
