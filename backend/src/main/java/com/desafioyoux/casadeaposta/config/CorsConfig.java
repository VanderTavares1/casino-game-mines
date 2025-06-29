package com.desafioyoux.casadeaposta.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // permite CORS em todos os endpoints
                        .allowedOrigins("http://localhost:3000") // permite qualquer origem
                        .allowedMethods("*") // permite esses métodos
                        .allowedHeaders("*"); // permite qualquer header
            }
        };
    }
}