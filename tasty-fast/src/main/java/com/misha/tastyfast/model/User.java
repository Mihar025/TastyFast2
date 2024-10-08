package com.misha.tastyfast.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.misha.tastyfast.role.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.security.auth.Subject;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
@EntityListeners(AuditingEntityListener.class)
@NamedEntityGraph(name = "user_entity-graph",
        attributeNodes = {
                @NamedAttributeNode("restaurants"),
                @NamedAttributeNode("stores"),
                @NamedAttributeNode("feedbacks")
        }
)
public class User implements UserDetails, Principal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstname;
    private String lastname;
    private LocalDateTime dateOfBirth;
    @Column(unique = true)
    private String email;
    private String password;
    private boolean accountLocked;
    private boolean enabled;
    private String street;

    private String businessType;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;
    @JsonIgnore
    @OneToMany(mappedBy = "owner")
    private List<Restaurant> restaurants;
    @JsonIgnore
    @OneToMany(mappedBy = "owner")
    private List<Store> stores;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Feedback> feedbacks;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Order> orders;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Cart cart;


    @Override
    public String getName() {
        return email;
    }

    @Override
    public boolean implies(Subject subject) {
        return Principal.super.implies(subject);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles
                .stream()
                .map(r -> new SimpleGrantedAuthority(r.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public String fullName() {
        return getFirstname() + " " + getLastname();
    }

    public String getFullName() {
        return firstname + " " + lastname;
    }
}