package com.a.backend.usersapp.backendusersapp.services;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a.backend.usersapp.backendusersapp.models.entities.Bodega;
import com.a.backend.usersapp.backendusersapp.models.entities.Menu;
import com.a.backend.usersapp.backendusersapp.repositories.MenuRepository;

@Service
public class MenuServiceImpl implements MenuService{

	@Autowired
	private MenuRepository repository;

	@Override
	public ArrayList<Menu> listarMenuPorUsuario(String username, Long role_id) {
		return repository.listarMenuPorUsuario(username, role_id);
	}
}
