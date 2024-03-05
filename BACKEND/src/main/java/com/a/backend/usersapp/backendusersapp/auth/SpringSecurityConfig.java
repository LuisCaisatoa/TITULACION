package com.a.backend.usersapp.backendusersapp.auth;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.a.backend.usersapp.backendusersapp.auth.filters.JwtAuthenticationFilter;
import com.a.backend.usersapp.backendusersapp.auth.filters.JwtValidationFilter;

@Configuration
public class SpringSecurityConfig {

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests()
                //.requestMatchers(HttpMethod.GET, "/users").permitAll()
        		//ESTO ES PARA VALIDAR POR EL ROL, QUIEN PUEDE ACCEDER A QUE
        		//COMO VEMOS EN EL EJEMPLO SI ES UN ROL NADA MAS UITILIZAMOS LA PROPIEDAD HASROLE, SI SON MAS ROLES 
        		//UTILIZAMOS HASANYROLE
        		.requestMatchers(HttpMethod.GET, "/api/usuarios").hasRole("ADMIN")
        		.requestMatchers(HttpMethod.GET, "/api/usuarios/{id}").hasRole("ADMIN")
        		.requestMatchers(HttpMethod.POST, "/api/usuarios").hasRole("ADMIN")
        		//.requestMatchers(HttpMethod.POST, "/api/usuarios").permitAll()
        		.requestMatchers(HttpMethod.PUT, "/api/usuarios/{id}").hasRole("ADMIN")
        		.requestMatchers(HttpMethod.DELETE, "/api/usuarios/{id}").hasRole("ADMIN")
        		.requestMatchers(HttpMethod.GET, "/api/menu").hasAnyRole("ADMIN", "USER")
        		.requestMatchers(HttpMethod.GET, "/api/inventario").hasAnyRole("ADMIN", "USER")
        		.requestMatchers(HttpMethod.POST, "/api/inventario").hasAnyRole("ADMIN", "USER")
        		.requestMatchers(HttpMethod.PUT, "/api/inventario").hasAnyRole("ADMIN", "USER")
        		.requestMatchers(HttpMethod.GET, "/api/medidas").hasAnyRole("ADMIN", "USER")
        		.requestMatchers(HttpMethod.GET, "/api/categorias").hasAnyRole("ADMIN", "USER")
        		.requestMatchers(HttpMethod.GET, "/api/bodegas").hasAnyRole("ADMIN", "USER")
        		.requestMatchers(HttpMethod.GET, "/api/productos").hasAnyRole("ADMIN", "USER")
                .anyRequest().authenticated()
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationConfiguration.getAuthenticationManager()))
                .addFilter(new JwtValidationFilter(authenticationConfiguration.getAuthenticationManager()))
                .csrf(config -> config.disable())
                .sessionManagement(managment -> managment.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
    	CorsConfiguration config = new CorsConfiguration();
    	config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setAllowCredentials(false);
        config.setAllowedOrigins(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setExposedHeaders(Arrays.asList("x-auth-token"));
    	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    	source.registerCorsConfiguration("/**", config);
    	return source;
    }
    
    @Bean
    FilterRegistrationBean<CorsFilter> corsFilter(){
    	FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(corsConfigurationSource()));
    	bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
    	return bean;
    }
    
}
