package com.sebastianhallman.print_orders_api;

import org.jspecify.annotations.Nullable;

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
    @Nullable 
    private String notes;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;


    protected PrintOrder () {}

    public PrintOrder(String customer, String model) {
        this.customer = customer;
        this.model = model;
        this.status = OrderStatus.QUEUED;
    }

    public PrintOrder(String customer, String model, String notes) {
        this.customer = customer;
        this.model = model;
        this.status = OrderStatus.QUEUED;
        this.notes = notes;
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

    public String getNotes() {
        return this.notes;
    }
}
