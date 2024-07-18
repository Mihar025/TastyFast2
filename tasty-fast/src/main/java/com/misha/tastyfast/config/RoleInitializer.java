package com.misha.tastyfast.config;

import com.misha.tastyfast.model.UserRoles;
import com.misha.tastyfast.repositories.RoleRepository;
import com.misha.tastyfast.role.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RoleInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        for (UserRoles userRole : UserRoles.values()) {
            if (!roleRepository.existsByName(userRole.name())) {
                Role role = new Role();
                role.setName(userRole.name());
                roleRepository.save(role);
            }
        }
    }
}
