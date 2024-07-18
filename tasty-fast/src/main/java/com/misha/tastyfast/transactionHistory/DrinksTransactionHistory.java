package com.misha.tastyfast.transactionHistory;

import com.misha.tastyfast.comon.BaseEntity;
import com.misha.tastyfast.model.Drink;
import com.misha.tastyfast.model.Restaurant;
import com.misha.tastyfast.model.Store;
import com.misha.tastyfast.model.User;
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
public class DrinksTransactionHistory extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "drink_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Drink drink;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;
    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;
    private boolean alreadyOrdered;
    private boolean returned;
    private String transactionType;
    private LocalDateTime transactionDate;
    private BigDecimal amount;
    private String details;


}