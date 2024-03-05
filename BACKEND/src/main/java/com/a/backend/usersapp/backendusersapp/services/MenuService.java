package com.a.backend.usersapp.backendusersapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.a.backend.usersapp.backendusersapp.models.entities.Menu;

public interface MenuService {
	
	ArrayList<Menu> listarMenuPorUsuario(String username, Long role_id);

}
