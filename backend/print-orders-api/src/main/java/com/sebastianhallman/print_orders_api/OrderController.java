package com.sebastianhallman.print_orders_api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("")
    public List<PrintOrder> getOrders() {
        return this.orderService.getAllOrders();
    }

    @PostMapping("/add")
    public String addOrder(@RequestBody CreateOrderRequest order) {
        this.orderService.addOrder(order.name(), order.model());
        return "Order received";
    }

}
