package com.sebastianhallman.print_orders_api;

public class utils {
    
    public static boolean isValidStatus(String status) {
        if (status.equalsIgnoreCase("queued") || status.equalsIgnoreCase("printing") || status.equalsIgnoreCase("completed")) {
            return true;
        }
        return false;
    }
}
