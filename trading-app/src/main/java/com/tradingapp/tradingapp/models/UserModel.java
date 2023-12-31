package com.tradingapp.tradingapp.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document // Documented to let know documents are stored in mongodb
public class UserModel {
	@Id
	private String id;
	private String username;
	private String password;
	
	public UserModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}

