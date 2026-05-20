package com.quantity.measurement.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

        @Value("${app.jwt.secret}")
        private String jwtSecret;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

                http

                                // Disable CSRF
                                .csrf(csrf -> csrf.disable())

                                // Allow H2 Console
                                .headers(headers -> headers.frameOptions(frame -> frame.disable()))

                                // Enable CORS
                                .cors(Customizer.withDefaults())

                                // OAuth2 requires session during login flow
                                .sessionManagement(session -> session.sessionCreationPolicy(
                                                SessionCreationPolicy.IF_REQUIRED))

                                // Authorize Requests
                                .authorizeHttpRequests(auth -> auth

                                                // PUBLIC ENDPOINTS
                                                .requestMatchers(
                                                                "/",
                                                                "/error",
                                                                "/api/auth/**",
                                                                "/login/**",
                                                                "/oauth2/**",

                                                                // TEMPORARY FOR TESTS
                                                                "/api/v1/quantities/**",

                                                                "/swagger-ui/**",
                                                                "/v3/api-docs/**",
                                                                "/api-docs/**",
                                                                "/api-docs",
                                                                "/h2-console/**",
                                                                "/actuator/**")
                                                .permitAll()

                                                // PROTECTED ENDPOINTS
                                                .anyRequest().authenticated())

                                // Google OAuth2 Login
                                .oauth2Login(oauth2 -> oauth2
                                                .defaultSuccessUrl(
                                                                "/api/auth/success",
                                                                true))

                                // JWT Resource Server
                                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));

                return http.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {

                CorsConfiguration configuration = new CorsConfiguration();

                configuration.setAllowedOrigins(
                                List.of("http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"));

                configuration.setAllowedMethods(
                                List.of(
                                                "GET",
                                                "POST",
                                                "PUT",
                                                "DELETE"));

                configuration.setAllowedHeaders(
                                List.of("*"));

                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

                source.registerCorsConfiguration(
                                "/**",
                                configuration);

                return source;
        }

        @Bean
        public JwtDecoder jwtDecoder() {

                SecretKey secretKey = new SecretKeySpec(
                                jwtSecret.getBytes(),
                                "HmacSHA256");

                return NimbusJwtDecoder
                                .withSecretKey(secretKey)
                                .build();
        }
}
