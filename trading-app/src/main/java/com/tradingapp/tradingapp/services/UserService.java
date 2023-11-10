package com.tradingapp.tradingapp.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tradingapp.tradingapp.models.UserModel;
import com.tradingapp.tradingapp.models.UserRepository;

@Service
public class UserService implements UserDetailsService{
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserModel userFound = userRepo.findByUsername(username);
		if(userFound == null) return null;
		
		String name = userFound.getUsername();
		String pwd = userFound.getPassword();
		
		return new User(name,pwd,new ArrayList<>());
	}

}
