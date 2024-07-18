package com.misha.tastyfast.repositories;

import com.misha.tastyfast.role.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String user);

    boolean existsByName(String name);
}
