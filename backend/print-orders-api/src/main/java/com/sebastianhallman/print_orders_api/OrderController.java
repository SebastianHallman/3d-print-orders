package com.sebastianhallman.print_orders_api;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;


    @Autowired 
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
        
    }

    @GetMapping("/status")
    public String health() {
        return "The API is running";
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("")
    public List<PrintOrder> getOrders() {
        return this.orderService.getAllOrders();
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/{id}")
    public ResponseEntity<PrintOrder> getOrder(@PathVariable("id") int id) {
        return ResponseEntity.of(this.orderService.getOrder(id));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @DeleteMapping("/{id}")
    public  ResponseEntity<PrintOrder> deleteOrder(@PathVariable("id") int id) {
        return ResponseEntity.of(this.orderService.deleteOrder(id));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/add")
    public String addOrder(@RequestBody CreateOrderRequest order) {
        this.orderService.addOrder(order.name(), order.model(), order.notes());
        return "Order received";
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PatchMapping("/status/{id}")
    public ResponseEntity<PrintOrder> updateOrder(@PathVariable("id") int id, @RequestBody UpdateOrderRequest orderStatus) {
        if (orderStatus.status() == null || !utils.isValidStatus(orderStatus.status())) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.of(this.orderService.updateOrder(id, orderStatus.status().toLowerCase()));
        

    }

    

}
