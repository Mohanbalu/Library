package com.librarymanagement.security.service;

import java.util.List;
import java.util.Locale;

import com.librarymanagement.entity.User;
import com.librarymanagement.enums.UserStatus;
import com.librarymanagement.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        if (user.getAccountStatus() != UserStatus.ACTIVE) {
            throw new DisabledException("User account is not active");
        }

        if (user.getRole() == null || Boolean.FALSE.equals(user.getRole().getActive())) {
            throw new DisabledException("User role is not active");
        }

        String roleName = user.getRole().getRoleName().toUpperCase(Locale.ROOT);
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + roleName));

        org.springframework.security.core.userdetails.User.UserBuilder builder = org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(authorities)
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false);

        return builder.build();
    }
}
