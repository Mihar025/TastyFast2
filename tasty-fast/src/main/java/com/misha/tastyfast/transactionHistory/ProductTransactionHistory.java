package com.misha.tastyfast.transactionHistory;

import com.misha.tastyfast.comon.BaseEntity;
import com.misha.tastyfast.model.Product;
import com.misha.tastyfast.model.Store;
import com.misha.tastyfast.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ProductTransactionHistory extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    private String transactionType;
    private LocalDateTime transactionDate;
    private BigDecimal amount;
    private String details;

    @Column(nullable = false)
    private boolean returned = false;
    @Column(nullable = false)
    private boolean returned_approved = false;

    @Column(nullable = false)
    private boolean already_ordered = false;
}