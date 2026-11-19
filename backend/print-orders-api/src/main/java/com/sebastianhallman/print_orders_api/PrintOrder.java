package com.sebastianhallman.print_orders_api;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity 
public class PrintOrder {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String customer;
    private String model;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    protected PrintOrder () {}

    public PrintOrder(int id, String customer, String model, OrderStatus status) {
        this.id = id;
        this.customer = customer;
        this.model = model;
        this.status = status;
    }
    
    public int getId() {
        return this.id;
    }

    public OrderStatus getStatus() {
        return this.status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getCustomer(){
        return this.customer;
    }

    public String getModel() {
        return this.model;
    }
}
