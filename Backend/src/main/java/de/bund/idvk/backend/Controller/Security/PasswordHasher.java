package de.bund.idvk.backend.Controller.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordHasher {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return  PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}

