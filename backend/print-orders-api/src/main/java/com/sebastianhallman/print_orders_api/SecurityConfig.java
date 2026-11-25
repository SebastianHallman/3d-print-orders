package com.sebastianhallman.print_orders_api;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.servlet.util.matcher.PathPatternRequestMatcher;


@Configuration 
public class SecurityConfig {
    @Bean
    public  SecurityFilterChain springSecurityWebFilterChain(HttpSecurity http) {
        http.authorizeHttpRequests((authorize) -> authorize
            .requestMatchers(HttpMethod.POST,"/orders/add").permitAll()
            .requestMatchers(HttpMethod.GET, "/orders/status").permitAll()
            .requestMatchers(HttpMethod.GET, "/csrf").permitAll()
                .anyRequest().authenticated()
        ).formLogin(form -> form.defaultSuccessUrl("http://localhost:3000/admin", true))
        .exceptionHandling((e) -> e.defaultAuthenticationEntryPointFor(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED), PathPatternRequestMatcher.withDefaults().matcher(HttpMethod.GET, "/orders")))
        .logout(logout -> logout.logoutSuccessUrl("http://localhost:3000/admin/login"))
        .cors(Customizer.withDefaults())
        .csrf(config -> config.ignoringRequestMatchers((PathPatternRequestMatcher.withDefaults().matcher(HttpMethod.POST, "/orders/add")))
    );
        return http.build();
    }
}

