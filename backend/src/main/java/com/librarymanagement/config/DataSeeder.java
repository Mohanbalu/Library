package com.librarymanagement.config;

import com.librarymanagement.entity.Role;
import com.librarymanagement.repository.RoleRepository;
import com.librarymanagement.utils.AppConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    @Bean
    CommandLineRunner seedRoles(RoleRepository roleRepository) {
        return args -> {
            seedRole(roleRepository, AppConstants.ROLE_USER, "Standard library member account");
            seedRole(roleRepository, AppConstants.ROLE_ADMIN, "Library administrator account");
        };
    }

    private void seedRole(RoleRepository roleRepository, String roleName, String description) {
        roleRepository.findByRoleName(roleName).orElseGet(() -> roleRepository.save(
                Role.builder()
                        .roleName(roleName)
                        .description(description)
                        .active(Boolean.TRUE)
                        .build()));
    }
}