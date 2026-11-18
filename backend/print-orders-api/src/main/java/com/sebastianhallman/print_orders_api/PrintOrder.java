package com.sebastianhallman.print_orders_api;

public class PrintOrder {
    private int id;
    private String customer;
    private String model;
    private OrderStatus status;

    public PrintOrder(int id, String customer, String model, OrderStatus status) {
        this.id = id;
        this.customer = customer;
        this.model = model;
        this.status = status;
    }

    @Override 
    public String toString() {
        String statusText;

        switch (this.status) {
            case QUEUED:
                statusText = "Queued";
                break;
            case PRINTING:
                statusText = "Printing";
                break;
            case COMPLETED:
                statusText = "Completed";
                break;
            default:
                statusText = "Unknown";
                break;
        }


        return "Order #" + this.id + " | " + this.customer + " has an order on " + this.model + " | Current status: " + statusText;
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
