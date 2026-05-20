package com.quantity.measurement.controller;

import com.quantity.measurement.security.JwtUtil;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/login")
    public String login() {
        return "Open /oauth2/authorization/google";
    }

    @GetMapping("/success")
    public Map<String, Object> success(
            @AuthenticationPrincipal OAuth2User user
    ) {

        String email = user.getAttribute("email");

        String token = jwtUtil.generateToken(email);

        Map<String, Object> response = new HashMap<>();

        response.put("email", email);
        response.put("name", user.getAttribute("name"));
        response.put("picture", user.getAttribute("picture"));
        response.put("jwt", token);

        return response;
    }
}
