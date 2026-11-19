package com.sebastianhallman.print_orders_api;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PrintOrderRepository extends JpaRepository<PrintOrder, Integer>{

    
}
