package com.a.backend.usersapp.backendusersapp.controllers;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a.backend.usersapp.backendusersapp.models.entities.Menu;
import com.a.backend.usersapp.backendusersapp.services.MenuService;

@RestController
@RequestMapping("api/menu")
@CrossOrigin(originPatterns = "*")
public class MenuController {
	
	@Autowired
    private MenuService service;
	
	@GetMapping("/{username}/{role_id}")
    public ResponseEntity<?> show(@PathVariable String username, @PathVariable Long role_id) {
        
		ArrayList<Menu> menuOptional = service.listarMenuPorUsuario(username, role_id);
        if (menuOptional.size() > 0) {
            return ResponseEntity.ok(menuOptional);
        }
        return ResponseEntity.notFound().build();
    }

}
