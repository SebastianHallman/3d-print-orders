package com.sebastianhallman.print_orders_api;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration 
public class SecurityConfig {
    @Bean
    public  SecurityFilterChain springSecurityWebFilterChain(HttpSecurity http) {
        http.authorizeHttpRequests((authorize) -> authorize
            .requestMatchers(HttpMethod.POST,"/orders/add").permitAll()
            .requestMatchers(HttpMethod.GET, "/orders/status").permitAll()
                .anyRequest().authenticated()
        ).formLogin(Customizer.withDefaults())
        .cors(Customizer.withDefaults()
    );
        return http.build();
    }
}

