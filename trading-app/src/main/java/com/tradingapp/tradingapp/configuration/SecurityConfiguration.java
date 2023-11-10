package com.tradingapp.tradingapp.configuration;


import com.tradingapp.tradingapp.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{
		@Autowired
		private UserService userService;
		
		@Override
		protected void configure(AuthenticationManagerBuilder auth) throws Exception{
			auth.userDetailsService(userService);
		}
		
		@Override
		protected void configure(HttpSecurity http) throws Exception{
			http.csrf().disable().authorizeRequests().antMatchers("/subscribe","/auth").permitAll().anyRequest().permitAll();
		}
        
		@Bean
		public PasswordEncoder passwordEncoder(){
			return NoOpPasswordEncoder.getInstance();
		}
		
		@Override
		@Bean
		public AuthenticationManager authenticationManagerBean() throws Exception{
			return super.authenticationManagerBean();
		}
		
		//@Bean
//	    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//	        http.authorizeHttpRequests((authorize)->authorize.requestMatchers(HttpMethod.GET).permitAll().requestMatchers("/subscribe","/auth").permitAll()
//	        		.anyRequest().permitAll()).csrf(csrf->csrf.disable());
//	        return http.build();
//	    }


//	    @Bean
//	    public PasswordEncoder passwordEncoder() {
//	       return new BCryptPasswordEncoder();
//	    }
//	    @Bean
//	 	public DaoAuthenticationProvider getDaoAuthProvider() {
//	    	DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//	    	provider.setUserDetailsService(this.userService);
//	    	provider.setPasswordEncoder(passwordEncoder());
//	 		return provider;

}

