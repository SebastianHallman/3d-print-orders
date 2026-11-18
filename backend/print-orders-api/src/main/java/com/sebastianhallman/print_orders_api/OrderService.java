package com.sebastianhallman.print_orders_api;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

@Service 
public class OrderService {

    private ArrayList<PrintOrder> orders = new ArrayList<PrintOrder>();

    public ArrayList<PrintOrder> getAllOrders() {
        return orders;
    }

    public void addOrder(String name, String model) {
        orders.add(new PrintOrder(orders.size(), name, model, OrderStatus.QUEUED));
    }
    
}