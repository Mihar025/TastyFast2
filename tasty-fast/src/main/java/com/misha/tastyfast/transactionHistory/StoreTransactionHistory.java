package com.misha.tastyfast.transactionHistory;

import com.misha.tastyfast.comon.BaseEntity;
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

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class StoreTransactionHistory extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String transactionType;
    private LocalDateTime transactionDate;
    private BigDecimal amount;
    private String details;
}