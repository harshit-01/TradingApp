package com.tradingapp.tradingapp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tradingapp.tradingapp.models.UserDetailsModel;
import com.tradingapp.tradingapp.services.UserDetailService;

@CrossOrigin(origins = "*") 
@RestController  
public class UserDetailController {
	@Autowired
	private UserDetailService service;
	
	@CrossOrigin(origins = "*") 
	@PostMapping("/addUserDetails")
	public ResponseEntity<?> addUserDetails(@RequestBody UserDetailsModel userDetail) {
		UserDetailsModel user = service.addDetails(userDetail);
		System.out.println(user);
		return ResponseEntity.ok().body(user);
	}
	@CrossOrigin(origins = "*") 
	@GetMapping("/allUserDetails")
	public ResponseEntity<?> allUserDetail() {
		List<UserDetailsModel> user = service.findAllUsers();
		return ResponseEntity.ok().body(user);
	}
	@CrossOrigin(origins = "*") 
	@GetMapping("/userDetailsById/{id}")
	public ResponseEntity<?> userDetailById(@PathVariable(value = "id") String userId) {
		System.out.println(userId);
		UserDetailsModel user = service.findUserDetails(userId);
		return ResponseEntity.ok().body(user);
	}
}
