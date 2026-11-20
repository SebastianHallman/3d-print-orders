package com.sebastianhallman.print_orders_api;

import java.util.List;
import java.util.Optional;

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
    
    public Optional<PrintOrder> updateOrder(int id, String status){
        Optional<PrintOrder> orderLookup = this.printOrderRepository.findById(id);
        if (orderLookup.isEmpty()){
            return Optional.empty();
        }
        PrintOrder order = orderLookup.get();
        OrderStatus orderStatus;

        switch (status) {
            case "queued":
                orderStatus = OrderStatus.QUEUED;
                break;
            
            case "printing":
                orderStatus = OrderStatus.PRINTING;
                break;
            case "completed":
                orderStatus = OrderStatus.COMPLETED;
                break;
            default:
                orderStatus = order.getStatus();
                break;
        }

        order.setStatus(orderStatus);
        return Optional.of(this.printOrderRepository.save(order));  
    }    

    public Optional<PrintOrder> getOrder(int id) {
        return this.printOrderRepository.findById(id);
    }

    public Optional<PrintOrder> deleteOrder(int id) {
        Optional<PrintOrder> orderLookup = this.printOrderRepository.findById(id);
        if (orderLookup.isEmpty()){
            return Optional.empty();
        }

        PrintOrder order = orderLookup.get();
        this.printOrderRepository.delete(order);

        return Optional.of(order);
        
    }
    
}