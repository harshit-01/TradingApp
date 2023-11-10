package com.tradingapp.tradingapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tradingapp.tradingapp.models.AuthenticationRequest;
import com.tradingapp.tradingapp.models.AuthenticationResponse;
import com.tradingapp.tradingapp.models.UserModel;
import com.tradingapp.tradingapp.models.UserRepository;

import com.mongodb.ConnectionString;
import com.mongodb.DBObject;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoException;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import java.util.ArrayList;
import java.util.List;

import javax.swing.Spring;

import org.bson.Document;
import org.bson.json.JsonWriterSettings;
import org.json.HTTP;
import org.json.JSONArray;
import org.json.JSONObject;


@CrossOrigin(origins = "*") 
@RestController
public class AuthController {
	@Autowired
	private UserRepository userRepo;
	private AuthenticationManager authenticationManager ;
	
	@CrossOrigin(origins = "*") 
	@PostMapping("/subscribe")
	private ResponseEntity<?> subscribeClient(@RequestBody AuthenticationRequest authenticationRequest){ // The ResponseEntity is used to represent the HTTP response and extract the Resource from it, which is used to execute the request and retrieve the response.
		String username = authenticationRequest.getUsername();
		String password = authenticationRequest.getPassword();
		UserModel userModel = new UserModel();
		userModel.setUsername(username);
		userModel.setPassword(password);
		AuthenticationResponse authenticationRes = new AuthenticationResponse();
		try {
			userRepo.save(userModel); // User data(document) added to repository. Then to mongodb.
			authenticationRes.setResponse("User Successfully added " + username);
		}
		catch(Exception err) {
			authenticationRes.setResponse("Error in added user to the db " + err);
			return ResponseEntity.ok(authenticationRes);
		}
		return ResponseEntity.ok(authenticationRes);
		
	}
	@CrossOrigin(origins = "*") 
	@PostMapping("/auth")
	private ResponseEntity<?> authenticateClient(@RequestBody AuthenticationRequest authenticationRequest){ // The ResponseEntity is used to represent the HTTP response and extract the Resource from it, which is used to execute the request and retrieve the response.
		String username = authenticationRequest.getUsername();
		String password = authenticationRequest.getPassword();
		AuthenticationResponse authenticationRes = new AuthenticationResponse();
		try {
			 String connectionString = "mongodb+srv://kharshit0101:<password>.p7efepy.mongodb.net/?retryWrites=true&w=majority";
	         ServerApi serverApi = ServerApi.builder()
	                 .version(ServerApiVersion.V1)
	                 .build();
	 
	         MongoClientSettings settings = MongoClientSettings.builder()
	                 .applyConnectionString(new ConnectionString(connectionString))
//	                 .serverApi(serverApi)
	                 .build();
	 
	         // Create a new client and connect to the server
	         try (MongoClient mongoClient = MongoClients.create(settings)) {
	             try {
	                 MongoDatabase database = mongoClient.getDatabase("tradingDataset");
	                 MongoCollection<Document> collection = database.getCollection("userModel");
	                 Document query = new Document("username",username); // assuming it is emailid
	                 Document result = collection.find(query).iterator().next();
//	                 System.out.println("Pinged your deployment. You successfully connected to MongoDB!" + result);
	                 String json = result.toJson(JsonWriterSettings.builder().build());
	                 JSONObject obj = new JSONObject(json);
	                 System.out.print("Obj " + json);
	                 String name = obj.getString("username");
	                 System.out.println(name);
	                 String pwd = obj.getString("password");
	                 System.out.println(pwd);
	                 if(!pwd.equals(password)) {
	                	 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password provided");
	                 }
	                 authenticationRes.setResponse("User Successfully logged in " + username + " "+ obj);
	                 System.out.println(pwd);
	             } catch (MongoException e) {
	                 e.printStackTrace();
	             }
	         }
			//authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
		}
		catch(Exception err) {
			
			System.out.println(err);
			authenticationRes.setResponse("Login credentials provided are incorrect  " + err);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(authenticationRes);
		}
		return ResponseEntity.ok(authenticationRes);
		
	}
}


//JSONArray array = obj.getJSONArray("");
//for(int i = 0 ; i < array.length() ; i++){
//    list.add(array.getJSONObject(i).getString("interestKey"));
//}
//System.out.println("JSON" + json);