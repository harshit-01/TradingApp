package com.employeecrud.employeecrud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@RestController  // annotations for letting the compiler know restful services are used 
public class TradingAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(TradingAppApplication.class, args);
	}
	@GetMapping("/root")  // Get api end point
	public String apiRoot(){ 
		return "Hello world";
		
	}
}
