package com.sebastianhallman.print_orders_api;

import java.util.List;

import org.springframework.stereotype.Service;

@Service 
public class OrderService {
    private  final PrintOrderRepository printOrderRepository;

    public OrderService(PrintOrderRepository printOrderRepository){
        this.printOrderRepository = printOrderRepository;
    }

    public List<PrintOrder> getAllOrders() {
        return this.printOrderRepository.findAll();
    }

    public void addOrder(String name, String model) {
        this.printOrderRepository.save(new PrintOrder(name, model));
    }
    
}