package com.tradingapp.tradingapp.services;


import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tradingapp.tradingapp.models.UserDetailRepository;
import com.tradingapp.tradingapp.models.UserDetailsModel;

@Service
public class UserDetailService {
	@Autowired
	private UserDetailRepository repository;
	
	
	public UserDetailsModel addDetails(UserDetailsModel userDetail) {
//		userDetail.setId(UUID.randomUUID().toString().split("-")[0]);
		return repository.save(userDetail);
	}
	public List<UserDetailsModel> findAllUsers(){
		return repository.findAll();
	}
	public UserDetailsModel findUserDetails(String id) throws UsernameNotFoundException{
		return  repository.findById(id).get();
	}
	public UserDetailsModel updateDetails(UserDetailsModel userDetail) {
		UserDetailsModel user = repository.findById(userDetail.getId()).get();
		user.setNumber(userDetail.getNumber());
		user.setAddress(userDetail.getAddress());
		return repository.save(user);
	}
}
