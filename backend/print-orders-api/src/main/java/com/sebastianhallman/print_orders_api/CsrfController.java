package com.sebastianhallman.print_orders_api;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
public class CsrfController {

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/csrf")
    public CsrfToken csrf(CsrfToken csrfToken){
        return csrfToken;
    }
    
}
