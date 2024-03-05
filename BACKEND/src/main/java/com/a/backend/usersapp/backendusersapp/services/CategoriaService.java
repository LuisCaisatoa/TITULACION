package com.a.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import com.a.backend.usersapp.backendusersapp.models.entities.Categoria;
import com.a.backend.usersapp.backendusersapp.models.entities.User;
import com.a.backend.usersapp.backendusersapp.models.request.CategoriaRequest;

public interface CategoriaService {
	
	List<Categoria> findAll();

    Optional<Categoria> findById(Long id);

    Categoria save(Categoria categoria);
    Optional<Categoria> update(CategoriaRequest categoria, Long id);

    void remove(Long id);

}
