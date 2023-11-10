package com.tradingapp.tradingapp.models;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserDetailRepository extends MongoRepository <UserDetailsModel,String>{
	List<UserDetailsModel> findByName(String name);
}
